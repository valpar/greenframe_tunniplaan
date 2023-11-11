import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import TooltipLarge from '../components/UI/Tooltip/TooltipLarge';

describe('TooltipLarge', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<TooltipLarge />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('displays the provided message', () => {
    const message = "Test Tooltip Message";
    render(<TooltipLarge message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});