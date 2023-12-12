import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import RequestModal from '../components/UI/RequestModal/RequestModal';

beforeAll(() => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  });
  
afterAll(() => {
  // eslint-disable-next-line testing-library/no-node-access
  document.head.removeChild(document.querySelector('meta[name="theme-color"]'));
});

// kui seda ei tee (createPortal), siis target "is not DOM element"
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (element, target) => element, 
}));

describe('Modal', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<RequestModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with Backdrop and ModalOverlay', () => {
    render(<RequestModal />);
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
  });
  it('displays spinner when loading is true', () => {
    render(<RequestModal loading={true} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
  it('calls onConfirm when the confirm button is clicked', () => {
    const handleConfirm = jest.fn();
    render(<RequestModal onConfirm={handleConfirm} error={true} />);
    
    fireEvent.click(screen.getByText('UUESTI'));
    expect(handleConfirm).toHaveBeenCalled();
  });
});