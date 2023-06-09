import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionProps } from "./Accordion";

describe("Accordion", () => {
  const renderComponent = (additionalProps?: Partial<AccordionProps>) => {
    const defaultProps: AccordionProps = {
      title: "Accordion",
      children: <div>Accordion Content</div>,
    };
    render(<Accordion {...defaultProps} {...additionalProps} />);
  };

  it("renders the accordion to be there or not", () => {
    renderComponent();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Accordion");
    expect(screen.queryByText("Accordion Content")).not.toBeInTheDocument();
  });

  it("opens the accordion when the button is clicked", async () => {
    renderComponent();
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText("Accordion Content")).toBeInTheDocument();
  });
  
  it("closes the accordion when the button is clicked again", async () => {
    renderComponent();
    userEvent.click(screen.getByRole("button"));
    userEvent.click(screen.getByRole("button"));
    expect(screen.queryByText("Accordion Content")).not.toBeInTheDocument();
  });
  
});

// import React from "react";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { Button, ButtonProps } from "./Button";

// describe("Button", () => {
//   const onClickMock = jest.fn();

//   const renderComponent = (addtionalProps?: Partial<ButtonProps>) => {
//     const defaultProps = {
//       text: "Click me",
//       onClick: onClickMock,
//     };

//     render(<Button {...defaultProps} {...addtionalProps} />);
//   };

//   it("renders without error", () => {
//     renderComponent();
//     expect(screen).not.toBeNull();
//   });
// });
