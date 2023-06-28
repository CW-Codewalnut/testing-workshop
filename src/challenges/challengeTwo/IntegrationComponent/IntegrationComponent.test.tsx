import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntegrationComponent } from "./IntegrationComponent";

describe("IntegrationComponent", () => {
  it("opens the form modal on button click", () => {
    render(<IntegrationComponent />);
    const openFormButton = screen.getByRole("button", { name: "Open Form" });
    userEvent.click(openFormButton);
    const modalHeader = screen.getByText("Form Modal");
    expect(modalHeader).toBeInTheDocument();
  });

  it("submits the form data and shows the toast message", () => {
    render(<IntegrationComponent />);
    const openFormButton = screen.getByRole("button", { name: "Open Form" });
    userEvent.click(openFormButton);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    userEvent.type(nameInput, "John Doe");
    userEvent.type(emailInput, "johndoe@example.com");
    userEvent.click(submitButton);

    const toastMessage = screen.getByText(
      "Hello John Doe, your email johndoe@example.com has been submitted!",
    );
    expect(toastMessage).toBeInTheDocument();
  });
});
