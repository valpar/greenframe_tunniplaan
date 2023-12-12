import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import MobileMenu from '../components/views/MobileMenu';

// kui seda ei tee (createPortal), siis target "is not DOM element"
jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (element, target) => element, 
  }));

describe('MobileMenu', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(< MobileMenu />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  //praegu kommenteerin välja
  /* it('renders Sahtel and Riiul', () => {
    render(<MobileMenu/>);
    expect(screen.getByText('Sahtel')).toBeInTheDocument();
    expect(screen.getByText('Riiul')).toBeInTheDocument();
  });
  it('renders login button when not logged in', () => {
    localStorage.removeItem('token');
    render(<MobileMenu />);
    expect(screen.getByText('Google konto')).toBeInTheDocument();
  });
  it('renders logout button when logged in', () => {
    localStorage.setItem('token', 'mock-token');
    render(<MobileMenu />);
    expect(screen.getByText('LOGI VÄLJA')).toBeInTheDocument();
    localStorage.removeItem('token');
  });
  it('renders admin functionalities for admin users', () => {
    render(<MobileMenu admin={true} />);
    expect(screen.getByText('KASUTAJATE HALDUS')).toBeInTheDocument();
  });
  it('doesnt render admin functionalities if admin=false', () => {
    render(<MobileMenu admin={false} />);
    expect(screen.queryByText('KASUTAJATE HALDUS')).not.toBeInTheDocument();
  });
  it('handles user login click', () => {
    const mockLogin = jest.fn();
    render(<MobileMenu login={mockLogin} />);
    fireEvent.click(screen.getByText('Google konto'));
    expect(mockLogin).toHaveBeenCalled();
  });
  it('handles user logout click', () => {
    const mockLogOut = jest.fn();
    localStorage.setItem('token', 'mock-token');
    render(<MobileMenu logOut={mockLogOut} />);
    fireEvent.click(screen.getByText('LOGI VÄLJA'));
    expect(mockLogOut).toHaveBeenCalled();
    localStorage.removeItem('token');
  }); */
});