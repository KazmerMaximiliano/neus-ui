import { composeStories } from "@storybook/react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ComponentPropsWithRef } from "react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import type { CardMediaProps } from "../../../index";
import { CardMedia } from "./CardMedia";
import * as stories from "./CardMedia.stories";

afterEach(cleanup);

const { CardMedia: MediaStory } = composeStories(stories);

const Player = ({
  playbackId,
  ...props
}: ComponentPropsWithRef<"video"> & { playbackId: string }) => (
  <video {...props} data-playback-id={playbackId} />
);

describe("CardMedia", () => {
  it("defaults to a direct image with its native attributes and reference", () => {
    const ref = createRef<HTMLImageElement>();
    const { container } = render(
      <CardMedia
        ref={ref}
        src="/photo.jpg"
        alt="Mountain"
        loading="lazy"
        srcSet="/photo.jpg 1x, /photo-2x.jpg 2x"
        width={800}
        height={450}
      />,
    );
    const image = screen.getByRole("img", { name: "Mountain" });
    expect(container.firstElementChild).toBe(image);
    expect(ref.current).toBe(image);
    expect(image).toHaveClass("card-media");
    expect(image).toHaveAttribute("src", "/photo.jpg");
    expect(image).toHaveAttribute("srcset", "/photo.jpg 1x, /photo-2x.jpg 2x");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("width", "800");
    expect(image).toHaveAttribute("height", "450");
    expect(image).not.toHaveAttribute("style");
    expect(image).not.toHaveAttribute("component");
  });

  it("renders video sources, captions, fallback content and native playback events", () => {
    const ref = createRef<HTMLVideoElement>();
    const onPlay = vi.fn();
    render(
      <CardMedia
        component="video"
        ref={ref}
        controls
        muted
        poster="/poster.jpg"
        preload="none"
        aria-label="Film"
        onPlay={onPlay}
      >
        <source src="/film.webm" type="video/webm" />
        <track
          kind="captions"
          src="/captions.vtt"
          srcLang="en"
          label="English"
        />
        Video fallback
      </CardMedia>,
    );
    const video = screen.getByLabelText("Film");
    expect(video.tagName).toBe("VIDEO");
    expect(ref.current).toBe(video);
    expect(video).toHaveAttribute("controls");
    expect(ref.current?.muted).toBe(true);
    expect(video).toHaveAttribute("poster", "/poster.jpg");
    expect(video.querySelector("source")).toHaveAttribute("type", "video/webm");
    expect(video.querySelector("track")).toHaveAttribute("kind", "captions");
    expect(video).toHaveTextContent("Video fallback");
    fireEvent.play(video);
    expect(onPlay).toHaveBeenCalledOnce();
  });

  it("supports audio, iframe and arbitrary native media containers", () => {
    const { rerender } = render(
      <CardMedia
        component="audio"
        src="/audio.ogg"
        controls
        aria-label="Recording"
      />,
    );
    expect(screen.getByLabelText("Recording").tagName).toBe("AUDIO");
    expect(screen.getByLabelText("Recording")).toHaveAttribute(
      "src",
      "/audio.ogg",
    );
    rerender(
      <CardMedia
        component="iframe"
        title="Embedded player"
        sandbox=""
        srcDoc="<p>Local player</p>"
        allow="fullscreen"
      />,
    );
    expect(screen.getByTitle("Embedded player").tagName).toBe("IFRAME");
    expect(screen.getByTitle("Embedded player")).toHaveAttribute("sandbox", "");
    expect(screen.getByTitle("Embedded player")).toHaveAttribute(
      "allow",
      "fullscreen",
    );
    rerender(
      <CardMedia component="picture">
        <img src="/photo.jpg" alt="Responsive" />
      </CardMedia>,
    );
    expect(screen.getByAltText("Responsive").parentElement?.tagName).toBe(
      "PICTURE",
    );
    expect(screen.getByAltText("Responsive").parentElement).toHaveClass(
      "card-media",
    );
  });

  it("forwards required custom player props, classes, styles and ref", () => {
    const ref = createRef<HTMLVideoElement>();
    render(
      <CardMedia
        component={Player}
        playbackId="demo"
        ref={ref}
        controls
        aria-label="Custom player"
        className="player"
        style={{ height: 200 }}
      />,
    );
    const player = screen.getByLabelText("Custom player");
    expect(ref.current).toBe(player);
    expect(player).toHaveAttribute("data-playback-id", "demo");
    expect(player).toHaveClass("card-media", "player");
    expect(player).toHaveStyle({ height: "200px" });
  });

  it("clears custom styles when style becomes null", () => {
    const { rerender } = render(
      <CardMedia alt="Preview" style={{ objectFit: "contain" }} />,
    );
    expect(screen.getByAltText("Preview")).toHaveStyle({
      objectFit: "contain",
    });
    rerender(<CardMedia alt="Preview" style={null} />);
    expect(screen.getByAltText("Preview").style.objectFit).toBe("");
  });

  it("infers only the selected element's props and ref at type checking", () => {
    expectTypeOf<CardMediaProps<"video">>().toHaveProperty("controls");
    expectTypeOf<CardMediaProps>().not.toHaveProperty("controls");
    expectTypeOf<CardMediaProps>().toHaveProperty("alt");
    // @ts-expect-error Image is the default; video props must not widen the inferred element.
    void (<CardMedia controls />);
    // @ts-expect-error Native video elements do not support alt.
    void (<CardMedia component="video" alt="Invalid" />);
    // @ts-expect-error The ref must match the selected video element.
    void (<CardMedia component="video" ref={createRef<HTMLImageElement>()} />);
    // @ts-expect-error The default image also infers an image ref.
    void (<CardMedia ref={createRef<HTMLVideoElement>()} />);
    // @ts-expect-error Custom player props remain required.
    void (<CardMedia component={Player} />);
    // @ts-expect-error Images are void elements and cannot have children.
    void (<CardMedia>Invalid child</CardMedia>);
  });
});

describe("CardMedia story", () => {
  it.each(["img", "video", "audio", "iframe"] as const)(
    "previews %s without remote assets",
    (component) => {
      const { container } = render(<MediaStory component={component} />);
      const media = container.querySelector(".card-media")!;
      expect(media.tagName.toLowerCase()).toBe(component);
      expect(media).not.toHaveAttribute("designSystem");
      expect(media.closest("[data-design-system]")).toHaveAttribute(
        "data-design-system",
        "neus",
      );
    },
  );

  it("forwards media URL, poster, style and selected design from controls", () => {
    const { container } = render(
      <MediaStory
        component="video"
        src="/custom.webm"
        poster="/custom.png"
        designSystem="material"
        controls={false}
        className="custom-media"
        style={{ height: 120 }}
      />,
    );
    const media = container.querySelector("video")!;
    expect(media).toHaveClass("custom-media");
    expect(media).toHaveStyle({ height: "120px" });
    expect(media).toHaveAttribute("src", "/custom.webm");
    expect(media).toHaveAttribute("poster", "/custom.png");
    expect(media).not.toHaveAttribute("controls");
    expect(media.closest("[data-design-system]")).toHaveAttribute(
      "data-design-system",
      "material",
    );
  });
});
