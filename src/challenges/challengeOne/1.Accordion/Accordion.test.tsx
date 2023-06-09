import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "./Accordion";

describe("Accordion", () => {
  // const onClickMock = jest.fn();
  const testHeaderText = "Accordion title";
  const testChildren = <p>Accordion content</p>;

  const renderComponent = () => {
    const defaultProps = {
      title: testHeaderText,
    };

    render(<Accordion {...defaultProps}>{testChildren}</Accordion>);
  };
  it("renders without error", () => {
    renderComponent();
    expect(screen).not.toBeNull();
  });

  it("triggers Click event when clicked", async () => {
    renderComponent();
    await userEvent.click(
      screen.getByRole("button", { name: "Accordion title" }),
    );
    expect(screen.getByText("Accordion content")).toBeInTheDocument();
  });
});
