import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, FormProps, FormField } from "./Form";

describe("Form", () => {
  const onSubmit = jest.fn();

  const renderComponent = (additionalProps?: Partial<FormProps>) => {
    const fields: FormField[] = [
      {
        label: "Label 1",
        type: "text",
        name: "field1",
        placeholder: "Placeholder 1",
        value: "",
        id: "field1-id",
      },
      {
        label: "Label 2",
        type: "text",
        name: "field2",
        placeholder: "Placeholder 2",
        value: "",
        id: "field2-id",
      },
    ];

    const defaultProps: FormProps = {
      fields,
      onSubmit,
    };

    return render(<Form {...defaultProps} {...additionalProps} />);
  };

  it("renders the correct number of fields", () => {
    renderComponent();
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
  });

  it("updates the field value when typed into", async () => {
    renderComponent();
    await userEvent.type(
      screen.getByRole("textbox", { name: /Label 1/i }),
      "test",
    );
    expect(screen.getByRole("textbox", { name: /Label 1/i })).toHaveValue(
      "test",
    );
  });

  it("calls onSubmit with the correct values when form is submitted", async () => {
    renderComponent();
    await userEvent.type(
      screen.getByRole("textbox", { name: /Label 1/i }),
      "test1",
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /Label 2/i }),
      "test2",
    );

    await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(onSubmit).toHaveBeenCalledWith({ field1: "test1", field2: "test2" });
  });
});
