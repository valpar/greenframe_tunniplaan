import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer'; //snapshot renderer
import ConfirmModal from '../components/UI/ConfirmModal/ConfirmModal.js';

// Mock the onChange prop function
const mockOnChange = jest.fn();

afterEach(() => {
    cleanup();
});

describe('Backdrop', () => {
    /* test("matches snapshot", () => {
        const tree = renderer.create(<ConfirmModal />).toJSON();
        expect(tree).toMatchSnapshot();
    }); */
    /* test("backdrop is rendered", () => {
        render(<ConfirmModalOverlay />);
        const initialThemeColorMeta = document.querySelector('meta[name="theme-color"]').getAttribute('content');
        expect(initialThemeColorMeta).toBe('#5C5C5C');
    }); */
        
      
      
});
