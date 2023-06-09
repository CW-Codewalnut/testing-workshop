import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { IntegrationComponent } from "./IntegrationComponent";

jest.mock("axios");

describe("IntegrationComponent", () => {
  const mockWeatherData = {
    temperature: "25",
    weather: "Sunny",
  };

  const renderComponent = () => render(<IntegrationComponent />);

  it("displays a loading message when the API call is in progress", () => {
    renderComponent();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays the weather data after succesfully receiving the data from the API", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockWeatherData,
    });

    renderComponent();

    expect(await screen.findByText(`Temperature: 25`)).toBeInTheDocument();
    expect(await screen.findByText(`Weather: Sunny`)).toBeInTheDocument();
  });
});
