import type { InteractiveMapLabels } from "./InteractiveMap.types";

export const INTERACTIVE_MAP_LABELS: Required<InteractiveMapLabels> = {
  search: "Find location",
  loading: "Loading map…",
  loadError: "Unable to load the map.",
  resolveError: "Unable to resolve this location. Choose another location to try again.",
};

export const GOOGLE_MAPS_LIBRARIES: "places"[] = ["places"];

export const DEFAULT_CENTER = { lat: -31.4201, lng: -64.1888 };
