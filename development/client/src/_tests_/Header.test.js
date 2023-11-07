import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer'; //snapshot renderer
import { Header } from '../components/views/Header'; // Headeri failis on named export, ei ole export default


describe('Header', () => {
    //snapshot sellisel kujul ei tööta
    it("if matches snapshot", () => {
        const tree = renderer.create(<Header />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});