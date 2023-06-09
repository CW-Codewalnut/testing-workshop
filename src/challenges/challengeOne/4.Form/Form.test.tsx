import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, FormProps } from "./Form";

const FormFields = [
  {
    label: "Name",
    type: "text",
    name: "name",
    placeholder: "Enter your name",
    value: "",
    id: "nameId",
  },
  {
    label: "Email",
    type: "text",
    name: "email",
    placeholder: "Enter your Email",
    value: "",
    id: "emailId",
  },
];
describe("Form", () => {
  const renderComponent = (additionalProps?: Partial<FormProps>) => {
    const defaultProps: FormProps = {
      fields: FormFields,
      onSubmit: jest.fn(),
    };
    render(<Form {...defaultProps} {...additionalProps} />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen).not.toBeNull();
  });

  it("renders form Label correctly", () => {
    renderComponent();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("updates name field values on input change", async () => {
    renderComponent();
    const inputElement = screen.getByLabelText("Name");
    await userEvent.type(inputElement, "John Doe");
    expect(inputElement).toHaveValue("John Doe");
  });

  it("updates email field values on input change", async () => {
    renderComponent();
    const inputElement = screen.getByLabelText("Name");
    await userEvent.type(inputElement, "John Doe");
    expect(inputElement).toHaveValue("John Doe");
  });
});
