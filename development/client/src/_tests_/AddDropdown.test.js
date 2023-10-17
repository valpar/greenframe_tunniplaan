import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer'; //snapshot renderer
import AddDropdown from '../components/UI/Dropdown/AddDropdown';


afterEach(() => {
    cleanup();
});

describe('AddDropdown', () => {
    // need to add options value (any) for a filter function in AddDropdown component to test rendering it
    it("if matches snapshot", () => {
        const tree = renderer.create(<AddDropdown options={[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }]} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders the dropdown component', () => {
        render(<AddDropdown options={[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }]}/>);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
    
      
      
});
