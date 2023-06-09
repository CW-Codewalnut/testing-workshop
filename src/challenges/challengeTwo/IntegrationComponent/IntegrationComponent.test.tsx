import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { IntegrationComponent } from "./IntegrationComponent";

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

  it("closes the modal when clicking on the cross icon", async () => {
    renderComponent();
    const openFormButton = screen.getByText("Open Form");
    await userEvent.click(openFormButton);

    const crossIcon = screen.getByTestId("modal-close-icon");
    await userEvent.click(crossIcon);

    expect(screen.queryByText("Form Modal")).not.toBeInTheDocument();
  });

  it("render form field", async () => {
    renderComponent();
    const openFormButton = screen.getByText("Open Form");
    await userEvent.click(openFormButton);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("updates name field values on input change", async () => {
    renderComponent();
    const openFormButton = screen.getByText("Open Form");
    await userEvent.click(openFormButton);
    const inputElement = screen.getByLabelText("Name");
    await userEvent.type(inputElement, "Lovepreet");
    expect(inputElement).toHaveValue("Lovepreet");
  });

  it("updates email field values on input change", async () => {
    renderComponent();
    const openFormButton = screen.getByText("Open Form");
    await userEvent.click(openFormButton);
    const inputElement = screen.getByLabelText("Email");
    await userEvent.type(inputElement, "lovepreet@gmail.com");
    expect(inputElement).toHaveValue("lovepreet@gmail.com");
  });

  it("display success message once we submit the form", async () => {
    renderComponent();
    const openFormButton = screen.getByText("Open Form");
    await userEvent.click(openFormButton);
    const nameInput = screen.getByLabelText("Name");
    await userEvent.type(nameInput, "Lovepreet");
    const emailInput = screen.getByLabelText("Email");
    await userEvent.type(emailInput, "lovepreet@gmail.com");

    const button = screen.getByText("Submit");
    await userEvent.click(button);

    await screen.findByText(
      "Hello Lovepreet, your email lovepreet@gmail.com has been submitted!",
    );
    expect(screen.queryByText("Form Modal")).not.toBeInTheDocument();
  });
});
