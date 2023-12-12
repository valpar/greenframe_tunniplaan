import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import UserEditModal from '../components/views/UserEditModal';

/* beforeAll(() => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  });
  
afterAll(() => {
  // eslint-disable-next-line testing-library/no-node-access
  document.head.removeChild(document.querySelector('meta[name="theme-color"]'));
});
*/
jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (element, target) => element, 
  }));

describe('UserEditModal', () => {
    it("if matches snapshot", () => {
        const tree = renderer.create(<UserEditModal />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});