import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Form, FormProps, FormField } from "./Form";

describe("Form", () => {
  const fields: FormField[] = [
    {
      label: "Name",
      type: "text",
      name: "name",
      placeholder: "Enter your name",
      value: "",
      id: "name-input",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      value: "",
      id: "email-input",
    },
  ];

  const onSubmitMock = jest.fn();

  const renderComponent = (additionalProps?: Partial<FormProps>) => {
    const defaultProps: FormProps = {
      fields,
      onSubmit: onSubmitMock,
    };

    render(<Form {...defaultProps} {...additionalProps} />);
  };
  it("renders without error", () => {
    renderComponent();
    expect(screen).not.toBeNull(); 
  });
  it("renders the form with input fields and submit button", () => {
    renderComponent();

    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();

    fields.forEach((field) => {
      const inputElement = screen.getByLabelText(field.label);
      expect(inputElement).toBeInTheDocument();
    });

    const submitButtonElement = screen.getByRole("button", { name: "Submit" });
    expect(submitButtonElement).toBeInTheDocument();
  });

  it("updates form values on input change", () => {
    renderComponent();

    const nameInput: any = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "testing user" } });
    expect(nameInput.value).toBe("testing user");
    const submitButtonElement = screen.getByRole("button", { name: "Submit" });
    expect(submitButtonElement).toBeInTheDocument();
    
  });

//   it("submits form values on form submission", () => {
//     renderComponent();

//     const nameInput = screen.getByLabelText("Name");
//     fireEvent.change(nameInput, { target: { value: "John Doe" } });

//     const emailInput = screen.getByLabelText("Email");
//     fireEvent.change(emailInput, { target: { value: "john@example.com" } });

//     const formElement = screen.getByRole("form");
//     fireEvent.submit(formElement);

//     expect(onSubmitMock).toHaveBeenCalledWith({
//       name: "John Doe",
//       email: "john@example.com",
//     });
//   });
});
