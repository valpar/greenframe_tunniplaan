import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import LoginModal from '../components/views/LoginModal';

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

describe('LoginModal', () => {
  const mockOnClose = jest.fn();
  const mockOnEmailChange = jest.fn();
  const mockOnPasswordChange = jest.fn();
  const mockOnDecline = jest.fn();
  const mockOnConfirm = jest.fn();
  it("matches snapshot", () => {
    const tree = renderer.create(
      <LoginModal
        onClose={mockOnClose}
        onEmailChange={mockOnEmailChange}
        onPasswordChange={mockOnPasswordChange}
        onDecline={mockOnDecline}
        onConfirm={mockOnConfirm}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with Backdrop', () => {
    render(<LoginModal />);
    
    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
  });
});