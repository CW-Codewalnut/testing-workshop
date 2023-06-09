import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AccordionProps, Accordion } from "./Accordion";

describe("Accordion", () => {
  

  const renderComponent = (addtionalProps?: Partial<AccordionProps>) => {
    const defaultProps : AccordionProps = {
    title: "Click me",
      children:  "testing",
    };

    render(<Accordion {...defaultProps} {...addtionalProps} />)
};
    it("renders without error", () => {
        renderComponent();
        expect(screen).not.toBeNull(); 
      });

      it('renders the button with the provided text', () => {
        const buttonText = 'Click me';
        
        render(<Accordion title={buttonText}><span>testing1234</span> </Accordion>);
        const buttonElement = screen.getByText(buttonText);
        expect(buttonElement).toBeInTheDocument();
        fireEvent.click(buttonElement);
        const spanElement = screen.getByText("testing1234");
        expect(spanElement).toBeInTheDocument();
        
      });
    });
  