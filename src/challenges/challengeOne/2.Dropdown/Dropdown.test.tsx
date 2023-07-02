import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown, DropdownProps } from "./Dropdown";

const renderComponent = (additionalProps?: Partial<DropdownProps>) => {
  const defaultProps = {
    options: ["Option 1", "Option 2", "Option 3"],
    label: "Label",
    id: "id",
  };

  render(<Dropdown {...defaultProps} {...additionalProps} />);
};

describe("Dropdown", () => {
  it("renders the label correctly", () => {
    renderComponent();
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("selects the first option in the list by default", () => {
    renderComponent();
    expect(screen.getByRole("menu")).toHaveValue("Option 1");
  });

  it("selects the options correctly", () => {
    renderComponent();
    userEvent.click(screen.getByRole("menuitem", { name: "Option 2" }));
    expect(screen.getByRole("menu")).toHaveValue("Option 2");
  });
});
