import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import DropdownOverlappingInput from '../components/UI/Dropdown/DropdownOverlappingInput.js';


describe('DropdownOverlappingInput', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<DropdownOverlappingInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('filters options based on user input', () => {
    const options = [
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
      { label: 'Option 3', value: 'Option 3' },
    ];

    // Define a mock onChange function
    const mockOnChange = jest.fn();

    render(
      <DropdownOverlappingInput
        placeholder="Test Placeholder"
        options={options}
        onChange={mockOnChange} // Pass the mock onChange function
      />
    );

    const input = screen.getByPlaceholderText('Test Placeholder');

    // Simulate user input
    fireEvent.change(input, { target: { value: 'Option 1' } });

    // Query for the element using the test ID
    const option1 = screen.getByTestId('option-1');

    // Assert that the filtered option is displayed
    expect(option1).toBeInTheDocument();

    // Assert that the onChange function was called
    expect(mockOnChange).toHaveBeenCalledWith('Option 1');
  });
  
  
});
