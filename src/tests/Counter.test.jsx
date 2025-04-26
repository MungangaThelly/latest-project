import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../components/Counter"; 

describe("Counter Component", () => {
  
  test("visar 0 från början", () => {
    render(<Counter />); 
    const counterValue = screen.getByTestId("counter-value"); 
    expect(counterValue.textContent).toBe("0"); 
  });

  test("värdet ökar med 1 efter klick", () => {
    render(<Counter />); 
    const button = screen.getByText("Öka"); 
    const counterValue = screen.getByTestId("counter-value"); 

    fireEvent.click(button); 
    expect(counterValue.textContent).toBe("1"); 
  });

});
