import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionProps } from "./Accordion";

const renderComponent = (additionalProps?: Partial<AccordionProps>) =>{ 
  const defaultProps = {
    title: "My title",
    children: <h1>Accordion content</h1>
  }

  render(<Accordion  {...defaultProps} {...additionalProps}/>)
}

describe("Accordion", () => {
  it("renders the button correctly", () => {
    renderComponent();
    expect(screen.getByRole("button", {name: "My title"})).toBeInTheDocument();
  });

  it("renders the children correctly", async () => {
    renderComponent();
    userEvent.click(screen.getByRole("button", {name: "My title"}))
    expect(await screen.findByRole("heading", {name: "Accordion content"})).toBeInTheDocument();
  });  
  
  it("does not render the children unless the button in clicked", async () => {
    renderComponent();
    expect(screen.queryByRole("heading", {name: "Accordion content"})).not.toBeInTheDocument();
  });
});
