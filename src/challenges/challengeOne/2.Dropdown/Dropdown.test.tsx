import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DropdownProps, Dropdown } from "./Dropdown";

describe("Dropdown", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const label = "Select an option";
    

  const renderComponent = (addtionalProps?: Partial<DropdownProps>) => {
    const defaultProps : DropdownProps = {
        options: ["one","two","three"],
        label: "label text",
        id: "id text",
    };

    render(<Dropdown {...defaultProps} {...addtionalProps} />)
};
    it("renders without error", () => {
        renderComponent();
        expect(screen).not.toBeNull(); 
      });

      it('renders the label with the provided text', () => {
        const labelText = 'labelText';
        const optionsValue=["one","two","threee"];
        render(<Dropdown label={labelText} id="idText" options={optionsValue} />);
        const labelElement = screen.getByText(labelText);
        expect(labelElement).toBeInTheDocument();
        
      });
      it("selects the specified option", () => {
        const selectedOption = "Option 1";
        // renderComponent({ options, selectedOption });
        render(<Dropdown label={label} id="idText" options={options} />);
        const dropdownElement = screen.getByLabelText(label) as HTMLSelectElement;
        expect(dropdownElement.value).toBe(selectedOption);
      });
    });
  