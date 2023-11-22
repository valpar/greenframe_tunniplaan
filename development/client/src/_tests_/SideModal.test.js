import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SideModal from '../components/UI/Modal/SideModal';

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
    const tree = renderer.create(<SideModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with Backdrop and ModalOverlay', () => {
    render(<SideModal />);
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
  });
  it('renders with different values for onHidden and modalOverlay props', () => {
    // Render with onHidden=true and modalOverlay=false
    render(<SideModal onHidden={true} modalOverlay={false} />);
    const modalOverlay = screen.getByTestId('modal-overlay');

    // sellise klassi saab komponent
    expect(modalOverlay).toHaveClass('animate-slideRight fixed top-20 w-full h-full left-1/2 -translate-x-1/2 bg-white z-30 shadow-lg');
    expect(modalOverlay).not.toHaveClass('flex');
  });

  // lisada juurde
});