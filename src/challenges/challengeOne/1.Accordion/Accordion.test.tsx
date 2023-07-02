import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionProps } from "./Accordion";

describe("Accordion", () => {
  const renderComponent = (additionalProps?: any) => {
    const defaultProps: Partial<AccordionProps> = {
      children: "Accordion Content",
      title: "Accordion Title",
    };
    render(<Accordion {...defaultProps} {...additionalProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen).not.toBeNull();
  });

  it("displays the correct title", () => {
    const title = "Test Title";
    renderComponent({ title });
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("renders the provided children content when expanded", async () => {
    renderComponent({ children: "Test Content" });
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
