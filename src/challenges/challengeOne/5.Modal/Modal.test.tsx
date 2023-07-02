import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal, ModalProps } from "./Modal";

describe("Modal", () => {
  const renderComponent = (additionalProps?: Partial<ModalProps>) => {
    const defaultProps: ModalProps = {
      isOpen: true,
      onClose: jest.fn(),
      onConfirm: jest.fn(),
      children: "Modal Content",
      headerText: "Modal Header",
      showActions: true,
    };
    render(<Modal {...defaultProps} {...additionalProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen).not.toBeNull();
  });

  it("renders the modal with correct header text", () => {
    renderComponent();
    const headerText = screen.getByText("Modal Header");
    expect(headerText).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const onClose = jest.fn();
    renderComponent({ onClose });
    const closeButton = screen.getByText("Cancel");
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onConfirm when the confirm button is clicked", async () => {
    const onConfirm = jest.fn();
    renderComponent({ onConfirm });
    const confirmButton = screen.getByText("Confirm");
    await userEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalled();
  });

  it("does not render actions when showActions prop is false", () => {
    renderComponent({ showActions: false });
    const cancelButton = screen.queryByRole("button", { name: /cancel/i });
    const confirmButton = screen.queryByRole("button", { name: /confirm/i });
    expect(cancelButton).not.toBeInTheDocument();
    expect(confirmButton).not.toBeInTheDocument();
  });
});
