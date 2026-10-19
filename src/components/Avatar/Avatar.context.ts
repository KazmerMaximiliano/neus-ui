import { createContext } from "react";
import type { AvatarSize } from "./Avatar.types";

/** The size an AvatarGroup gives the avatars inside it. */
export const AvatarSizeContext = createContext<AvatarSize | undefined>(undefined);
