import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders modal with header and actions when isOpen is true", async () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    render(
      <Modal
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
        headerText="Modal Header"
        showActions={true}
      >
        Modal Content
      </Modal>
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    const confirmButton = screen.getByRole("button", { name: /confirm/i });

    expect(screen.getByText("Modal Header")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();

    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);

    await userEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(2);

    await userEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
