import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Card } from "../components/Card/Card";
import previewImage from "../components/Card/Card.stories.svg";
import { CardContent } from "../components/Card/CardContent/CardContent";
import { CardFooter } from "../components/Card/CardFooter/CardFooter";
import { CardHeader } from "../components/Card/CardHeader/CardHeader";
import { CardMedia } from "../components/Card/CardMedia/CardMedia";
import "../css/app.css";
import { ThemeProvider } from "../providers";

afterEach(cleanup);

const CARD_SYSTEM_CASES = [
  {
    id: "neus",
    radius: "16px",
    border: "1px",
    shadow: false,
    secondary: false,
  },
  {
    id: "apple",
    radius: "12px",
    border: "1px",
    shadow: true,
    secondary: false,
  },
  {
    id: "carbon",
    radius: "0px",
    border: "0px",
    shadow: false,
    secondary: true,
  },
  {
    id: "material",
    radius: "12px",
    border: "0px",
    shadow: true,
    secondary: true,
  },
  {
    id: "neobrutalism",
    radius: "4px",
    border: "3px",
    shadow: true,
    secondary: false,
  },
  {
    id: "vercel",
    radius: "6px",
    border: "1px",
    shadow: false,
    secondary: false,
  },
] as const;

describe.each(["light", "dark"] as const)(
  "Card designs in %s mode",
  (scheme) => {
    it.each(CARD_SYSTEM_CASES)(
      "renders $id geometry, surfaces and edge-to-edge media",
      async (system) => {
        const ref = createRef<HTMLDivElement>();
        render(
          <ThemeProvider
            scope="local"
            designSystem={system.id}
            colorScheme={scheme}
          >
            <Card ref={ref} style={{ width: 400 }}>
              <CardHeader>
                <h2>Landscape</h2>
                <span>Preview</span>
              </CardHeader>
              <CardMedia src={previewImage} alt="Mountains" />
              <CardContent>Content</CardContent>
              <CardFooter>
                <button>Save</button>
                <button>Share</button>
              </CardFooter>
            </Card>
          </ThemeProvider>,
        );
        const card = ref.current!;
        const styles = getComputedStyle(card);
        expect(styles.borderRadius).toBe(system.radius);
        expect(styles.borderTopWidth).toBe(system.border);
        expect(styles.boxShadow === "none").toBe(!system.shadow);
        expect(styles.backgroundColor).toBe(
          system.secondary
            ? scheme === "dark"
              ? "rgb(42, 42, 61)"
              : system.id === "carbon"
                ? "rgb(244, 244, 244)"
                : "rgb(249, 250, 251)"
            : scheme === "dark"
              ? "rgb(30, 30, 46)"
              : system.id === "neobrutalism"
                ? "rgb(251, 251, 249)"
                : "rgb(255, 255, 255)",
        );
        expect(styles.padding).toBe("0px");
        expect(styles.gap).toBe("0px");
        expect(styles.flexDirection).toBe("column");
        expect(styles.overflow).toBe("hidden");

        const header = getComputedStyle(
          screen.getByRole("heading").parentElement!,
        );
        expect(header.padding).toBe("16px");
        expect(header.justifyContent).toBe("space-between");
        expect(header.borderBottomWidth).toBe(
          system.id === "neus" ? "1px" : "0px",
        );
        expect(getComputedStyle(screen.getByText("Content")).padding).toBe(
          "16px",
        );
        const footer = getComputedStyle(
          screen.getByRole("button", { name: "Save" }).parentElement!,
        );
        expect(footer.padding).toBe("8px");
        expect(footer.gap).toBe("8px");
        expect(footer.flexWrap).toBe("wrap");

        const media = screen.getByRole("img") as HTMLImageElement;
        await waitFor(() => expect(media.naturalWidth).toBe(800));
        const mediaBounds = media.getBoundingClientRect();
        const cardBounds = card.getBoundingClientRect();
        const border = parseFloat(system.border);
        expect(mediaBounds.x).toBeCloseTo(cardBounds.x + border, 1);
        expect(mediaBounds.width).toBeCloseTo(cardBounds.width - 2 * border, 1);
        expect(mediaBounds.height).toBeCloseTo(
          (mediaBounds.width * 450) / 800,
          1,
        );
        expect(getComputedStyle(media).padding).toBe("0px");
      },
    );
  },
);

