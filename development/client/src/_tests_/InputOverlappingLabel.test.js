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
  /* it("renders with provided value and placeholder", () => {
    render(<InputOverlappingLabel {...props} />);
    const inputField = screen.getByLabelText("Enter something");
    expect(inputField).toHaveValue("Sample Value");
  }); */
});