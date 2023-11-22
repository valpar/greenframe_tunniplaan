import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SearchDropdown from '../components/UI/Dropdown/SearchDropdown.js';

const mockOptions = [{ value: 'option1', label: 'Option 1' }];
const mockOnChange = jest.fn();
const mockOnInputChange = jest.fn();

describe('SearchDropdown', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<SearchDropdown />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('opens dropdown on click', () => {
    render(
      <SearchDropdown
        name="test-dropdown"
        options={mockOptions} // Ensure mockOptions is defined, even if it's just an empty array or basic options
        onChange={mockOnChange}
        onInputChange={mockOnInputChange}
      />
    );
  
    // Try to open the dropdown
    const dropdown = screen.getByRole('combobox');
    fireEvent.mouseDown(dropdown);
  
    // Check if dropdown is in an expanded state
    expect(dropdown.getAttribute('aria-expanded')).toBe('true');
  });
});