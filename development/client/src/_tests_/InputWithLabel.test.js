import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import InputWithLabel from '../components/UI/Input/InputWithLabel.js';


describe('InputWithLabel', () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<InputWithLabel />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});