import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { RequestError } from '../components/UI/RequestError';

describe('RequestError', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<RequestError />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('displays the custom error message', () => {
    const customMessage = "Custom Error Message";
    render(<RequestError errorMessage={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
  it('displays default error message when no custom message is provided', () => {
    render(<RequestError />);
    // Replace 'Default Error Message' with the actual default message from your content file
    expect(screen.getByText('Andmete laadimine ebaõnnestus!')).toBeInTheDocument();
  });
  it('calls reloadHandler on button click', () => {
    const mockReloadHandler = jest.fn();
    render(<RequestError reloadHandler={mockReloadHandler} />);
    fireEvent.click(screen.getByText('Uuesti'));
    expect(mockReloadHandler).toHaveBeenCalled();
  });
});