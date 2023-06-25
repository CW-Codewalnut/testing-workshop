import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, FormProps } from "./Form";

const handleFormSubmitMock = jest.fn();

const renderComponent = (additionalProps?: Partial<FormProps>) => {
    const defaultProps = {
        fields:  [
            {
              label: "Name",
              type: "text",
              name: "name",
              placeholder: "Enter your name",
              value: "",
              id: "name",
            },
            {
              label: "Email",
              type: "email",
              name: "email",
              placeholder: "Enter your email",
              value: "",
              id: "email",
            },
          ],
        onSubmit: handleFormSubmitMock
    };

    render(<Form {...defaultProps} {...additionalProps} />);
};

describe("Form", () => {
    it("renders the input label correctly", () => {
        renderComponent();
        expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("renders the placeholder correctly", () => {
        renderComponent();
        expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    });

    it("updates the input box correctly", async () => {
        renderComponent();
        userEvent.type(screen.getByRole("textbox", {name: "Name"}), "Renu")
        expect(await screen.findByRole("textbox", {name: "Name"})).toHaveValue("Renu");
    });

    it("renders the submit button correctly", () => {
        renderComponent();
        expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument();
    });

    it("calls the on submit function when the button is clicked", () => {
        renderComponent();
        userEvent.type(screen.getByRole("textbox", {name: "Name"}), "Renu")
        userEvent.type(screen.getByRole("textbox", {name: "Name"}), "renu@gmail.com")
        userEvent.click(screen.getByRole("button", {name: "Submit"}));
        expect(handleFormSubmitMock).toHaveBeenCalledWith({name: "renu@gmail.com"})
    });
});

