import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CalendarInput from '../components/UI/Calendar/CalendarInput';
import { formatDate } from "c:/Tunniplaan/HK-Tunniplaan/development/client/src/utils/Format/Date/index";

const mockOnChange = jest.fn();

// kui ei mocki aega, siis snapshot muutub pidevalt
beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date('2023-04-10')); 
});

afterAll(() => {
  jest.useRealTimers();
});

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
    it("resets state when reset prop is true", () => {
      render(<CalendarInput onChange={mockOnChange} reset={true} />);
      
      // Check if the calendar modal is not visible
      expect(screen.queryByRole('button', { name: 'today' })).not.toBeInTheDocument();
    
      // Check if resetDate is true
      expect(screen.getByDisplayValue('Kalender')).toBeInTheDocument();
    
      // Check if activePeriod is an empty string
      expect(screen.getByDisplayValue('Kalender').classList).not.toContain('animate-greenPeaker');
  });
  it("selects a custom date range and updates state", () => {
    render(<CalendarInput onChange={mockOnChange} />);
    const today = new Date();
    const end = new Date();

    const expectedStartTime = new Date(today);
    expectedStartTime.setHours(0, 0, 0, 0);

    const expectedEndDate = new Date(end);
    expectedEndDate.setHours(23,59,59,999);

    const expectedDateRange = `10.04.2023 - 10.04.2023`; // enne oli dünaamiline kell, ning snapshotid muutusid iga uue kuupäevaga

    // Simulate selecting a custom date range in the calendar
    fireEvent.click(screen.getByText(today.getDate().toString()));
    fireEvent.click(screen.getByText(end.getDate().toString()));
    
    // Check if activePeriod is an empty string
    expect(screen.getByDisplayValue(expectedDateRange)).toHaveClass('animate-greenPeaker');
    
    // Check if the onChange prop was called with the selected date range
    expect(mockOnChange).toHaveBeenCalledWith([
      {
        startTime: expectedStartTime.toString(),
        endTime: expectedEndDate.toString(),
      },
    ]);
  });
});
