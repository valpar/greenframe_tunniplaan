import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import InputWithPlaceholder from '../components/UI/Input/InputWithPlaceholder.js';


describe('InputWithPlaceholder', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<InputWithPlaceholder />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});