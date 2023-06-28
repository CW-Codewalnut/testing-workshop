import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal, ModalProps } from "./Modal";

describe("Modal", () => {
  const defaultProps: ModalProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    headerText: "Modal Header",
    children: "Modal Content",
  };

  const renderComponent = (additionalProps?: Partial<ModalProps>) => {
    const props: ModalProps = { ...defaultProps, ...additionalProps };
    render(<Modal {...props} />);
  };

  it("renders the modal header and content correctly", () => {
    renderComponent();

    const header = screen.getByText("Modal Header");
    const content = screen.getByText("Modal Content");

    expect(header).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it("calls the onConfirm function when the confirm button is clicked", async () => {
    const onConfirm = jest.fn();
    renderComponent({ onConfirm });

    const confirmButton = await screen.findByText("Confirm");
    await userEvent.click(confirmButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("does not render actions when showActions prop is false", () => {
    renderComponent({ showActions: false });

    const cancelButton = screen.queryByText("Cancel");
    const confirmButton = screen.queryByText("Confirm");

    expect(cancelButton).toBeNull();
    expect(confirmButton).toBeNull();
  });

  it("does not render the modal when isOpen is false", () => {
    renderComponent({ isOpen: false });

    const modal = screen.queryByTestId("modal-backdrop");

    expect(modal).toBeNull();
  });
});
