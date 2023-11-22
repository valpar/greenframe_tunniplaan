import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import TooltipTop from '../components/UI/Tooltip/TooltipLarge';

describe('TooltipTop', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<TooltipTop />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('displays the provided message', () => {
    const message = "Test Tooltip Message";
    render(<TooltipTop message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});