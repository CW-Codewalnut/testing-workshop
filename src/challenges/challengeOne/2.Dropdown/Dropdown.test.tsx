import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "./Dropdown";

describe("Dropdown", () => {
  it("renders label correctly", () => {
    const label = "Dropdown Label";
    const id = "dropdown-select";
    const options = ["Option 1", "Option 2", "Option 3"];

    render(<Dropdown options={options} label={label} id={id} />);

    const labelElement = screen.getByLabelText(label);

    expect(labelElement).toBeInTheDocument();
  });

  it("updates selected option when changed", async () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const label = "Select an option";
    const id = "dropdown";

    render(<Dropdown options={options} label={label} id={id} />);

    const dropdownElement = screen.getByLabelText(label);
    expect(dropdownElement).toHaveValue("Option 1");

    await userEvent.selectOptions(dropdownElement, ["Option 2"]);
    expect(dropdownElement).toHaveValue("Option 2");

    await userEvent.selectOptions(dropdownElement, ["Option 3"]);
    expect(dropdownElement).toHaveValue("Option 3");
  });
});