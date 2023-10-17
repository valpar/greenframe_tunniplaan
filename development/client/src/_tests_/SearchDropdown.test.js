import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SearchDropdown from '../components/UI/Dropdown/SearchDropdown.js';


describe('SearchDropdown', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<SearchDropdown />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
