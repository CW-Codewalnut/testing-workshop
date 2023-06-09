import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "./Dropdown";

describe("Dropdown", () => {
  const renderComponent = () => {
    const defaultProps = {
      options: ["Option 1", "Option 2", "Option 3"],
      label: "DropDown",
      id: "id",
    };

    render(<Dropdown {...defaultProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen.getByLabelText("DropDown")).toBeInTheDocument();
  });

  it("displays options when clicked", async () => {
    renderComponent();

    await userEvent.click(screen.getByRole("combobox", { name: "DropDown" }));

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("selects an option when clicked", async () => {
    renderComponent();

    const dropdownButton = screen.getByRole("combobox", { name: "DropDown" });

    await userEvent.click(screen.getByRole("combobox", { name: "DropDown" }));

    await userEvent.click(screen.getByText("Option 2"));

    expect(dropdownButton).toHaveTextContent("Option 2");
  });
});
