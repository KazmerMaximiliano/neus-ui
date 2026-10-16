import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider, useTheme } from "../index";

afterEach(cleanup);

const Consumer = () => {
  const { colors, colorScheme, designSystem, setColorScheme, updateTheme } = useTheme();
  return (
    <>
      <output>{`${designSystem}/${colorScheme}/${colors.primary.main}`}</output>
      <button onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}>
        Toggle mode
      </button>
      <button onClick={() => updateTheme({ primaryColor: "#123456" })}>Change primary</button>
      <button onClick={() => updateTheme({ successColor: "#654321" })}>Change success</button>
      <output aria-label="Success color">{colors.success.main}</output>
    </>
  );
};

describe("ThemeProvider", () => {
  it("preserves global Neus defaults without adding a layout wrapper", () => {
    const { container } = render(<ThemeProvider><Consumer /></ThemeProvider>);
    expect(screen.getByText("neus/light/#283593")).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("data-design-system", "neus");
    expect(document.documentElement.style.getPropertyValue("--color-primary")).toBe("#283593");
    expect(container.querySelector(".neus-theme-scope")).toBeNull();
  });

  it("keeps sibling scopes and the document independent", () => {
    const rootStyles = document.documentElement.style.cssText;
    const bodyStyles = document.body.style.cssText;
    const { container } = render(
      <>
        <ThemeProvider scope="local" designSystem="apple"><Consumer /></ThemeProvider>
        <ThemeProvider scope="local" designSystem="carbon"><Consumer /></ThemeProvider>
      </>,
    );
    const scopes = container.querySelectorAll<HTMLElement>(".neus-theme-scope");
    fireEvent.click(within(scopes[0]).getByText("Change primary"));
    expect(scopes[0].style.getPropertyValue("--color-primary")).toBe("#123456");
    expect(scopes[1].style.getPropertyValue("--color-primary")).toBe("#0f62fe");
    expect(document.documentElement.style.cssText).toBe(rootStyles);
    expect(document.body.style.cssText).toBe(bodyStyles);
  });

  it("isolates a nested light Neus scope within a dark Carbon scope", () => {
    const { container } = render(
      <ThemeProvider designSystem="carbon" initialColorScheme="dark">
        <Consumer />
        <ThemeProvider designSystem="neus" initialColorScheme="light"><Consumer /></ThemeProvider>
      </ThemeProvider>,
    );
    expect(screen.getByText("carbon/dark/#78a9ff")).toBeInTheDocument();
    expect(screen.getByText("neus/light/#283593")).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("data-color-scheme", "dark");
    expect(container.querySelector(".neus-theme-scope")).toHaveAttribute("data-color-scheme", "light");
  });

  it("inherits system and mode for an unspecified nested provider", () => {
    render(
      <ThemeProvider designSystem="material" colorScheme="dark">
        <ThemeProvider><Consumer /></ThemeProvider>
      </ThemeProvider>,
    );
    expect(screen.getByText("material/dark/#c8b3fd")).toBeInTheDocument();
  });

  it("updates mode and merges runtime color overrides", () => {
    const { container } = render(<ThemeProvider scope="local"><Consumer /></ThemeProvider>);
    fireEvent.click(screen.getByText("Toggle mode"));
    expect(screen.getByText("neus/dark/#a5b4fc")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Change primary"));
    fireEvent.click(screen.getByText("Change success"));
    expect(screen.getByText("neus/dark/#123456")).toBeInTheDocument();
    expect(screen.getByLabelText("Success color")).toHaveTextContent("#654321");
    const scope = container.querySelector<HTMLElement>(".neus-theme-scope")!;
    expect(scope.style.getPropertyValue("--color-primary")).toBe("#123456");
    expect(scope.style.getPropertyValue("--color-success")).toBe("#654321");
  });

  it("responds to controlled system and mode changes without retaining old palette values", () => {
    const { rerender } = render(<ThemeProvider designSystem="apple" colorScheme="light"><Consumer /></ThemeProvider>);
    rerender(<ThemeProvider designSystem="vercel" colorScheme="dark"><Consumer /></ThemeProvider>);
    expect(screen.getByText("vercel/dark/#ededed")).toBeInTheDocument();
    expect(document.documentElement.style.getPropertyValue("--color-focus")).toBe("#52a8ff");
    fireEvent.click(screen.getByText("Toggle mode"));
    expect(screen.getByText("vercel/dark/#ededed")).toBeInTheDocument();
  });

  it("restores global attributes and styles after StrictMode cleanup", () => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", "hotpink", "important");
    root.setAttribute("data-design-system", "existing");
    const { unmount } = render(<StrictMode><ThemeProvider><Consumer /></ThemeProvider></StrictMode>);
    unmount();
    expect(root.style.getPropertyValue("--color-primary")).toBe("hotpink");
    expect(root.style.getPropertyPriority("--color-primary")).toBe("important");
    expect(root).toHaveAttribute("data-design-system", "existing");
    root.style.removeProperty("--color-primary");
    root.removeAttribute("data-design-system");
  });

  it("can render a local scope on the server", () => {
    const html = renderToString(<ThemeProvider scope="local" designSystem="apple"><span>Content</span></ThemeProvider>);
    expect(html).toContain('data-design-system="apple"');
    expect(html).toContain("--color-primary:#0071e3");
    expect(html).toContain("Content");
  });
});
