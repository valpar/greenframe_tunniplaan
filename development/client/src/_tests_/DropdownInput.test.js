import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import DropdownInput from '../components/UI/Dropdown/DropdownInput.js';


describe('DropdownInput', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<DropdownInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders label if provided", () => {
    render(<DropdownInput label="Test Label" index={0} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });
  it("shows tooltip when mouse enters and hides when mouse leaves", async () => {
    const errorMessage = "This is an error!";
    render(<DropdownInput onErrorMessage={errorMessage} />);

    const input = screen.getByRole('textbox');
    fireEvent.mouseEnter(input);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    fireEvent.mouseLeave(input);

    // Wait for potential effects or transitions.
    await new Promise(r => setTimeout(r, 500));
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });
});
