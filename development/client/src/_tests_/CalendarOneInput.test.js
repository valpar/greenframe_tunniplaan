import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer'; //snapshot renderer
import CalendarOneInput from '../components/UI/Calendar/CalendarOneInput';

// Mock the onChange prop function
const mockOnChange = jest.fn();

afterEach(() => {
    cleanup();
});

describe('CalendarOneInput', () => {

    //snapshoti test on, teha ka unit testid
    it("matches snapshot", () => {
        // loob snapshoti
        const tree = renderer.create(<CalendarOneInput/>).toJSON();
        // console.log(tree);
        // võrdleb testis loodud snapshotiga, kui komponenti muudetakse, siis test feilib, "u" shortcut keyga saab uue snapshoti luua
        expect(tree).toMatchSnapshot();
    });
        
      
      
});
