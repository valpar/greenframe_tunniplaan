import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Input from '../components/UI/Input/Input.js';

afterEach(() => {
  cleanup();
});

describe('Input', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<Input />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('sets the name attribute when name prop is provided', () => {
    render(<Input name="testName" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'testName');
  });
  it('returns empty string when name prop is not provided', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toHaveAttribute('name', '');
  });
  it('calls onChange prop on change event', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} name="test" />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test value' } });
    expect(handleChange).toHaveBeenCalledWith({ name: 'test', value: 'test value' });
  });
  it('calls onChange on input blur with name prop', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} name="test" />);
    fireEvent.blur(screen.getByRole('textbox'), { target: { value: 'test value' } });
    expect(handleChange).toHaveBeenCalledWith({ name: 'test', value: 'test value' });
  });
  
});
