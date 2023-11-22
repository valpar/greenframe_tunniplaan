import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Home from '../components/Home';


// ilma axios mockita -- Element type is invalid: expected a string (for built-in components) or a class/function 
// komponentidele ligipääs 


// ilma  -> Google OAuth components must be used within GoogleOAuthProvider
jest.mock('@react-oauth/google', () => ({
  useGoogleLogin: jest.fn().mockImplementation(() => ({
    signIn: jest.fn(),
  })),
  googleLogout: jest.fn(),
}));

afterEach(cleanup);

describe('Home', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<Home/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders without crashing', () => {
    render(<Home />);
    screen.getByText('SAHTEL');
    screen.getByText('RIIUL');
  });
});