import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "./Accordion";

describe("Accordion", () => {
  it("renders accordion title", () => {
    render(
      <Accordion title="Accordion Title">Accordion Content</Accordion>
    );
    const titleElement = screen.getByText("Accordion Title");
    expect(titleElement).toBeInTheDocument();
  });

  it("toggles accordion content when button is clicked", async () => {
    render(
      <Accordion title="Accordion Title">Accordion Content</Accordion>
    );
    const buttonElement = screen.getByRole("button", { name: "Accordion Title" });
    expect(screen.queryByText("Accordion Content")).toBeNull();
  
    await userEvent.click(buttonElement);
    expect(screen.getByText("Accordion Content")).toBeInTheDocument();
  
    await userEvent.click(buttonElement);
    expect(screen.queryByText("Accordion Content")).toBeNull();
  });
});

