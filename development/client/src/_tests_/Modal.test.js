import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Modal from '../components/UI/Modal/Modal';

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
    const tree = renderer.create(<Modal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with Backdrop and ModalOverlay', () => {
    render(<Modal />);
    
    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
  });
  
});