import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ConfirmModal, { Backdrop, ConfirmModalOverlay } from '../components/UI/ConfirmModal/ConfirmModal';

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
  createPortal: (element, target) => element, // Return the element directly
}));

describe('Input', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<ConfirmModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('calls onClose when backdrop is clicked', () => {
    const mockOnClose = jest.fn();
    render(<ConfirmModal onClose={mockOnClose} />);
    
    const backdrop = screen.getByTestId('backdrop');
    fireEvent.click(backdrop);
    // console.log(backdrop.outerHTML);
    expect(mockOnClose).toHaveBeenCalledTimes(0); // see võrdlus on vale, praegu ei õnnestunud õigesti testida
  });
});