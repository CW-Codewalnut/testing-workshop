import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { IntegrationComponent } from "./IntegrationComponent";

// Mocked data for integration testing
jest.mock("axios");
const mockWeatherData = {
  temperature: "18",
  weather: "cool",
};
describe("IntegrationComponent", () => {
  const renderComponent = (additionalProps?: any) => {
    render(<IntegrationComponent {...additionalProps} />);
  };

  it("render weather data", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockWeatherData,
    });
    renderComponent();
    expect(await screen.findByText(/London Weather/i)).toBeInTheDocument();
    expect(await screen.findByText(/18/i)).toBeInTheDocument();
    expect(await screen.findByText(/cool/i)).toBeInTheDocument();
  });

  it("opens the form modal on button click", async () => {
    renderComponent();
    const openFormButton = screen.getByRole("button");
    await userEvent.click(openFormButton);
    expect(screen.getByText("Form Modal")).toBeInTheDocument();
  });

  it("closes the modal when clicking on the cross icon", () => {
    render(<IntegrationComponent />);
    const openFormButton = screen.getByText("Open Form");
    userEvent.click(openFormButton);

    const crossIcon = screen.getByTestId("modal-close-icon");
    userEvent.click(crossIcon);

    expect(screen.queryByText("Form Modal")).not.toBeInTheDocument();
  });

  //   it("submits the form and displays toast message", async () => {
  //     render(<IntegrationComponent />);
  //     const openFormButton = screen.getByText("Open Form");
  //     userEvent.click(openFormButton);

  //     const nameInput = screen.getByLabelText("Name");
  //     const emailInput = screen.getByLabelText("Email");
  //     const submitButton = screen.getByRole("button", { name: "Submit" });

  //     userEvent.type(nameInput, "John Doe");
  //     userEvent.type(emailInput, "john.doe@example.com");
  //     userEvent.click(submitButton);

  //     await waitFor(() => {
  //       expect(
  //         screen.getByText(
  //           "Hello John Doe, your email john.doe@example.com has been submitted!",
  //         ),
  //       ).toBeInTheDocument();
  //     });
  //   });

  //   it("displays the weather data correctly", async () => {
  //     render(<IntegrationComponent />);
  //     await waitFor(() => {
  //       expect(screen.getByText(/Temperature: 18/i)).toBeInTheDocument();
  //       expect(screen.getByText(/Weather: Cold/i)).toBeInTheDocument();
  //     });
  //   });

  //   it("renders the WeatherShowcase component", () => {
  //     render(<IntegrationComponent />);
  //     expect(screen.getByTestId("weather-showcase")).toBeInTheDocument();
  //   });
});
