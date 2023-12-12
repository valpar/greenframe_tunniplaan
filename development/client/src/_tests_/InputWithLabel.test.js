import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import InputWithLabel from '../components/UI/Input/InputWithLabel.js';


describe('InputWithLabel', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<InputWithLabel />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders with provided label and type", () => {
    render(<InputWithLabel label="Test Label" name="testInput" type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });
  it('calls onChange on input change', () => {
    const handleChange = jest.fn();
    render(<InputWithLabel onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledWith('new value');
  });
  it('shows tooltip on mouse enter when error message is present', () => {
    render(<InputWithLabel onErrorMessage="Error" />);
    const input = screen.getByRole('textbox');
    fireEvent.mouseEnter(input);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
  it('hides tooltip on mouse leave', () => {
    render(<InputWithLabel onErrorMessage="Error" />);
    const input = screen.getByRole('textbox');
    fireEvent.mouseEnter(input);
    fireEvent.mouseLeave(input);
    expect(screen.queryByText("Error")).not.toBeInTheDocument();
  });
});