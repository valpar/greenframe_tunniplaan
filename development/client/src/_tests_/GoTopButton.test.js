import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import GoTopButton from '../components/UI/Button/GoTopButton.js';


describe('GoTopButton', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<GoTopButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render and handle scroll to top', () => {
    // Mock the scroll function
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    // Mock the scrollY value to simulate scrolling
    Object.defineProperty(window, 'scrollY', { value: 100 });

    // Render the component
    render(<GoTopButton />);

    // Check if a component value exists
    const goTopButton = screen.getByTestId('go-top-button');
    const ariaHiddenValue = goTopButton.getAttribute('aria-hidden');
    expect(ariaHiddenValue).toBe('true');

    // Simulate a scroll event to hide the button
    Object.defineProperty(window, 'scrollY', { value: 0 });
    fireEvent.scroll(window);
    //expect(ariaHiddenValue).toBe('false');

    // After scrolling, the button should be visible
    expect(screen.getByTestId('go-top-button')).toBeInTheDocument();
    
  });
});
