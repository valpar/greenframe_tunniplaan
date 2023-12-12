import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import DateOfOccurenceForm from '../components/views/DateOfOccurenceForm';

const mockProps = {
    onNotValidFields: [{ endTime: false, date: false }],
    index: 0,
    onChange: jest.fn(),
    onAfterSubmit: jest.fn(),
    onDelete: jest.fn(),
    isMobile: false,
    isTabletOrMobile: false,
  };

describe('DateOfOccurenceForm', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<DateOfOccurenceForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders initial state correctly', () => {
    render(<DateOfOccurenceForm {...mockProps} />);
    expect(screen.getByText('Kuupäev')).toBeInTheDocument();
    expect(screen.getByText('Maht')).toBeInTheDocument();
    expect(screen.getByText('Algus')).toBeInTheDocument();
    expect(screen.getByText('Lõpp')).toBeInTheDocument();
    expect(screen.getByText('Lõuna')).toBeInTheDocument();
  });
  /* it('updates load value on user input', () => {
    render(<DateOfOccurenceForm {...mockProps} />);
    const loadInput = screen.getByTestId('input-workLoad'); // ei saa ka test id abil kätte
    fireEvent.change(loadInput, { target: { value: '5' } });
    expect(loadInput.value).toBe('5');
  }); */
}); 