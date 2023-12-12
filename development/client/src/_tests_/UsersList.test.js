import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import UsersList from '../components/views/UsersList';

beforeAll(() => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  });
  
afterAll(() => {
  // eslint-disable-next-line testing-library/no-node-access
  document.head.removeChild(document.querySelector('meta[name="theme-color"]'));
});

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (element, target) => element, 
  }));

describe('Header', () => {
    it("if matches snapshot", () => {
        const tree = renderer.create(<UsersList />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('loads users on mount', () => {
        render(<UsersList />);
        expect(screen.getByText('EESNIMI')).toBeInTheDocument();
        expect(screen.getByText('PERENIMI')).toBeInTheDocument();
        expect(screen.getByText('EMAIL')).toBeInTheDocument();
        expect(screen.getByText('ROLL')).toBeInTheDocument();
    });
    it('opens add modal on button click', () => {
    render(<UsersList  />);
    fireEvent.click(screen.getByText('LISA'));
    expect(screen.getByTestId('user-edit-modal')).toBeInTheDocument();
    });
});