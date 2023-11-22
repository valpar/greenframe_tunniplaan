import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Spinner } from '../components/UI/Spinner';

describe('Spinner component', () => {
    it("matches snapshot", () => {
        const tree = renderer.create(<Spinner/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders without errors', () => {
        const { container } = render(<Spinner />);
        expect(container).toBeInTheDocument();
    });

    it('renders with custom icon size', () => {
        const customIconSize = 'w-32 h-32'; // Example custom icon size
        const { container } = render(<Spinner iconSize={customIconSize} />);
        const svg = container.querySelector('svg');
        expect(svg).toHaveClass(customIconSize);
    });
});
