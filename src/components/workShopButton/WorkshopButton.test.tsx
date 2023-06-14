// Sarath G
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WorkshopButton, WorkshopButtonProps } from "./WorkshopButton";

describe("WorkshopButton", () => {
  const mockOnClick = jest.fn();
  const renderComponent = (additionalProps?: Partial<WorkshopButtonProps>) => {
    const defaultProps: WorkshopButtonProps = {
      text: "Test Button",
      variant: "primary",
      onClick: mockOnClick,
    };
    render(<WorkshopButton {...defaultProps} {...additionalProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen).not.toBeNull();
  });

  it("renders the button text", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: /Test Button/i }),
    ).toBeInTheDocument();
  });

  it("calls the onClick function when the button is clicked", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button", { name: /Test Button/i }));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("renders the leading icon when passed", () => {
    renderComponent({
      leadingIcon: <i className="chevronIcon" aria-hidden="false" role="img" />,
    });
    expect(screen.getByRole("img", { hidden: false })).toBeInTheDocument();
  });

  it("renders the trailing icon when passed", () => {
    renderComponent({
      trailingIcon: (
        <i className="trailingIcon" aria-hidden="false" role="img" />
      ),
    });
    expect(screen.getByRole("img", { hidden: false })).toBeInTheDocument();
  });

  it("applies the correct styles for primary variant", () => {
    renderComponent({ variant: "primary" });
    expect(screen.getByRole("button", { name: /Test Button/i })).toHaveClass(
      "bg-blue-500 hover:bg-blue-700 text-white",
    );
  });

  it("applies the correct styles for secondary variant", () => {
    renderComponent({ variant: "secondary" });
    expect(screen.getByRole("button", { name: /Test Button/i })).toHaveClass(
      "bg-gray-500 hover:bg-gray-700 text-white",
    );
  });

  it("applies the correct styles for danger variant", () => {
    renderComponent({ variant: "danger" });
    expect(screen.getByRole("button", { name: /Test Button/i })).toHaveClass(
      "bg-red-500 hover:bg-red-700 text-white",
    );
  });
});
