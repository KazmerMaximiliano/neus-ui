import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
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

    it("renders with children", () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("renders children inside card-body", () => {
      render(<Card>Body text</Card>);
      const body = document.querySelector(".card__body");
      expect(body).toBeInTheDocument();
      expect(body).toHaveTextContent("Body text");
    });

    it("renders ReactNode children", () => {
      render(
        <Card>
          <span data-testid="custom">Custom</span>
        </Card>,
      );
      expect(screen.getByTestId("custom")).toBeInTheDocument();
    });

    it("renders as div by default", () => {
      renderCard();
      expect(document.querySelector("div.card")).toBeInTheDocument();
    });

    it("renders as button when onClick is provided", () => {
      renderCard({ onClick: vi.fn() });
      expect(document.querySelector("button.card")).toBeInTheDocument();
    });
  });

  describe("avatar", () => {
    it("does not render avatar-wrapper when no avatar props provided", () => {
      render(<Card>No avatar</Card>);
      expect(document.querySelector(".card__avatar-wrapper")).not.toBeInTheDocument();
    });

    it("renders avatar image when avatarImage is provided", () => {
      renderCard({
        avatarImage: "https://example.com/avatar.png",
        avatarAlt: "User",
      });
      const img = screen.getByAltText("User");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/avatar.png");
      expect(img).toHaveClass("avatar");
    });

    it("renders avatar placeholder when only avatarAlt is provided", () => {
      renderCard({ avatarAlt: "Max" });
      const placeholder = document.querySelector(".card__avatar-placeholder");
      expect(placeholder).toBeInTheDocument();
      expect(placeholder).toHaveTextContent("M");
    });

    it("renders uppercase first letter of avatarAlt in placeholder", () => {
      renderCard({ avatarAlt: "john" });
      const placeholder = document.querySelector(".card__avatar-placeholder");
      expect(placeholder).toHaveTextContent("J");
    });

    it("does not render avatar-wrapper when avatarAlt is empty string", () => {
      renderCard({ avatarAlt: "" });
      expect(document.querySelector(".card__avatar-wrapper")).not.toBeInTheDocument();
    });

    it("renders avatar-wrapper when avatarImage is provided without avatarAlt", () => {
      renderCard({ avatarImage: "https://example.com/avatar.png" });
      const img = document.querySelector(".avatar");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/avatar.png");
    });
  });

  describe("header", () => {
    it("does not render header when leading and trailing are not provided", () => {
      render(<Card>No header</Card>);
      expect(document.querySelector(".card__header")).not.toBeInTheDocument();
    });

    it("renders header with leading content", () => {
      renderCard({ leading: "Title" });
      const leading = document.querySelector(".card__header-leading");
      expect(leading).toBeInTheDocument();
      expect(leading).toHaveTextContent("Title");
    });

    it("renders header with trailing content", () => {
      renderCard({ trailing: "Action" });
      const trailing = document.querySelector(".card__header-trailing");
      expect(trailing).toBeInTheDocument();
      expect(trailing).toHaveTextContent("Action");
    });

    it("renders header with both leading and trailing", () => {
      renderCard({ leading: "Title", trailing: "Button" });
      expect(document.querySelector(".card__header-leading")).toHaveTextContent("Title");
      expect(document.querySelector(".card__header-trailing")).toHaveTextContent("Button");
    });

    it("renders ReactNode in header leading", () => {
      renderCard({ leading: <span data-testid="lead">Lead</span> });
      expect(screen.getByTestId("lead")).toBeInTheDocument();
    });

    it("renders ReactNode in header trailing", () => {
      renderCard({ trailing: <button data-testid="action">X</button> });
      expect(screen.getByTestId("action")).toBeInTheDocument();
    });
  });

  describe("slots (icon, title, description)", () => {
    it("does not render slots section when no slot props provided", () => {
      renderCard();
      expect(document.querySelector(".card__slots")).not.toBeInTheDocument();
    });

    it("renders icon slot", () => {
      renderCard({ icon: <span data-testid="icon">★</span> });
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(document.querySelector(".card__slot-icon")).toBeInTheDocument();
    });

    it("renders title slot", () => {
      renderCard({ title: "Feature Title" });
      expect(screen.getByText("Feature Title")).toBeInTheDocument();
      expect(document.querySelector(".card__slot-title")).toBeInTheDocument();
    });

    it("renders description slot", () => {
      renderCard({ description: "Feature description text" });
      expect(screen.getByText("Feature description text")).toBeInTheDocument();
      expect(document.querySelector(".card__slot-description")).toBeInTheDocument();
    });

    it("renders all slots together", () => {
      renderCard({
        icon: <span data-testid="icon">★</span>,
        title: "Fast Invoicing",
        description: "Create invoices in seconds",
      });
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Fast Invoicing")).toBeInTheDocument();
      expect(screen.getByText("Create invoices in seconds")).toBeInTheDocument();
    });

    it("does not render icon element when icon is not provided", () => {
      renderCard({ title: "No icon" });
      expect(document.querySelector(".card__slot-icon")).not.toBeInTheDocument();
    });
  });

  describe("fill", () => {
    it("does not apply fill class by default", () => {
      renderCard();
      expect(document.querySelector(".card")).not.toHaveClass("card--fill");
    });

    it("applies fill class when fill is true", () => {
      renderCard({ fill: true });
      expect(document.querySelector(".card")).toHaveClass("card--fill");
    });

    it("does not apply fill class when fill is false", () => {
      renderCard({ fill: false });
      expect(document.querySelector(".card")).not.toHaveClass("card--fill");
    });
  });

  describe("color", () => {
    it("does not apply color class by default", () => {
      renderCard();
      const card = document.querySelector(".card");
      expect(card).not.toHaveClass("card--purple");
      expect(card).not.toHaveClass("card--pink");
      expect(card).not.toHaveClass("card--red");
      expect(card).not.toHaveClass("card--yellow");
      expect(card).not.toHaveClass("card--blue");
      expect(card).not.toHaveClass("card--green");
    });

    it.each(["purple", "pink", "red", "yellow", "blue", "green"] as const)(
      "applies %s color class when specified",
      (color) => {
        renderCard({ color, fill: true });
        expect(document.querySelector(".card")).toHaveClass(`card--${color}`);
      },
    );
  });

  describe("behavioral modifiers", () => {
    it("applies card--highlighted class when highlighted is true", () => {
      renderCard({ highlighted: true });
      expect(document.querySelector(".card")).toHaveClass("card--highlighted");
    });

    it("does not apply card--highlighted class by default", () => {
      renderCard();
      expect(document.querySelector(".card")).not.toHaveClass("card--highlighted");
    });

    it("applies card--selected class when selected is true", () => {
      renderCard({ selected: true });
      expect(document.querySelector(".card")).toHaveClass("card--selected");
    });

    it("does not apply card--selected class by default", () => {
      renderCard();
      expect(document.querySelector(".card")).not.toHaveClass("card--selected");
    });

    it("applies card--disabled class when disabled is true", () => {
      renderCard({ disabled: true });
      expect(document.querySelector(".card")).toHaveClass("card--disabled");
    });

    it("does not apply card--disabled class by default", () => {
      renderCard();
      expect(document.querySelector(".card")).not.toHaveClass("card--disabled");
    });

    it("applies card--interactive class when onClick is provided", () => {
      renderCard({ onClick: vi.fn() });
      expect(document.querySelector(".card")).toHaveClass("card--interactive");
    });

    it("calls onClick when card is clicked", async () => {
      const handleClick = vi.fn();
      renderCard({ onClick: handleClick });
      await userEvent.click(document.querySelector("button.card")!);
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it("does not call onClick when disabled", async () => {
      const handleClick = vi.fn();
      renderCard({ onClick: handleClick, disabled: true });
      const btn = document.querySelector("button.card")!;
      await userEvent.click(btn);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("combined props", () => {
    it("renders full card with all default props", () => {
      render(
        <Card
          avatarImage="https://example.com/avatar.png"
          avatarAlt="User"
          leading="Title"
          trailing="Close"
          fill
          color="blue"
        >
          Full content
        </Card>,
      );

      const card = document.querySelector(".card");
      expect(card).toHaveClass("card--fill");
      expect(card).toHaveClass("card--blue");
      expect(screen.getByAltText("User")).toBeInTheDocument();
      expect(document.querySelector(".card__header-leading")).toHaveTextContent("Title");
      expect(document.querySelector(".card__header-trailing")).toHaveTextContent("Close");
      expect(screen.getByText("Full content")).toBeInTheDocument();
    });
  });
});
