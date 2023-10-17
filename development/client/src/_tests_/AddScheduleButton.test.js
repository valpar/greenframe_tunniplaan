import React from 'react';
import { render, fireEvent} from '@testing-library/react';
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

    const { getByText, getByTestId } = render(
      <AddScheduleButton
        addSchedule={addSchedule}
        addScheduleHandler={addScheduleHandler}
      />
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const addButton = getByText('LISA');
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const fontAwesomeIcon = getByTestId('font-awesome-icon');

    expect(addButton).toBeInTheDocument();
    expect(fontAwesomeIcon).toBeInTheDocument();
    expect(fontAwesomeIcon).toHaveAttribute('data-icon', faAngleRight.iconName);

    fireEvent.click(addButton);
    expect(addScheduleHandler).toHaveBeenCalled();
  });
});
