import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import { FaPlus } from 'react-icons/fa';

describe('Button Component', () => {
  it('Renders the button component with default props', () => {
    render(<Button label="Default Button" />);
    const buttonElement = screen.getByRole('button', {
      name: /Default Button/i,
    });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Default Button');
  });

  it('Renders the button with custom variants', () => {
    render(<Button label="Solid Button" variant="solid" />);

    const buttonElement = screen.getByRole('button', { name: /Solid Button/i });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-blue-500');
  });

  it('Renders the button with custom sizes', () => {
    render(<Button label="Small Button" size="sm" />);

    const buttonElement = screen.getByRole('button', { name: /Small Button/i });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('h-8 text-sm');
  });

  it('renders the button with icon before the label', () => {
    render(
      <Button
        label="Button With Icon"
        variant="solid"
        icon={<FaPlus />}
        iconPosition="before"
      />
    );

    const buttonElement = screen.getByRole('button', {
      name: /Button With Icon/i,
    });
    const iconElement = screen.getByTestId('icon');

    expect(buttonElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('mr-2');
  });

  it('renders the button with icon after the label', () => {
    render(
      <Button
        label="Button With Icon"
        variant="solid"
        icon={<FaPlus />}
        iconPosition="after"
      />
    );

    const buttonElement = screen.getByRole('button', {
      name: /Button With Icon/i,
    });
    const iconElement = screen.getByTestId('icon');

    expect(buttonElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).not.toHaveClass('mr-2');
  });

  it('renders the button with desabled state', () => {
    render(<Button label="Disabled Button" disabled />);

    const buttonElement = screen.getByRole('button', {
      name: /Disabled Button/i,
    });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('cursor-not-allowed opacity-50');
  });

  it('Calls click handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);

    const buttonElement = screen.getByRole('button', { name: /Click Me/i });

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
