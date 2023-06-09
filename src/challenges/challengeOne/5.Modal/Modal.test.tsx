import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal, ModalProps } from "./Modal";

describe("Modal", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  const renderComponent = (additionalProps?: Partial<ModalProps>) => {
    const defaultProps = {
      isOpen: true,
      onClose: mockOnClose,
      headerText: "Modal header",
      onConfirm: mockOnConfirm,
      showActions: true,
    };

    render(
      <Modal {...defaultProps} {...additionalProps}>
        Modal Content
      </Modal>,
    );
  };
  it("renders the modal header text", () => {
    renderComponent();
    expect(screen.getByText("Modal header")).toBeInTheDocument();
  });

  it("renders the header close button", () => {
    renderComponent();
    expect(screen.getByTestId("close")).toBeInTheDocument();
  });

  it("calls the onClose function when the close button is clicked", async () => {
    renderComponent();

    await userEvent.click(screen.getByTestId("close"));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("renders the modal content", () => {
    renderComponent();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("renders the action buttons", () => {
    renderComponent();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("calls the onClose function when the cancel button is clicked", async () => {
    renderComponent();

    await userEvent.click(screen.getByText("Cancel"));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls the onClose and onConfirm function when the confirm button is clicked", async () => {
    renderComponent();

    await userEvent.click(screen.getByText("Confirm"));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
