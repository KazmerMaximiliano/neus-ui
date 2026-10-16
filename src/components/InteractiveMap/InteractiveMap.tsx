import { useEffect, useMemo } from "react";
import { MapRuntime } from "./components/MapRuntime";
import "./InteractiveMap.styles.css";
import type { InteractiveMapProps } from "./InteractiveMap.types";
import { parseCoordinates } from "./InteractiveMap.utils";

export const InteractiveMap = (props: InteractiveMapProps) => {
  const { onError } = props;
  const error = useMemo(
    () =>
      !props.googleMapsApiKey.trim()
        ? new Error("A Google Maps API key is required")
        : props.initialCoordinates !== undefined &&
          !parseCoordinates(props.initialCoordinates)
          ? new Error(
            "Coordinates must contain latitude (-90…90) and longitude (-180…180)",
          )
          : null,
    [props.googleMapsApiKey, props.initialCoordinates],
  );
  useEffect(() => {
    if (error) onError?.(error);
  }, [error, onError]);
  return (
    <div
      className={["interactive-map", props.className].filter(Boolean).join(" ")}
      style={props.style}
    >
      {error ? (
        <div
          role="alert"
          className={["interactive-map__error", props.errorClassName]
            .filter(Boolean)
            .join(" ")}
          style={props.errorStyle}
        >
          {error.message}
        </div>
      ) : (
        <MapRuntime
          key={`${props.googleMapsApiKey}:${props.initialCoordinates ?? ""}:${props.initialAddress ?? ""}`}
          {...props}
        />
      )}
    </div>
  );
};
