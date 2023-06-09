import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown, DropdownProps } from "./Dropdown";

describe("Dropdown", () => {
  const renderComponent = (additionalProps?: Partial<DropdownProps>) => {
    const defaultProps: DropdownProps = {
      options: ["Option 1", "Option 2", "Option 3"],
      label: "Dropdown Label",
      id: "test-id",
    };
    render(<Dropdown {...defaultProps} {...additionalProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders the dropdown label", () => {
    renderComponent();
    expect(screen.getByText(/Dropdown Label/i)).toBeInTheDocument();
  });

  it("has the correct initial selected option", () => {
    renderComponent();
    expect(screen.getByRole("combobox")).toHaveValue("Option 1");
  });

  it("changes the selected option when a different option is clicked", async () => {
    renderComponent();
    await userEvent.selectOptions(screen.getByRole("combobox"), ["Option 2"]);
    expect(screen.getByRole("combobox")).toHaveValue("Option 2");
  });

  it("retains the selected option when the same option is clicked", async () => {
    renderComponent();
    userEvent.selectOptions(screen.getByRole("combobox"), ["Option 1"]);
    expect(screen.getByRole("combobox")).toHaveValue("Option 1");
  });

  it("renders all the options", () => {
    renderComponent();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });
});
