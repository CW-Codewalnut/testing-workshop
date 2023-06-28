// Vishwakarma Kambar
// Test cases of WorkshopButton
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WorkshopButton, WorkshopButtonProps } from "./WorkshopButton";

describe("WorkshopButton", () => {
  const onClick = jest.fn();
  const renderComponent = (additionalProps?: Partial<WorkshopButtonProps>) => {
    const defaultProps: Partial<WorkshopButtonProps> = {
      text: "click me",
      variant: "primary",
      leadingIcon: "",
      trailingIcon: "",
      onClick: onClick,
      type: "button",
    };
    render(<WorkshopButton {...defaultProps} {...additionalProps} />);
  };

  it("renders the button text", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: "click me" }),
    ).toBeInTheDocument();
  });

  it("renders a button with the specified type", () => {
    renderComponent({ type: "submit" });
    expect(screen.getByRole("button", { name: "click me" })).toHaveAttribute(
      "type",
      "submit",
    );
  });

  it("renders the button with the specified variant class", () => {
    renderComponent({ variant: "secondary" });
    expect(screen.getByRole("button", { name: "click me" })).toHaveClass(
      "bg-gray-500",
    );
  });

  it("calls the onClick handler when clicked", async () => {
    renderComponent();
    await waitFor(() =>
      userEvent.click(screen.getByRole("button", { name: "click me" })),
    );
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
