import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CalendarInput from '../components/UI/Calendar/CalendarInput';

// Mock the onChange prop function
const mockOnChange = jest.fn();

afterEach(() => {
    cleanup();
    mockOnChange.mockReset(); // Reset the mock function after each test
});

describe('CalendarInput', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<CalendarInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
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
    it("sets the date to 'today' when the 'today' button is clicked", async () => {
      const today = new Date();
      const end = new Date(today);
      end.setHours(23);
      end.setMinutes(59);
      end.setSeconds(59);
      end.setMilliseconds(999);
  
      render(<CalendarInput onChange={mockOnChange} />);
      fireEvent.click(screen.getByRole('button', { name: '«' })); // open the calendar
      fireEvent.click(screen.getByRole('button', { name: /Täna/ }));
  
      await waitFor(() => {
          expect(mockOnChange).toHaveBeenCalledWith([
              {
                startTime: new Date(today.setHours(0,0,0,0)).toString(),
                endTime: end.toString(),
              }
          ]);
      });
  });
});
