import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionProps } from "./Accordion";

describe("Accordion", () => {
  const renderComponent = (additionalProps?: AccordionProps) => {
    const defaultProps: AccordionProps = {
      title: "Accordion Title",
      children: <div>Accordion Content</div>,
    };
    render(<Accordion {...defaultProps} {...additionalProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen).not.toBeNull();
  });

  it("is initially accordion collapsed", () => {
    renderComponent();
    expect(screen.queryByText(/Accordion Content/i)).not.toBeInTheDocument();
  });

  it("renders the accordion title", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: /Accordion Title/i }),
    ).toBeInTheDocument();
  });

  it("expands the accordion content when the title is clicked", async () => {
    renderComponent();
    await userEvent.click(
      screen.getByRole("button", { name: /Accordion Title/i }),
    );
    expect(screen.getByText(/Accordion Content/i)).toBeInTheDocument();
  });

  it("collapses the accordion content when the title is clicked again", async () => {
    renderComponent();
    await userEvent.click(
      screen.getByRole("button", { name: /Accordion Title/i }),
    );
    await userEvent.click(
      screen.getByRole("button", { name: /Accordion Title/i }),
    );
    expect(screen.queryByText(/Accordion Content/i)).not.toBeInTheDocument();
  });
});
