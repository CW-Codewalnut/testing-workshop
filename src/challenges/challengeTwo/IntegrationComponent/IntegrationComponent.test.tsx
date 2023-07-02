import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntegrationComponent } from "./IntegrationComponent";

describe("IntegrationComponent", () => {
  it("opens the form modal and submits the form", () => {
    render(<IntegrationComponent />);
    userEvent.click(screen.getByText("Open Form"));
    expect(screen.getByText("Form Modal")).toBeInTheDocument();
    userEvent.type(screen.getByLabelText("Name"), "John Doe");
    userEvent.type(screen.getByLabelText("Email"), "john@example.com");
    userEvent.click(screen.getByText("Confirm"));
    expect(screen.queryByText("Form Modal")).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "Hello John Doe, your email john@example.com has been submitted!",
      ),
    ).toBeInTheDocument();
  });
});
