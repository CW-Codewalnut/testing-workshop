import React from "react";
import { render, screen } from "@testing-library/react";
import { Accordion, AccordionProps } from "./Accordion";

describe("Accordion", () => {
  //   const onClick = jest.fn();
  const renderComponent = (additionalProps?: Partial<AccordionProps>) => {
    const defaultProps: Partial<AccordionProps> = {
      title: "accodations",
      children: <h2>accodation-content</h2>,
    };
    render(<Accordion {...defaultProps} {...additionalProps} />);
  };

  it("renders the button text", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: "accodations" }),
    ).toBeInTheDocument();
  });
});
