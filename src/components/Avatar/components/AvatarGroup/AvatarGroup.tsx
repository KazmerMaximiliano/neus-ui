import { Children } from "react";
import { AvatarSizeContext } from "../../Avatar.context";
import "../../Avatar.styles.css";
import "./AvatarGroup.styles.css";
import type { AvatarGroupProps } from "./AvatarGroup.types";

/** Overlapping avatars of a team or the people in a thread, with a count for those not shown. */
export const AvatarGroup = ({
  children,
  max,
  size = "medium",
  moreLabel = (hidden) => `+${hidden}`,
  className,
  moreClassName,
  moreStyle,
  ...props
}: AvatarGroupProps) => {
  const avatars = Children.toArray(children);
  const shown = max === undefined ? avatars : avatars.slice(0, Math.max(0, max));
  const hidden = avatars.length - shown.length;
  return (
    <div {...props} role="group" className={["avatar-group", className].filter(Boolean).join(" ")}>
      <AvatarSizeContext.Provider value={size}>{shown}</AvatarSizeContext.Provider>
      {hidden > 0 && (
        <span
          role="img"
          aria-label={moreLabel(hidden)}
          className={["avatar", "avatar-group__more", moreClassName].filter(Boolean).join(" ")}
          data-size={size}
          style={moreStyle}
        >
          <span aria-hidden>{moreLabel(hidden)}</span>
        </span>
      )}
    </div>
  );
};
