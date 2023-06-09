import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, FormProps } from "./Form";

const testFields: FormProps["fields"] = [
  {
    label: "Name",
    type: "text",
    name: "name",
    placeholder: "Name",
    value: "",
    id: "name",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Email",
    value: "",
    id: "email",
  },
];

const onSubmitMock = jest.fn();

describe("Form", () => {
  const renderComponent = (
    fields: FormProps["fields"],
    onSubmit: FormProps["onSubmit"],
  ) => {
    render(<Form fields={fields} onSubmit={onSubmit} />);
  };

  it("renders without error", () => {
    renderComponent(testFields, () => {});

    const nameLabel = screen.getByLabelText("Name");
    const emailLabel = screen.getByLabelText("Email");

    expect(nameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
  });

  it("calls onSubmit with correct values when submitted", async () => {
    renderComponent(testFields, onSubmitMock);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john.doe@example.com");
    await userEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john.doe@example.com",
    });
  });
});
