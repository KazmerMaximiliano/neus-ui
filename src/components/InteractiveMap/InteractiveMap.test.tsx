import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { InteractiveMap } from "./InteractiveMap";

vi.mock("@react-google-maps/api", () => ({
  GoogleMap: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="google-map">{children}</div>
  ),
  Marker: () => <div data-testid="map-marker" />,
  StandaloneSearchBox: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="search-box">{children}</div>
  ),
  useJsApiLoader: () => ({
    isLoaded: true,
  }),
}));

afterEach(() => {
  cleanup();
});

const renderInteractiveMap = (props = {}) => {
  return render(
    <ThemeProvider>
      <InteractiveMap googleMapsApiKey="test-api-key" {...props} />
    </ThemeProvider>,
  );
};

describe("InteractiveMap", () => {
  describe("rendering", () => {
    it("renders map container", () => {
      const { container } = renderInteractiveMap();
      expect(
        container.querySelector(".interactive-map"),
      ).toBeInTheDocument();
    });

    it("renders Google Map component", () => {
      renderInteractiveMap();
      expect(screen.getByTestId("google-map")).toBeInTheDocument();
    });

    it("renders search box when not readonly", () => {
      renderInteractiveMap();
      expect(screen.getByTestId("search-box")).toBeInTheDocument();
    });

    it("does not render search box when readonly", () => {
      renderInteractiveMap({ readonly: true });
      expect(screen.queryByTestId("search-box")).not.toBeInTheDocument();
    });

    it("renders instructions text when not readonly", () => {
      const { container } = renderInteractiveMap();
      expect(container.querySelector(".interactive-map__info")).toBeInTheDocument();
    });

    it("does not render instructions when readonly", () => {
      const { container } = renderInteractiveMap({ readonly: true });
      expect(container.querySelector(".interactive-map__info")).not.toBeInTheDocument();
    });
  });

  describe("search box", () => {
    it("renders with default placeholder", () => {
      renderInteractiveMap();
      const input = screen.getByPlaceholderText("Find location...");
      expect(input).toBeInTheDocument();
    });

    it("renders with custom placeholder", () => {
      renderInteractiveMap({ searchBoxPlaceholder: "Search here..." });
      const input = screen.getByPlaceholderText("Search here...");
      expect(input).toBeInTheDocument();
    });
  });

  describe("instructions", () => {
    it("renders default instructions", () => {
      renderInteractiveMap();
      expect(
        screen.getByText(/Click on the map or search for a location/),
      ).toBeInTheDocument();
    });

    it("renders custom instructions text", () => {
      renderInteractiveMap({ instructionsText: "Custom instructions here" });
      expect(screen.getByText("Custom instructions here")).toBeInTheDocument();
    });
  });

  describe("initial values", () => {
    it("accepts initial coordinates", () => {
      renderInteractiveMap({ initialCoordinates: "-31.4201,-64.1888" });
      expect(screen.getByTestId("google-map")).toBeInTheDocument();
    });

    it("accepts initial address", () => {
      renderInteractiveMap({ initialAddress: "Córdoba, Argentina" });
      const input = screen.getByDisplayValue("Córdoba, Argentina");
      expect(input).toBeInTheDocument();
    });

    it("shows marker when initial coordinates are provided", () => {
      renderInteractiveMap({ initialCoordinates: "-31.4201,-64.1888" });
      expect(screen.getByTestId("map-marker")).toBeInTheDocument();
    });
  });

  describe("onLocationSelect callback", () => {
    it("accepts onLocationSelect prop", () => {
      const onLocationSelect = vi.fn();
      renderInteractiveMap({ onLocationSelect });
      expect(screen.getByTestId("google-map")).toBeInTheDocument();
    });
  });
});
