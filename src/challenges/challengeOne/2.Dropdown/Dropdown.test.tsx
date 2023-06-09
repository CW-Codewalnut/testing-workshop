import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown, DropdownProps } from "./Dropdown";

describe("Dropdown", () => {
  const renderComponent = (additionalProps?: any) => {
    const defaultProps: Partial<DropdownProps> = {
      options: ["Option 1", "Option 2", "Option 3"],
      label: "Dropdown Label",
      id: "dropdownId",
    };
    render(<Dropdown {...defaultProps} {...additionalProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen).not.toBeNull();
  });

  it("displays the correct label", () => {
    renderComponent({ label: "Dropdown Label" });
    expect(screen.getByText("Dropdown Label")).toBeInTheDocument();
  });

  it("displays the options correctly", () => {
    const options = ["Option A", "Option B", "Option C"];
    renderComponent({ options });
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("selects the default option", () => {
    const defaultOption = "Option 1";
    renderComponent({ options: ["Option 1", "Option 2", "Option 3"] });
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue(defaultOption);
  });

  it("updates the selected option", async () => {
    renderComponent();
    const selectElement = screen.getByRole("combobox");
    const newOption = "Option 3";
    const optionElement = screen.getByText(newOption);
    await userEvent.selectOptions(selectElement, optionElement);
    expect(selectElement).toHaveValue(newOption);
  });
});
