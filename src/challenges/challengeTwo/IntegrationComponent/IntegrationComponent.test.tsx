import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { IntegrationComponent } from "./IntegrationComponent";

const WEATHER_DATA_MOCK = {
    temperature: "30C",
    weather: "Cloudy"
};

jest.mock("axios");

const renderComponent = () => {
    render(<IntegrationComponent />);
};

describe("Modal", () => {
    beforeEach(() => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.get.mockResolvedValueOnce({data: WEATHER_DATA_MOCK});
    });

    it("render the 'Open Modal' button correctly", async () => {
        renderComponent();
        expect(await screen.findByRole("button", {name: "Open Form"})).toBeInTheDocument();
    });

    it("opens the modal correctly", async () => {
        renderComponent();
        userEvent.click(await screen.findByRole("button", {name: "Open Form"}))
        expect(await screen.findByRole("heading", {name: "Form Modal"})).toBeInTheDocument();
    });

    it("closes the modal when the cancel icon is clicked", async () => {
        renderComponent();
        userEvent.click(await screen.findByRole("button", {name: "Open Form"}))
        userEvent.click(await screen.findByTitle("close-modal-button"));
        await waitForElementToBeRemoved(() =>  screen.queryByRole("heading", {name: "Form Modal"}))
    });

    it("displays the toast message when the form is submitted", async () => {
        renderComponent();
        userEvent.click(await screen.findByRole("button", {name: "Open Form"}))
        userEvent.type(await screen.findByRole("textbox", {name: "Name"}), "Renu")
        userEvent.type(await screen.findByRole("textbox", {name: "Email"}), "renu@gmail.com")
        userEvent.click(screen.getByRole("button", {name: "Submit"}));
        expect(await screen.findByText("Hello Renu, your email renu@gmail.com has been submitted!"))
    });

    it("displays the weather data correctly", async () => {
        renderComponent();
        expect(await screen.findByText("Temperature: 30C")).toBeInTheDocument();
    });
});
