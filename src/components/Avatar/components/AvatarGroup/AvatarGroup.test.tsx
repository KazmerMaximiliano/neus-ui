import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import { Avatar } from "../../Avatar";
import { AvatarGroup } from "./AvatarGroup";
import * as stories from "./AvatarGroup.stories";
import type { AvatarGroupProps } from "./AvatarGroup.types";

afterEach(cleanup);

const { AvatarGroup: AvatarGroupStory } = composeStories(stories);
const people = ["Ana Paz", "Bruno Díaz", "Carla Gómez", "Diego Ruiz"].map((name) => <Avatar key={name} name={name} />);

describe("AvatarGroup", () => {
  it("shows every avatar at the group's size without a count", () => {
    render(<AvatarGroup aria-label="Team" size="small">{people}</AvatarGroup>);
    const group = screen.getByRole("group", { name: "Team" });
    expect(group).toHaveClass("avatar-group");
    const avatars = screen.getAllByRole("img");
    expect(avatars).toHaveLength(4);
    for (const avatar of avatars) expect(avatar).toHaveAttribute("data-size", "small");
  });

  it("keeps an avatar's own size over the group's", () => {
    render(<AvatarGroup size="small"><Avatar name="Ana Paz" size="large" /></AvatarGroup>);
    expect(screen.getByRole("img", { name: "Ana Paz" })).toHaveAttribute("data-size", "large");
  });

  it("collapses the rest into a labelled count", () => {
    render(<AvatarGroup max={2} moreLabel={(hidden) => `${hidden} others`} moreClassName="more" moreStyle={{ color: "red" }}>{people}</AvatarGroup>);
    expect(screen.getAllByRole("img")).toHaveLength(3);
    const more = screen.getByRole("img", { name: "2 others" });
    expect(more).toHaveClass("avatar", "avatar-group__more", "more");
    expect(more).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(more).toHaveTextContent("2 others");
  });

  it("uses +N by default and forwards native attributes, classes, styles and refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<AvatarGroup ref={ref} max={1} id="team" className="g" style={{ gap: 4 }}>{people}</AvatarGroup>);
    const group = screen.getByRole("group");
    expect(ref.current).toBe(group);
    expect(group).toHaveAttribute("id", "team");
    expect(group).toHaveClass("avatar-group", "g");
    expect(group).toHaveStyle({ gap: "4px" });
    expect(screen.getByRole("img", { name: "+3" })).toBeInTheDocument();
  });

  it("renders its story", () => {
    render(<AvatarGroupStory />);
    expect(screen.getByRole("img", { name: "+2" })).toBeInTheDocument();
  });

  it("types max as a count", () => {
    expectTypeOf<AvatarGroupProps>().toHaveProperty("moreLabel");
    // @ts-expect-error max is a number
    void (<AvatarGroup max="3">{people}</AvatarGroup>);
  });
});
