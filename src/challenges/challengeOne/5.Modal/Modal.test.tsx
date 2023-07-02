import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal, ModalProps } from "./Modal";

const handleCloseMock = jest.fn();
const handleConfirmMock = jest.fn();

const renderComponent = (additionalProps?: Partial<ModalProps>) => {
    const defaultProps = {
        isOpen: true,
        onClose: handleCloseMock,
        headerText: "Form Modal",
        onConfirm: handleConfirmMock,
        showActions: false,
        children: <h1>Hello world</h1>
    };

    render(<Modal {...defaultProps} {...additionalProps} />);
};

describe("Modal", () => {
    it("opens the modal correctly", () => {
        renderComponent();
        expect(screen.getByRole("heading", {name: "Form Modal"})).toBeInTheDocument();
    });

    it("hides the modal correctly", () => {
        renderComponent({isOpen: false});
        expect(screen.queryByRole("heading", {name: "Form Modal"})).not.toBeInTheDocument();
    });

    it("calls the on close function correctly", () => {
        renderComponent();
        userEvent.click(screen.getByRole("button"));
        expect(handleCloseMock).toHaveBeenCalled()
    });

    it("renders the cancel button correctly", () => {
        renderComponent({showActions: true});
        userEvent.click(screen.getByRole("button", {name: "Cancel"}));
        expect(handleCloseMock).toHaveBeenCalled()
    });

    it("renders the confirm button correctly", () => {
        renderComponent({showActions: true});
        userEvent.click(screen.getByRole("button", {name: "Confirm"}));
        expect(handleConfirmMock).toHaveBeenCalled()
    });    
});

