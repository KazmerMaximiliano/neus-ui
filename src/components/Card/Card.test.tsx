import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Card } from "./Card";
import { CardProps } from "./Card.types";

afterEach(() => {
  cleanup();
});

const renderCard = (props: CardProps = {}) => {
  return render(<Card {...props} />);
};

describe("Card", () => {
  describe("rendering", () => {
    it("renders card element", () => {
      renderCard();
      expect(document.querySelector(".card")).toBeInTheDocument();
    });

    it("renders with content", () => {
      renderCard({ content: "Card content" });
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("renders content inside card-body", () => {
      renderCard({ content: "Body text" });
      const body = document.querySelector(".card-body");
      expect(body).toBeInTheDocument();
      expect(body).toHaveTextContent("Body text");
    });

    it("renders ReactNode content", () => {
      renderCard({ content: <span data-testid="custom">Custom</span> });
      expect(screen.getByTestId("custom")).toBeInTheDocument();
    });
  });

  describe("avatar", () => {
    it("does not render avatar-wrapper when no avatar props provided", () => {
      renderCard({ content: "No avatar" });
      expect(document.querySelector(".avatar-wrapper")).not.toBeInTheDocument();
    });

    it("renders avatar image when avatarImage is provided", () => {
      renderCard({ avatarImage: "https://example.com/avatar.png", avatarAlt: "User" });
      const img = screen.getByAltText("User");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/avatar.png");
      expect(img).toHaveClass("avatar");
    });

    it("renders avatar placeholder when only avatarAlt is provided", () => {
      renderCard({ avatarAlt: "Max" });
      const placeholder = document.querySelector(".avatar-placeholder");
      expect(placeholder).toBeInTheDocument();
      expect(placeholder).toHaveTextContent("M");
    });

    it("renders uppercase first letter of avatarAlt in placeholder", () => {
      renderCard({ avatarAlt: "john" });
      const placeholder = document.querySelector(".avatar-placeholder");
      expect(placeholder).toHaveTextContent("J");
    });

    it("renders 'A' in placeholder when avatarAlt is empty string", () => {
      renderCard({ avatarAlt: "" });
      expect(document.querySelector(".avatar-wrapper")).not.toBeInTheDocument();
    });

    it("renders avatar-wrapper when avatarImage is provided without avatarAlt", () => {
      renderCard({ avatarImage: "https://example.com/avatar.png" });
      const img = document.querySelector(".avatar");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/avatar.png");
    });
  });

  describe("header", () => {
    it("does not render header when header prop is not provided", () => {
      renderCard({ content: "No header" });
      expect(document.querySelector(".card-header")).not.toBeInTheDocument();
    });

    it("renders header with leading content", () => {
      renderCard({ header: { leading: "Title" } });
      const leading = document.querySelector(".header-leading");
      expect(leading).toBeInTheDocument();
      expect(leading).toHaveTextContent("Title");
    });

    it("renders header with trailing content", () => {
      renderCard({ header: { trailing: "Action" } });
      const trailing = document.querySelector(".header-trailing");
      expect(trailing).toBeInTheDocument();
      expect(trailing).toHaveTextContent("Action");
    });

    it("renders header with both leading and trailing", () => {
      renderCard({ header: { leading: "Title", trailing: "Button" } });
      expect(document.querySelector(".header-leading")).toHaveTextContent("Title");
      expect(document.querySelector(".header-trailing")).toHaveTextContent("Button");
    });

    it("renders ReactNode in header leading", () => {
      renderCard({ header: { leading: <span data-testid="lead">Lead</span> } });
      expect(screen.getByTestId("lead")).toBeInTheDocument();
    });

    it("renders ReactNode in header trailing", () => {
      renderCard({ header: { trailing: <button data-testid="action">X</button> } });
      expect(screen.getByTestId("action")).toBeInTheDocument();
    });
  });

  describe("fill", () => {
    it("does not apply fill class by default", () => {
      renderCard();
      expect(document.querySelector(".card")).not.toHaveClass("fill");
    });

    it("applies fill class when fill is true", () => {
      renderCard({ fill: true });
      expect(document.querySelector(".card")).toHaveClass("fill");
    });

    it("does not apply fill class when fill is false", () => {
      renderCard({ fill: false });
      expect(document.querySelector(".card")).not.toHaveClass("fill");
    });
  });

  describe("color", () => {
    it("does not apply color class by default", () => {
      renderCard();
      const card = document.querySelector(".card");
      expect(card).not.toHaveClass("purple");
      expect(card).not.toHaveClass("pink");
      expect(card).not.toHaveClass("red");
      expect(card).not.toHaveClass("yellow");
      expect(card).not.toHaveClass("blue");
      expect(card).not.toHaveClass("green");
    });

    it.each(["purple", "pink", "red", "yellow", "blue", "green"] as const)(
      "applies %s color class when specified",
      (color) => {
        renderCard({ color, fill: true });
        expect(document.querySelector(".card")).toHaveClass(color);
      },
    );
  });

  describe("combined props", () => {
    it("renders full card with all props", () => {
      renderCard({
        avatarImage: "https://example.com/avatar.png",
        avatarAlt: "User",
        header: { leading: "Title", trailing: "Close" },
        content: "Full content",
        fill: true,
        color: "blue",
      });

      const card = document.querySelector(".card");
      expect(card).toHaveClass("fill");
      expect(card).toHaveClass("blue");
      expect(screen.getByAltText("User")).toBeInTheDocument();
      expect(document.querySelector(".header-leading")).toHaveTextContent("Title");
      expect(document.querySelector(".header-trailing")).toHaveTextContent("Close");
      expect(screen.getByText("Full content")).toBeInTheDocument();
    });
  });
});
