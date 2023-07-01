import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal, ModalProps } from "./Modal";

const testHeaderText = "Modal Header";
const testChildren = <p>Modal content</p>;

describe("Modal", () => {
  const renderComponent = (props: ModalProps) => {
    render(<Modal {...props} />);
  };

  it("renders closed modal", () => {
    renderComponent({
      isOpen: false,
      onClose: jest.fn(),
      onConfirm: jest.fn(),
      headerText: testHeaderText,
      children: testChildren,
    });

    const modalContainer = screen.queryByTestId("modal-container");
    expect(modalContainer).not.toBeInTheDocument();
  });

  it("renders open modal with header and content", () => {
    renderComponent({
      isOpen: true,
      onClose: jest.fn(),
      onConfirm: jest.fn(),
      headerText: testHeaderText,
      children: testChildren,
    });

    expect(screen.getByText(testHeaderText)).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onCloseMock = jest.fn();

    renderComponent({
      isOpen: true,
      onClose: onCloseMock,
      onConfirm: jest.fn(),
      headerText: testHeaderText,
      children: testChildren,
    });

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const onConfirmMock = jest.fn();

    renderComponent({
      isOpen: true,
      onClose: jest.fn(),
      onConfirm: onConfirmMock,
      headerText: testHeaderText,
      children: testChildren,
    });

    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));

    expect(onConfirmMock).toHaveBeenCalled();
  });
});
