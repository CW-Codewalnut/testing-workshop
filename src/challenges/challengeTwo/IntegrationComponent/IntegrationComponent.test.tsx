import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { IntegrationComponent } from "./IntegrationComponent";

jest.mock("axios");

describe("IntegrationComponent", () => {
  it("performs user journey successfully", async () => {
    // Mock the successful API response
    const mockApiResponse = {
      current: {
        temp_c: "19",
        cloud: "Partly cloudy",
      },
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
        data: mockApiResponse,
      });

    render(<IntegrationComponent />);

    // Click on "Open Form"
    const openFormButton = screen.getByText("Open Form");
    await userEvent.click(openFormButton);

    // Fill in name and email fields
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");

    // Click the submit button
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await userEvent.click(submitButton);

    // Verify the toaster is open with the expected message
    await waitFor(() => {
      const toasterMessage = screen.getByText(
        "Hello John Doe, your email john@example.com has been submitted!"
      );
      expect(toasterMessage).toBeInTheDocument();
    });

    // Check that the form is closed
    const form = screen.queryByRole("form");
    expect(form).toBeNull();

    // Verify "Temperature" and "Weather" values are displayed
    const temperature = await screen.findByText("Temperature: 19");
    const weather = await screen.findByText("Weather: Partly cloudy");
    expect(temperature).toBeInTheDocument();
    expect(weather).toBeInTheDocument();
  });
});
