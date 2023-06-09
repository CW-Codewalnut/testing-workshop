import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown, DropdownProps } from "./Dropdown";

describe("Accordion", () => {
  const renderComponent = (additionalProps?: Partial<DropdownProps>) => {
    const defaultProps = {
      options: ["Option 1", "Option 2", "Option 3"],
      label: "Select an option",
      id: "Test",
    };

    render(<Dropdown {...defaultProps} {...additionalProps} />);
  };

  it("renders the label when given", () => {
    renderComponent();
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("renders the first option by default", () => {
    renderComponent();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("render the dropdown options when clicked", async () => {
    renderComponent();
    await userEvent.click(screen.getByText("Option 1"));

    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });
});
