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

  it("displays the weather data after successful API call", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockWeatherData,
    });

    render(<IntegrationComponent />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(await screen.findByText(`Temperature: 25`)).toBeInTheDocument();
    expect(screen.getByText(`Weather: Sunny`)).toBeInTheDocument();
  });
});