describe("Card theme boundaries and overrides", () => {
  it("resets all geometry in nested Neus scopes and leaves siblings isolated", () => {
    render(
      <>
        <ThemeProvider
          scope="local"
          designSystem="neobrutalism"
          colorScheme="dark"
        >
          <Card>
            <CardHeader>Outer</CardHeader>
          </Card>
          <ThemeProvider designSystem="neus" colorScheme="light">
            <Card>
              <CardHeader>Inner</CardHeader>
            </Card>
          </ThemeProvider>
        </ThemeProvider>
        <ThemeProvider scope="local" designSystem="vercel">
          <Card>
            <CardHeader>Sibling</CardHeader>
          </Card>
        </ThemeProvider>
      </>,
    );
    const outer = getComputedStyle(screen.getByText("Outer").closest(".card")!);
    const inner = getComputedStyle(screen.getByText("Inner").closest(".card")!);
    const sibling = getComputedStyle(
      screen.getByText("Sibling").closest(".card")!,
    );
    expect(outer.borderTopWidth).toBe("3px");
    expect(outer.boxShadow).not.toBe("none");
    expect(inner.borderTopWidth).toBe("1px");
    expect(inner.borderRadius).toBe("16px");
    expect(inner.boxShadow).toBe("none");
    expect(inner.backgroundColor).toBe("rgb(255, 255, 255)");
    expect(getComputedStyle(screen.getByText("Inner")).borderBottomWidth).toBe(
      "1px",
    );
    expect(sibling.borderRadius).toBe("6px");
    expect(sibling.boxShadow).toBe("none");
  });

  it("updates a mounted card when its design system and mode change", () => {
    const { rerender } = render(
      <ThemeProvider scope="local" designSystem="neobrutalism">
        <Card>
          <CardHeader>Card</CardHeader>
        </Card>
      </ThemeProvider>,
    );
    const card = screen.getByText("Card").closest(".card")!;
    expect(getComputedStyle(card).borderTopWidth).toBe("3px");
    rerender(
      <ThemeProvider scope="local" designSystem="carbon" colorScheme="dark">
        <Card>
          <CardHeader>Card</CardHeader>
        </Card>
      </ThemeProvider>,
    );
    expect(getComputedStyle(card).borderRadius).toBe("0px");
    expect(getComputedStyle(card).borderTopWidth).toBe("0px");
    expect(getComputedStyle(card).boxShadow).toBe("none");
    expect(getComputedStyle(card).backgroundColor).toBe("rgb(42, 42, 61)");
  });

  it("honors each element's style and restores theme values after clearing it", () => {
    const { rerender } = render(
      <ThemeProvider scope="local" designSystem="neobrutalism">
        <Card style={{ borderRadius: 20 }}>
          <CardHeader style={{ padding: 23 }}>Header</CardHeader>
          <CardMedia
            src={previewImage}
            alt="Preview"
            style={{ height: 80, objectFit: "contain" }}
          />
          <CardContent style={{ padding: 27 }}>Content</CardContent>
          <CardFooter style={{ gap: 19 }}>Footer</CardFooter>
        </Card>
      </ThemeProvider>,
    );
    expect(
      getComputedStyle(screen.getByText("Header").closest(".card")!)
        .borderRadius,
    ).toBe("20px");
    expect(getComputedStyle(screen.getByText("Header")).padding).toBe("23px");
    expect(getComputedStyle(screen.getByText("Content")).padding).toBe("27px");
    expect(getComputedStyle(screen.getByText("Footer")).gap).toBe("19px");
    expect(getComputedStyle(screen.getByText("Footer")).padding).toBe("8px");
    expect(getComputedStyle(screen.getByRole("img")).height).toBe("80px");
    expect(getComputedStyle(screen.getByRole("img")).objectFit).toBe("contain");
    rerender(
      <ThemeProvider scope="local" designSystem="neobrutalism">
        <Card style={null}>
          <CardHeader style={null}>Header</CardHeader>
          <CardMedia src={previewImage} alt="Preview" style={null} />
          <CardContent style={null}>Content</CardContent>
          <CardFooter style={null}>Footer</CardFooter>
        </Card>
      </ThemeProvider>,
    );
    expect(
      getComputedStyle(screen.getByText("Header").closest(".card")!)
        .borderRadius,
    ).toBe("4px");
    expect(getComputedStyle(screen.getByText("Header")).padding).toBe("16px");
    expect(getComputedStyle(screen.getByText("Content")).padding).toBe("16px");
    expect(getComputedStyle(screen.getByText("Footer")).gap).toBe("8px");
    expect(getComputedStyle(screen.getByRole("img")).objectFit).toBe("cover");
  });

  it("allows reusable class overrides without styling unrelated descendants", () => {
    render(
      <ThemeProvider scope="local">
        <style>
          {
            ".custom-card { --card-radius: 22px; } .custom-content { padding: 30px; }"
          }
        </style>
        <Card className="custom-card">
          <CardHeader>Header</CardHeader>
          <CardContent className="custom-content">Content</CardContent>
        </Card>
      </ThemeProvider>,
    );
    expect(
      getComputedStyle(screen.getByText("Header").closest(".card")!)
        .borderRadius,
    ).toBe("22px");
    expect(getComputedStyle(screen.getByText("Header")).padding).toBe("16px");
    expect(getComputedStyle(screen.getByText("Content")).padding).toBe("30px");
  });

  it("keeps native actions focusable without making the container interactive", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local">
        <Card>
          <CardContent>Content</CardContent>
          <CardFooter>
            <button onClick={onClick}>Save</button>
            <a href="#next">Next</a>
          </CardFooter>
        </Card>
      </ThemeProvider>,
    );
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
    await user.tab();
    expect(screen.getByRole("link")).toHaveFocus();
    expect(screen.getByText("Content").closest(".card")).not.toHaveAttribute(
      "tabindex",
    );
  });
});
