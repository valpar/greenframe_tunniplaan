import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import CalendarInput from '../components/UI/Calendar/CalendarInput';

// Mock the onChange prop function
const mockOnChange = jest.fn();

afterEach(() => {
    cleanup();
});

describe('CalendarInput', () => {
    it("renders without errors", () => {
        render(<CalendarInput onChange={mockOnChange}/> );
        const calendarInput = screen.getByTestId('relative-group');
        expect(calendarInput).toBeInTheDocument();
        expect(calendarInput).toHaveTextContent('Homme');
        expect(calendarInput).toContainHTML('input');

        
      });
      it('toggles the calendar when clicked', () => {
        render(<CalendarInput onChange={mockOnChange} />);
        const toggleButton = screen.getByRole('button', { name: '«' });
    
        // Check if the calendar is initially not visible
        expect(screen.queryByRole('button', { name: 'today' })).not.toBeInTheDocument();
    
        // Click the toggle button to show the calendar
        fireEvent.click(toggleButton);
    
        // Check if the calendar is now visible
        expect(screen.getByRole('button', { name: /Täna/ })).toBeInTheDocument();
      });
      
});
