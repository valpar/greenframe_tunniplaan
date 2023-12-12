import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer'; //snapshot renderer
import AddHomework from '../components/views/AddHomework';

const mockProps = {
  homeworkData: {
    description: 'Test description',
    dueDate: '2021-09-01',
    extrasLink: 'http://example.com',
    id: '1'
  },
  onErrors: {
    descriptionValid: {
      description: true,
      errorMessage: 'Required'
    },
    dueDateValid: {
      dueDate: true,
      errorMessage: 'Invalid date'
    },
    extrasLinkValid: {
      extrasLink: true,
      errorMessage: 'Invalid link'
    }
  },
  onChange: jest.fn(),
  onAddRow: jest.fn(),
  onRemoveRow: jest.fn(),
  index: 0,
  arrayLength: 1
};

describe('AddHomework', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<AddHomework {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the component with provided props', () => {
    render(<AddHomework {...mockProps} />);
    const descriptionTextArea = screen.getByPlaceholderText("Iseseisva töö kirjeldus...");
    expect(descriptionTextArea).toBeInTheDocument();
  });
});