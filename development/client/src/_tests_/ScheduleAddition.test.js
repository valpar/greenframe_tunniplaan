import axios from 'axios';
import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ScheduleAddition from '../components/views/ScheduleAddition';

jest.mock('axios');

describe('ScheduleAddition', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(< ScheduleAddition />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders main heading', () => {
    render(< ScheduleAddition />)
    const headingElement = screen.getByText('LOENGU LISAMINE TUNNIPLAANI');
    expect(headingElement).toBeInTheDocument();
  });
  it('renders the save button', () => {
    render(<ScheduleAddition />);
    const saveButton = screen.getByRole('button', { name: 'SALVESTA' });
    expect(saveButton).toBeInTheDocument();
  });
  it('renders the dropdowns for course selection', () => {
    render(<ScheduleAddition />);
    const dropdowns = screen.getAllByTestId('add-dropdown');
    expect(dropdowns.length).toBeGreaterThanOrEqual(1);
  });
  /* it('triggers a network request when save button is clicked', async () => {
    axios.post.mockResolvedValue({ status: 200 }); 
    axios.patch.mockResolvedValue({ status: 200 });

    // console.error
    // Warning: An update to ScheduleAddition inside a test was not wrapped in act(...).
    // When testing, code that causes React state updates should be wrapped into act(...):
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        render(<ScheduleAddition />);
        const saveButton = screen.getByRole('button', { name: 'SALVESTA' });
        fireEvent.click(saveButton);
        await waitFor(() => {
          expect(axios.post).toHaveBeenCalled();
        });
      });
  }); */
});