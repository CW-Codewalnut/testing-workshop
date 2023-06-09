import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown, DropdownProps } from "./Dropdown";

describe("Dropdown", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const label = "Dropdown Label";
  const id = "dropdown-id";

  const renderComponent = (additionalProps?: Partial<DropdownProps>) => {
    const defaultProps: DropdownProps = {
      options,
      label,
      id,
    };
    render(<Dropdown {...defaultProps} {...additionalProps} />);
  };


  it("renders the dropdown component", () => {
    renderComponent();
    const dropdown = screen.getByLabelText(label);
    expect(dropdown).toBeInTheDocument();
  });

  it("renders the dropdown with three options", () => {
    renderComponent();
    const dropdownOptions = screen.getAllByRole("option");
    expect(dropdownOptions).toHaveLength(3);
    expect(dropdownOptions[0]).toHaveTextContent("Option 1");
    expect(dropdownOptions[1]).toHaveTextContent("Option 2");
    expect(dropdownOptions[2]).toHaveTextContent("Option 3");
  })
  
  it("selects the default value", () => {
    renderComponent();
    const dropdown = screen.getByLabelText(label);
    expect(dropdown).toHaveValue("Option 1");
  })



});
