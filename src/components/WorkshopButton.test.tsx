// Sachin

import React from "react";
import { render, screen,  fireEvent} from "@testing-library/react";
import { WorkshopButton } from "./WorkshopButton";


describe('WorkshopButton', () => {
  // Add your setup and tests here using everything I've taught you so far!
  it('renders the button with the provided text', () => {
    const buttonText = 'Click me';
    render(<WorkshopButton text={buttonText} />);
    const buttonElement = screen.getByText(buttonText);

    expect(buttonElement).toBeInTheDocument();
  });

  it('renders the button with the provided text, default class should be primary', () => {
    const buttonText = 'Click me';
    const primaryVariantClass = 'bg-blue-500 hover:bg-blue-700 text-white';
    render(<WorkshopButton text={buttonText} />);
    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toHaveClass(primaryVariantClass);
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies the correct variant class based on the "variant" prop : primary', () => {
    const buttonText = 'Click me';
    const primaryVariantClass = 'bg-blue-500 hover:bg-blue-700 text-white';
    render(<WorkshopButton text={buttonText} variant="primary" />);
    const buttonElement = screen.getByText(buttonText);

    expect(buttonElement).toHaveClass(primaryVariantClass);
  });

  it('applies the correct variant class based on the "variant" prop : secondary', () => {
    const buttonText = 'Click me';
    const secondaryVariantClass = 'bg-gray-500 hover:bg-gray-700 text-white';
    render(<WorkshopButton text={buttonText} variant="secondary" />);
    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toHaveClass(secondaryVariantClass);
  });
  
  it('applies the correct variant class based on the "variant" prop : danger', () => {
    const buttonText = 'Click me';
    const dangerVariantClass = 'bg-red-500 hover:bg-red-700 text-white';
    render(<WorkshopButton text={buttonText} variant="danger" />);
    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toHaveClass(dangerVariantClass);
  });

  it('calls the onClick function when the button is clicked', () => {
    const buttonText = 'Click me';
    const onClickMock = jest.fn();
    render(<WorkshopButton text={buttonText} onClick={onClickMock} />);
    const buttonElement = screen.getByText(buttonText);

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('renders the leading icon when the "leadingIcon" prop is provided', () => {
    const buttonText = 'Click me';
    const leadingIcon = <i className="fas fa-plus" data-testid="leading-icon"/>;
    render(<WorkshopButton text={buttonText} leadingIcon={leadingIcon} />);
    const buttonElement = screen.getByText(buttonText);
    const leadingIconElement = screen.getByTestId('leading-icon');

    expect(buttonElement).toContainElement(leadingIconElement);
  });

  it('renders the trailing icon when the "trailingIcon" prop is provided', () => {
    const buttonText = 'Click me';
    const trailingIcon = <i className="fas fa-plus" data-testid="trailing-icon"/>;
    render(<WorkshopButton text={buttonText} trailingIcon={trailingIcon} />);
    const buttonElement = screen.getByText(buttonText);
    const trailingIconElement = screen.getByTestId('trailing-icon');

    expect(buttonElement).toContainElement(trailingIconElement);
  });
});