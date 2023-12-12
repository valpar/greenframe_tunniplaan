import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import InputWithPlaceholder from '../components/UI/Input/InputWithPlaceholder.js';


describe('InputWithPlaceholder', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<InputWithPlaceholder />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders with provided placeholder and type", () => {
    render(<InputWithPlaceholder placeholder="Test Placeholder" name="testInput" type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });
  it('calls onChange on input change', () => {
    const handleChange = jest.fn();
    render(<InputWithPlaceholder onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledWith({
      name: undefined,
      value: 'new value',
    });
  });
  it('shows tooltip on mouse enter when error message is present', () => {
    render(<InputWithPlaceholder errorMessage="Error" />);
    const input = screen.getByRole('textbox');
    fireEvent.mouseEnter(input);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
  it('hides tooltip on mouse leave', () => {
    render(<InputWithPlaceholder errorMessage="Error" />);
    const input = screen.getByRole('textbox');
    fireEvent.mouseEnter(input);
    fireEvent.mouseLeave(input);
    expect(screen.queryByText("Error")).not.toBeInTheDocument();
  });
});