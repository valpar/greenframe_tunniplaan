import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import AddHNewItem from '../components/views/AddNewItem';
import AddNewItem from '../components/views/AddNewItem';

const mockProps = {
    modalFor: 'subjects',  
    onNewItem: jest.fn(),
    scheduled: '1',
    roomsData: '2' ,
    courseData: '3',
    lecturerData: '4',
    subjectsData: [{ subject: 'testSubject', subjectCode: "112", creditPoint: "10", }],
    onClose: jest.fn(),
    onDelete: jest.fn(),
    editMode: false,  // true for testing edit mode
    editValues: 'asd',
  };

// kui seda ei tee (createPortal), siis target "is not DOM element"
jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (element, target) => element, // Return the element directly
  }));

// kui seda ei tee, siis error TypeError: Cannot read properties of null (reading 'setAttribute')                                                                                                         
// const themeColorMeta = document.querySelector('meta[name="theme-color"]');
beforeAll(() => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
});
  
afterAll(() => {
  // eslint-disable-next-line testing-library/no-node-access
  document.head.removeChild(document.querySelector('meta[name="theme-color"]'));
});

describe('AddHomework', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<AddNewItem {...mockProps}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the component with provided props', () => {
    render(<AddNewItem {...mockProps}/>);
    const backdrop = screen.getByTestId('backdrop');
    const modalOverlay = screen.getByTestId('modal-overlay');
    const addItem = screen.getByText('UUE ÕPPEAINE LISAMINE');
    const inputElement = screen.getByPlaceholderText('Õppeaine');
    expect(backdrop).toBeInTheDocument();
    expect(modalOverlay).toBeInTheDocument();
    expect(addItem).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });
  // peab edasi uurima
  /* it('adds a new row when add row button is clicked', () => {
    render(<AddNewItem {...mockProps} />);
    fireEvent.click(screen.getByText('SALVESTA'));
    expect(mockProps.onNewItem).toHaveBeenCalled();
  }); */
});