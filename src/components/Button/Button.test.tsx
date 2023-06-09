import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, ButtonProps } from "./Button";

describe("Button", () => {
  const onClickMock = jest.fn();

  const renderComponent = (addtionalProps?: Partial<ButtonProps>) => {
    const defaultProps = {
      text: "Click me",
      onClick: onClickMock,
    };

    render(<Button {...defaultProps} {...addtionalProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen).not.toBeNull();
  });

  it("renders the text", () => {
    render(<Button text="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls the onClick handler when the button is clicked", async () => {
    renderComponent();
    await userEvent.click(screen.getByText("Click me"));

    expect(onClickMock).toHaveBeenCalled();
  });

  it("renders the leading icon when one is given", () => {
    render(<Button text="Click me" leadingIcon={<span>👋</span>} />);

    expect(screen.getByText("👋")).toBeInTheDocument();
  });

  it("renders the trailing icon when one is given", () => {
    render(<Button text="Click me" trailingIcon={<span>👋</span>} />);
    expect(screen.getByText("👋")).toBeInTheDocument();
  });

  it('renders the button with the "primary" variant by default', () => {
    renderComponent();
    expect(screen.getByText("Click me")).toHaveClass("bg-blue-500");
  });

  it("renders the button with a given variant", () => {
    renderComponent({ variant: "secondary" });
    expect(screen.getByText("Click me")).toHaveClass("bg-gray-500");
  });

  it('renders the button with the "button" type by default', () => {
    renderComponent();
    expect(screen.getByText("Click me")).toHaveAttribute("type", "button");
  });

  it("renders the button with a given type", () => {
    renderComponent({ type: "submit" });
    expect(screen.getByText("Click me")).toHaveAttribute("type", "submit");
  });
});
