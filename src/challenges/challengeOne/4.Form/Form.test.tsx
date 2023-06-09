import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./Form";

describe("Form", () => {
  const fields = [
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

  it("renders label for each form field", () => {
    const fields: FormProps["fields"] = [
      {
        label: "Field 1",
        type: "text",
        name: "field1",
        placeholder: "Enter Field 1",
        value: "",
        id: "field1",
      },
      {
        label: "Field 2",
        type: "text",
        name: "field2",
        placeholder: "Enter Field 2",
        value: "",
        id: "field2",
      },
    ];

    render(<Form fields={fields} onSubmit={() => {}} />);

    fields.forEach((field) => {
      const labelElement = screen.getByLabelText(field.label);
      expect(labelElement).toBeInTheDocument();
    });
  });

  it("submits form with entered values", async () => {
    const onSubmit = jest.fn();

    render(<Form fields={fields} onSubmit={onSubmit} />);

    const nameInput = screen.getByPlaceholderText("Enter your name");
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "johndoe@example.com");

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("johndoe@example.com");

    await userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      name: "John Doe",
      email: "johndoe@example.com",
    });
  });
});
