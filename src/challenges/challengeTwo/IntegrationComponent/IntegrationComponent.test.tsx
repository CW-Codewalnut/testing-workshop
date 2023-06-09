import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import { IntegrationComponent } from "./IntegrationComponent";
jest.mock("axios");
describe("IntegrationComponent", () => {
    
    
    // it("renders the component without errors", () => {
    //   render(<IntegrationComponent />);
    //   // Assertion to check if the component renders without throwing any errors
    //   expect(screen).toBeDefined();
    // });
  
    // it("opens the form modal when the button is clicked", () => {
    //   render(<IntegrationComponent />);
    //   // Find the button and click it
    //   const openButton = screen.getByText("Open Form");
    //   fireEvent.click(openButton);
    //   // Assertion to check if the form modal is visible
    //   expect(screen.getByText("Form Modal")).toBeInTheDocument();
    // });
    // it("displays the weather data after fetching", async () => {
    //     render(<IntegrationComponent />);
    
    //     // Assertion to check if the loading state is initially displayed
    //     expect(screen.getByText("Loading...")).toBeInTheDocument();
    
    //     // Wait for the weather data to be fetched and displayed
    //     await screen.findByText("London Weather");
    
    //     // Assertions to check if the weather data is displayed correctly
    //     expect(screen.getByText(/Temperature/i)).toBeInTheDocument();
        
    //   });
    // Add more test cases for other interactions and behaviors in the component
    it("displays the weather data after fetching", async () => {
        
        // const mockedAxios = axios as jest.Mocked<typeof axios>;

        // Define the mock response
        const mockResponse = {
            temperature: "25°C",
            weather: "Sunny",
          };

        // Mock the axios get method and provide the mock response
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
            data: mockResponse,
          });
        render(<IntegrationComponent />);
    
        // Assertion to check if the loading state is initially displayed
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    
        // Wait for the weather data to be fetched and displayed
        await screen.findByText("London Weather");
    
        // Assertions to check if the weather data is displayed correctly
        expect(await screen.findByText("Temperature: 25°C")).toBeInTheDocument();
        expect(await screen.findByText("Weather: Sunny")).toBeInTheDocument();
      });
  

});