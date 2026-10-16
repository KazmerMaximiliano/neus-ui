import type {
  GoogleMapProps,
  MarkerProps,
  StandaloneSearchBoxProps,
} from "@react-google-maps/api";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { reverseGeocode } from "../../services/geocoding";
import { InteractiveMap } from "./InteractiveMap";
import type { InteractiveMapProps } from "./InteractiveMap.types";
import { parseCoordinates } from "./InteractiveMap.utils";

const sdk = vi.hoisted(() => ({
  loaded: true,
  error: undefined as Error | undefined,
  map: {} as GoogleMapProps,
  marker: {} as MarkerProps,
  search: {} as StandaloneSearchBoxProps,
  center: vi.fn(),
  zoom: vi.fn(),
}));
vi.mock("../../services/geocoding", () => ({ reverseGeocode: vi.fn() }));
vi.mock("@react-google-maps/api", async () => {
  const { useEffect } = await import("react");
  return {
    useJsApiLoader: () => ({ isLoaded: sdk.loaded, loadError: sdk.error }),
    GoogleMap: (props: GoogleMapProps) => {
      sdk.map = props;
      const { onLoad } = props;
      useEffect(() => {
        onLoad?.({
          setCenter: sdk.center,
          setZoom: sdk.zoom,
        } as unknown as google.maps.Map);
      }, [onLoad]);
      return <div data-testid="google-map">{props.children}</div>;
    },
    Marker: (props: MarkerProps) => {
      sdk.marker = props;
      return <div data-testid="map-marker" />;
    },
    StandaloneSearchBox: (props: StandaloneSearchBoxProps) => {
      sdk.search = props;
      return <div data-testid="search-box">{props.children}</div>;
    },
  };
});
const resolved = {
  address: "Córdoba",
  country: "Argentina",
  state: "Córdoba",
  city: "Córdoba",
};
const click = (lat = -31, lng = -64) =>
  ({ latLng: { lat: () => lat, lng: () => lng } }) as google.maps.MapMouseEvent;
const renderMap = (props: Partial<InteractiveMapProps> = {}) =>
  render(<InteractiveMap googleMapsApiKey="test-key" {...props} />);
