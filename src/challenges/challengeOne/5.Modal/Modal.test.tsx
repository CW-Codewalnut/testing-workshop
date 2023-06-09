import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal, ModalProps } from "./Modal";

describe("Modal", () => {
  const onCloseMock = jest.fn();
  const onConfirmMock = jest.fn();

  const renderComponent = (additionalProps?: Partial<ModalProps>) => {
    const defaultProps: ModalProps = {
      isOpen: true,
      onClose: onCloseMock,
      onConfirm: onConfirmMock,
      headerText: "Test Modal",
      children: <div>Modal Content</div>,
      showActions: true,
    };
    render(<Modal {...defaultProps} {...additionalProps} />);
  };

  it("renders the modal with header and content", () => {
    renderComponent();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });
});
