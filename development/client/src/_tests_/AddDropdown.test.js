import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer'; //snapshot renderer
import AddDropdown from '../components/UI/Dropdown/AddDropdown';

const mockOptions = [{ value: 1, label: 'Option 1'}, { value: 2, label: 'Option 2' }];
const mockOnChange = jest.fn();
const mockOnInputChange = jest.fn();

afterEach(() => {
    cleanup();
});

describe('AddDropdown component', () => {
    // need to add options value (any) for a filter function in AddDropdown component to test rendering it
    it("if matches snapshot", () => {
        const tree = renderer.create(<AddDropdown options={mockOptions} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders the dropdown component', () => {
        render(<AddDropdown options={mockOptions}/>);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
    it('opens dropdown on click', () => {
        render(
          <AddDropdown
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
