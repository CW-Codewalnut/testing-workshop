import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { IntegrationComponent } from "./IntegrationComponent";

jest.mock("axios");

const mockWeatherData = {
  temperature: "25°C",
  weather: "Sunny",
};

describe("IntegrationComponent", () => {
  it("opens the form modal", async () => {
    render(<IntegrationComponent />);

    const openButton = screen.getByRole("button", { name: "Open Form" });
    await userEvent.click(openButton);

    expect(screen.getByText("Form Modal")).toBeInTheDocument();
  });

  it("submits the form and check success message", async () => {
    render(<IntegrationComponent />);

    const openButton = screen.getByRole("button", { name: "Open Form" });
    await userEvent.click(openButton);

    const nameInput = screen.getByLabelText("Name");
    await userEvent.type(nameInput, "John Doe");

    const emailInput = screen.getByLabelText("Email");
    await userEvent.type(emailInput, "john.doe@example.com");

    const submitButton = screen.getByRole("button", { name: "Submit" });
    await userEvent.click(submitButton);

    expect(
      screen.getByText(
        "Hello John Doe, your email john.doe@example.com has been submitted!",
      ),
    ).toBeInTheDocument();
  });

  it("fetches and displays weather data", async () => {
    render(<IntegrationComponent />);

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockWeatherData,
    });

    expect(await screen.findByText("London Weather")).toBeInTheDocument();
    expect(await screen.findByText("Temperature: 25°C")).toBeInTheDocument();
    expect(await screen.findByText("Weather: Sunny")).toBeInTheDocument();
  });
});
