import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import App from "../App.js";



describe("App Component", () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders without errors", () => {
    render(<App />);
    // Checks if the Home component renders content
    expect(screen.getByText("SAHTEL")).toBeInTheDocument();
    expect(screen.getByText("Logi sisse")).toBeInTheDocument();
    expect(screen.getByText("RIIUL")).toBeInTheDocument();
  });

});