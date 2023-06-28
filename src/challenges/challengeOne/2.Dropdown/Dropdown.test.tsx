import React from "react";
import { render, screen } from "@testing-library/react";
import { Dropdown, DropdownProps } from "./Dropdown";

describe("Dropdown", () => {
  const mockOptions = ["Option 1", "Option 2", "Option 3"];
  const mockLabel = "Dropdown Label";
  const mockId = "dropdownId";

  const renderComponent = (additionalProps?: Partial<DropdownProps>) => {
    const defaultProps: Partial<DropdownProps> = {
      options: mockOptions,
      label: mockLabel,
      id: mockId,
    };
    render(<Dropdown {...defaultProps} {...additionalProps} />);
  };

  it("renders the dropdown label", () => {
    renderComponent();
    expect(screen.getByLabelText(mockLabel)).toBeInTheDocument();
  });

  it("renders the dropdown options", () => {
    renderComponent();
    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown.children.length).toBe(mockOptions.length);
    mockOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});
