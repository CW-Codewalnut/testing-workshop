import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { Button, ButtonProps } from "./Button";

describe("Button", () => {
  const onClickMock = jest.fn();

  const renderComponent = (addtionalProps?: Partial<ButtonProps>) => {
    const defaultProps = {
      text: "Click me",
      onClick: onClickMock,
    };

    render(<Button {...defaultProps} {...addtionalProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen).not.toBeNull();
  });
});
