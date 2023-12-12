import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { InputOverlappingLabel } from '../components/UI/Input/InputOverlappingLabel.js';

/* const props = {
    value: "Sample Value",
    placeholder: "Enter something",
    onChange: jest.fn(),
  }; */

describe('InputOverlappingLabel', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<InputOverlappingLabel />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders with provided value and placeholder", () => {
    render(<InputOverlappingLabel value="Sample Value" placeholder="Enter something" />);
    expect(screen.getByPlaceholderText("Enter something")).toHaveValue("Sample Value");
  });
  it('calls onChange on input change', () => {
    const handleChange = jest.fn();
    render(<InputOverlappingLabel onChange={handleChange} name="test" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledWith({ id: undefined, name: 'test', value: 'new value' });
  });
  it('shows tooltip on mouse enter', () => {
    render(<InputOverlappingLabel errorMessage="Error Message" />);
    const input = screen.getByRole('textbox');
    fireEvent.mouseEnter(input);
    expect(screen.getByText("Error Message")).toBeInTheDocument();
  });
  it('hides tooltip on mouse leave', () => {
    render(<InputOverlappingLabel errorMessage="Error Message" />);
    const input = screen.getByRole('textbox');
    fireEvent.mouseEnter(input);
    fireEvent.mouseLeave(input);
    expect(screen.queryByText("Error Message")).not.toBeInTheDocument();
  });
});