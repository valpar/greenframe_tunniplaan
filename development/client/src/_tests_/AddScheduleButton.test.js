import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import { AddScheduleButton } from '../components/UI/Button/AddScheduleButton';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

describe('AddScheduleButton', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<AddScheduleButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the button with FontAwesomeIcon', () => {
    const addScheduleHandler = jest.fn();
    const addSchedule = true; 

    render(
      <AddScheduleButton
        addSchedule={addSchedule}
        addScheduleHandler={addScheduleHandler}
      />
    );

    const button = screen.getByText('LISA');
    const fontAwesomeIcon = screen.getByTestId('font-awesome-icon');

    expect(button).toBeInTheDocument();
    expect(fontAwesomeIcon).toBeInTheDocument();
    expect(fontAwesomeIcon).toHaveAttribute('data-icon', faAngleRight.iconName);

    fireEvent.click(button);
    expect(addScheduleHandler).toHaveBeenCalled();
  });
  
});
