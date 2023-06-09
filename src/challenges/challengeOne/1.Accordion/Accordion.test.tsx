import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionProps } from "./Accordion";

describe("Accordion", () => {
  const renderComponent = (additionalProps?: Partial<AccordionProps>) => {
    const defaultProps = {
      title: "Accordion Title",
      children: "Accordion Content",
    };

    render(<Accordion {...defaultProps} {...additionalProps} />);
  };
  it("renders the title", () => {
    renderComponent();
    expect(screen.getByText("Accordion Title")).toBeInTheDocument();
  });

  it("render the Accordion content when clicked", async () => {
    renderComponent();
    await userEvent.click(screen.getByText("Accordion Title"));
    expect(screen.getByText("Accordion Content")).toBeInTheDocument();
  });
});
