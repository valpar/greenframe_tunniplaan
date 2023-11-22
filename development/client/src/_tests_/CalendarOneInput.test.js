import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer'; //snapshot renderer
import CalendarOneInput from '../components/UI/Calendar/CalendarOneInput';

// Mock the prop functions
const mockOnClick = jest.fn();
const mockOnClickDay = jest.fn();

afterEach(() => {
    cleanup();
});

describe('CalendarOneInput', () => {
    it("matches snapshot", () => {
        // loob snapshoti
        const tree = renderer.create(<CalendarOneInput/>).toJSON();
        // console.log(tree);
        // võrdleb testis loodud snapshotiga, kui komponenti muudetakse, siis test feilib, "u" shortcut keyga saab uue snapshoti luua
        expect(tree).toMatchSnapshot();
    });
    it('handles click events', () => {
        render(<CalendarOneInput onClick={mockOnClick} onClickDay={mockOnClickDay}/>);
        fireEvent.click(screen.getByRole('textbox'));
        expect(mockOnClick).toHaveBeenCalled();
    });
    it('renders with props', () => {
        render(<CalendarOneInput onClickDay={mockOnClickDay} />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    it('updates the input value on change', () => {
        render(<CalendarOneInput onClickDay={mockOnClickDay}/>);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '12.05.2023' } });
        expect(input.value).toBe('12.05.2023');
    });
    it('resets input value when reset prop changes', () => {
        const { rerender } = render(<CalendarOneInput onClickDay={mockOnClickDay} reset={false} />);
        rerender(<CalendarOneInput onClickDay={mockOnClickDay} reset={true} />);
        expect(screen.getByRole('textbox').value).toBe('');
    });
    it('handles invalid date', () => {
        render(<CalendarOneInput onClickDay={mockOnClickDay} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '' } });
        expect(input.value).toBe('');
    });
        
      
      
});
