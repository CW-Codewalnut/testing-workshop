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
  ];

  const handleSubmit = jest.fn();

  const renderComponent = (additionalProps?: Partial<FormProps>) => {
    const defaultProps: FormProps = {
      fields,
      onSubmit: handleSubmit,
    };
    render(<Form {...defaultProps} {...additionalProps} />);
  };

  it("renders the form fields correctly", () => {
    renderComponent();

    fields.forEach((field) => {
      const label = screen.getByText(field.label);
      const input = screen.getByLabelText(field.label);

      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", field.type);
      expect(input).toHaveAttribute("name", field.name);
      expect(input).toHaveAttribute("placeholder", field.placeholder);
      expect(input).toHaveValue(field.value);
    });
  });

  it("updates the form values correctly", () => {
    renderComponent();

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    expect(nameInput).toHaveValue("John");
    expect(emailInput).toHaveValue("john@example.com");
  });

  it("calls the onSubmit function with the form values", () => {
    renderComponent();

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      name: "John",
      email: "john@example.com",
    });
  });
});