beforeEach(() => {
  sdk.loaded = true;
  sdk.error = undefined;
  sdk.map = {};
  sdk.marker = { position: { lat: 0, lng: 0 } };
  sdk.search = {};
  vi.mocked(reverseGeocode).mockReset().mockResolvedValue(resolved);
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("InteractiveMap", () => {
  it("renders search, map, instructions and initial marker", () => {
    renderMap({
      initialCoordinates: "-31,-64",
      initialAddress: "Plaza",
      instructionsText: "Choose a place",
    });
    expect(screen.getByTestId("google-map")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Plaza")).toBeInTheDocument();
    expect(screen.getByText("Choose a place")).toBeInTheDocument();
    expect(sdk.marker.position).toEqual({ lat: -31, lng: -64 });
  });
  it("uses defaults and forwards map configuration", () => {
    renderMap({
      mapOptions: { disableDefaultUI: true },
      searchBoxPlaceholder: "Search here",
      mapStyle: { height: 300 },
    });
    expect(sdk.map.options).toEqual({ disableDefaultUI: true });
    expect(sdk.map.mapContainerStyle).toEqual({ height: 300 });
    expect(screen.getByPlaceholderText("Search here")).toBeInTheDocument();
    expect(screen.getByText(/Click on the map/)).toBeInTheDocument();
  });
  it("displays a loading state and forwards its styles", () => {
    sdk.loaded = false;
    renderMap({ loadingStyle: { padding: 20 } });
    expect(screen.getByRole("status")).toHaveTextContent("Loading map");
    expect(screen.getByRole("status")).toHaveStyle({ padding: "20px" });
  });
  it("reports SDK failures", async () => {
    sdk.error = new Error("SDK failed");
    const onError = vi.fn();
    renderMap({ onError });
    expect(screen.getByRole("alert")).toHaveTextContent("Unable to load");
    await waitFor(() => expect(onError).toHaveBeenCalledWith(sdk.error));
  });
  it.each(["", "1", "a,b", "91,0", "0,-181", ","])(
    "rejects invalid coordinates %s before loading the map",
    (initialCoordinates) => {
      const onError = vi.fn();
      renderMap({ initialCoordinates, onError });
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Coordinates must contain",
      );
      expect(screen.queryByTestId("google-map")).toBeNull();
      expect(onError).toHaveBeenCalledWith(expect.any(Error));
    },
  );
  it("reports a missing key without loading Google", () => {
    render(<InteractiveMap googleMapsApiKey="" />);
    expect(screen.getByRole("alert")).toHaveTextContent("API key is required");
    expect(screen.queryByTestId("google-map")).not.toBeInTheDocument();
  });
  it("keeps read-only maps explorable while blocking changes", () => {
    const onLocationSelect = vi.fn();
    renderMap({ readonly: true, initialCoordinates: "1,2", onLocationSelect });
    expect(screen.queryByTestId("search-box")).not.toBeInTheDocument();
    expect(sdk.marker.draggable).toBe(false);
    expect(sdk.map.onClick).toBeUndefined();
    expect(sdk.marker.onDragEnd).toBeUndefined();
    expect(onLocationSelect).not.toHaveBeenCalled();
  });
  it("selects a clicked location and updates the search address", async () => {
    const onLocationSelect = vi.fn();
    renderMap({ onLocationSelect });
    await act(async () => {
      sdk.map.onClick?.(click());
    });
    expect(onLocationSelect).toHaveBeenCalledWith({
      ...resolved,
      coordinates: "-31,-64",
    });
    expect(screen.getByDisplayValue("Córdoba")).toBeInTheDocument();
    expect(sdk.center).toHaveBeenCalledWith({ lat: -31, lng: -64 });
  });
  it("ignores clicks without a coordinate and permits search typing", () => {
    renderMap();
    act(() => sdk.map.onClick?.({ latLng: null } as google.maps.MapMouseEvent));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "New place" },
    });
    expect(screen.getByDisplayValue("New place")).toBeInTheDocument();
    expect(reverseGeocode).not.toHaveBeenCalled();
  });
  it("resolves a dragged marker and selected search place", async () => {
    const onLocationSelect = vi.fn();
    renderMap({ initialCoordinates: "1,2", onLocationSelect });
    await act(async () => sdk.marker.onDragEnd?.(click(3, 4)));
    expect(onLocationSelect).toHaveBeenLastCalledWith({
      ...resolved,
      coordinates: "3,4",
    });
    act(() =>
      sdk.search.onLoad?.({
        getPlaces: () => [
          { geometry: { location: { lat: () => 5, lng: () => 6 } } },
        ],
      } as unknown as google.maps.places.SearchBox),
    );
    await act(async () => sdk.search.onPlacesChanged?.());
    expect(onLocationSelect).toHaveBeenLastCalledWith({
      ...resolved,
      coordinates: "5,6",
    });
  });
  it("shows recoverable geocoding errors and reports them", async () => {
    const error = new Error("Geocode failed");
    vi.mocked(reverseGeocode).mockRejectedValueOnce(error);
    const onError = vi.fn();
    renderMap({ onError });
    await act(async () => sdk.map.onClick?.(click()));
    expect(screen.getByRole("alert")).toHaveTextContent("Unable to resolve");
    expect(onError).toHaveBeenCalledWith(error);
    await act(async () => sdk.map.onClick?.(click(1, 2)));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
  it("discards out-of-order responses", async () => {
    let finishFirst!: (value: typeof resolved) => void;
    vi.mocked(reverseGeocode).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finishFirst = resolve;
        }),
    );
    const onLocationSelect = vi.fn();
    renderMap({ onLocationSelect });
    act(() => sdk.map.onClick?.(click(1, 2)));
    await act(async () => sdk.map.onClick?.(click(3, 4)));
    await act(async () =>
      finishFirst({ ...resolved, address: "Old response" }),
    );
    expect(onLocationSelect).toHaveBeenCalledTimes(1);
    expect(screen.getByDisplayValue("Córdoba")).toBeInTheDocument();
  });
  it("invalidates requests on readonly changes and unmount", async () => {
    let finish!: (value: typeof resolved) => void;
    vi.mocked(reverseGeocode).mockImplementation(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    );
    const onLocationSelect = vi.fn();
    const view = renderMap({ onLocationSelect });
    act(() => sdk.map.onClick?.(click()));
    view.rerender(
      <InteractiveMap
        googleMapsApiKey="test-key"
        readonly
        onLocationSelect={onLocationSelect}
      />,
    );
    await act(async () => finish(resolved));
    expect(onLocationSelect).not.toHaveBeenCalled();
    view.unmount();
  });
  it("applies modular root and part styles", () => {
    const { container } = renderMap({
      className: "custom",
      style: { padding: 4 },
      searchStyle: { padding: 8 },
      instructionsStyle: { opacity: 0.7 },
    });
    expect(container.querySelector(".interactive-map")).toHaveClass("custom");
    expect(container.querySelector(".interactive-map__search-box")).toHaveStyle(
      { padding: "8px" },
    );
    expect(container.querySelector(".interactive-map__info")).toHaveStyle({
      opacity: 0.7,
    });
  });
  it("accepts coordinate boundaries without treating blank input as zero", () => {
    expect(parseCoordinates("-90, 180")).toEqual({ lat: -90, lng: 180 });
    expect(parseCoordinates(" , ")).toBeNull();
  });
});
