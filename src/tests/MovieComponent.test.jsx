import { beforeEach, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MovieComponent from "../components/MovieComponent"; 

beforeEach(() => {
  global.fetch = vi.fn(); 
});

test("mocka inloggning och visa filmer", async () => {
  fetch.mockResolvedValueOnce({
    text: () => Promise.resolve("mock-jwt-token"),
  });

  fetch.mockResolvedValueOnce({
    json: () => Promise.resolve([{ id: 1, title: "The Matrix" }]),
  });

  render(<MovieComponent />); 

  fireEvent.click(screen.getByText("Logga in"));

  fireEvent.click(screen.getByText("Hämta filmer"));

  const movieTitle = await screen.findByText("The Matrix");
  expect(movieTitle).toBeInTheDocument(); 
});

test("visar inte filmer utan inloggning", () => {
  render(<MovieComponent />); 
  expect(screen.queryByText("The Matrix")).not.toBeInTheDocument(); 
});

test("visar felmeddelande om inloggning misslyckas", async () => {
  fetch.mockRejectedValueOnce(new Error("Login failed"));
  render(<MovieComponent />); 

  fireEvent.click(screen.getByText("Logga in"));
  
  await waitFor(() => {
    expect(screen.getByTestId("error-message")).toHaveTextContent("Login failed");
  });
});
