import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, FormProps } from "./Form";

describe("Form", () => {
  const mockOnSubmit = jest.fn();
  const renderComponent = (additionalProps?: Partial<FormProps>) => {
    const defaultProps = {
      fields: [
        {
          name: "Name",
          label: "Name",
          id: "Name",
          type: "text",
          value: "",
          placeholder: "Enter name",
        },
      ],
      onSubmit: mockOnSubmit,
    };

    render(<Form {...defaultProps} {...additionalProps} />);
  };

  it("renders the form field labels correctly", () => {
    renderComponent();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders the form field placeholders correctly", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });

  it("allows a user to input their details into the form", async () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Enter name");

    await userEvent.type(input, "John");
    expect(input).toHaveValue("John");
  });

  it("calls the onSubmit function when the submit button is clicked", async () => {
    renderComponent();

    await userEvent.click(screen.getByText("Submit"));
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
