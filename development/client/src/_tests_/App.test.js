import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App.js";



describe("App Component", () => {
  it("renders without errors", () => {
    render(<App />);
    // Checks if the Home component renders content
    expect(screen.getByText("SAHTEL")).toBeInTheDocument();
    expect(screen.getByText("Logi sisse")).toBeInTheDocument();
    expect(screen.getByText("RIIUL")).toBeInTheDocument();
  });

});