import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntegrationComponent } from "./IntegrationComponent";

describe("IntegrationComponent", () => {
  const renderComponent = () => {
    render(<IntegrationComponent />);
  };

  it("renders without error", () => {
    renderComponent();
    expect(screen).not.toBeNull();
  });

  it("renders 'Open Form' button initially", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: /Open Form/i }),
    ).toBeInTheDocument();
  });

  it("opens the modal form when 'Open Form' button is clicked", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button", { name: /Open Form/i }));
    expect(screen.getByText("Form Modal")).toBeInTheDocument();
  });

  it("opens the modal form when 'Open Form' button is clicked", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button", { name: /Open Form/i }));
    expect(screen.getByText("Form Modal")).toBeInTheDocument();
  });

  it("fills out the form correctly", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button", { name: /Open Form/i }));

    await userEvent.type(
      screen.getByPlaceholderText("Enter your name"),
      "John Doe",
    );
    expect(screen.getByPlaceholderText("Enter your name")).toHaveValue(
      "John Doe",
    );

    await userEvent.type(
      screen.getByPlaceholderText("Enter your email"),
      "john.doe@example.com",
    );
    expect(screen.getByPlaceholderText("Enter your email")).toHaveValue(
      "john.doe@example.com",
    );
  });

  it("closes the modal form after form submission", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button", { name: /Open Form/i }));

    await userEvent.type(
      screen.getByPlaceholderText("Enter your name"),
      "John Doe",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Enter your email"),
      "john.doe@example.com",
    );
    await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() =>
      expect(screen.queryByText("Form Modal")).not.toBeInTheDocument(),
    );
  });

  it("shows a toast after form submission", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button", { name: /Open Form/i }));

    await userEvent.type(
      screen.getByPlaceholderText("Enter your name"),
      "John Doe",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Enter your email"),
      "john.doe@example.com",
    );
    await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await screen.findByText(
      "Hello John Doe, your email john.doe@example.com has been submitted!",
    );
  });
});
