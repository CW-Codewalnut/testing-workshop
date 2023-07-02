import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal, ModalProps } from "./Modal";

describe("Modal", () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  const renderComponent = (additionalProps?: Partial<ModalProps>) => {
    const defaultProps: ModalProps = {
      isOpen: true,
      onClose,
      onConfirm,
      children: <div>Modal Content</div>,
      headerText: "Modal Header",
      showActions: true,
    };

    render(<Modal {...defaultProps} {...additionalProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen.getByText("Modal Header")).toBeInTheDocument();
  });

  it("renders children content", () => {
    renderComponent();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("closes the modal when close button is clicked", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button", { name: /confirm/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("does not render action buttons when showActions is false", () => {
    renderComponent({ showActions: false });
    expect(
      screen.queryByRole("button", { name: /cancel/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /confirm/i }),
    ).not.toBeInTheDocument();
  });
});
