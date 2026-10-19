import { composeStories } from "@storybook/react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { AvatarProps } from "../../../index";
import { Avatar } from "../../../index";
import * as stories from "../Avatar.stories";

afterEach(cleanup);

const { Avatar: AvatarStory } = composeStories(stories);

describe("Avatar", () => {
  it("shows initials named by the person, at medium size and the system's shape", () => {
    render(<Avatar name="Lucía Ferreyra" />);
    const avatar = screen.getByRole("img", { name: "Lucía Ferreyra" });
    expect(avatar).toHaveClass("avatar");
    expect(avatar).toHaveAttribute("data-size", "medium");
    expect(avatar).not.toHaveAttribute("data-shape");
    expect(avatar.querySelector(".avatar__initials")).toHaveTextContent("LF");
  });

  it("shows the picture and falls back to initials when it fails", () => {
    const { container } = render(<Avatar name="Ana" src="/ana.jpg" />);
    const image = container.querySelector("img")!;
    expect(image).toHaveClass("avatar__image");
    expect(image).toHaveAttribute("alt", "");
    fireEvent.error(image);
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Ana" })).toHaveTextContent("A");
  });

  it("hides a decorative avatar whose name is written beside it", () => {
    const { container } = render(<Avatar name="Ana Paz" alt="" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards size, shape, native attributes, refs and part hooks", () => {
    const ref = createRef<HTMLSpanElement>();
    const { container, rerender } = render(
      <Avatar ref={ref} name="Bo" size="large" shape="rounded" id="me" className="a" style={{ outline: "1px solid" }}
        initialsClassName="i" initialsStyle={{ color: "red" }} />,
    );
    const avatar = screen.getByRole("img", { name: "Bo" });
    expect(ref.current).toBe(avatar);
    expect(avatar).toHaveAttribute("data-size", "large");
    expect(avatar).toHaveAttribute("data-shape", "rounded");
    expect(avatar).toHaveAttribute("id", "me");
    expect(avatar).toHaveClass("avatar", "a");
    expect(avatar.firstElementChild).toHaveClass("avatar__initials", "i");
    expect(avatar.firstElementChild).toHaveStyle({ color: "rgb(255, 0, 0)" });
    rerender(<Avatar name="Bo" src="/bo.jpg" imageClassName="p" imageStyle={{ opacity: 0.5 }} />);
    expect(container.querySelector("img")).toHaveClass("avatar__image", "p");
    expect(container.querySelector("img")).toHaveStyle({ opacity: "0.5" });
  });

  it("renders its story", () => {
    render(<AvatarStory />);
    expect(screen.getByRole("img", { name: "Lucía Ferreyra" })).toHaveAttribute("data-size", "large");
  });

  it("requires a name", () => {
    expectTypeOf<AvatarProps>().toHaveProperty("src");
    // @ts-expect-error the name gives the initials and the accessible name
    void (<Avatar src="/x.jpg" />);
  });
});
