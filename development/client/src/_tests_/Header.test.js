import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Header } from '../components/views/Header';


describe('Header', () => {
    it("if matches snapshot", () => {
        const tree = renderer.create(<Header />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('displays admin controls when admin prop is true', () => {
        render(<Header admin={true} />);
        const adminControls = screen.getByTestId('admin-controls');
        expect(adminControls).toBeInTheDocument();
    });
});