import { beforeEach, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MovieComponent from "../components/MovieComponent";

// Rensa och mocka fetch-funktionen före varje test
beforeEach(() => {
  global.fetch = vi.fn(); 
});

test("mocka inloggning och visa filmer", async () => {
  // Mocka ett lyckat inloggningssvar
  fetch.mockResolvedValueOnce({
    ok: true,  // Markera som lyckat svar
    text: () => Promise.resolve("mock-jwt-token"), // Mocka JWT-token
  });

  // Mocka ett lyckat svar för filmlistan
  fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([{ id: 1, title: "The Matrix" }]), // Mocka filmdata
  });

  // Rendera komponenten
  render(<MovieComponent />); 

  // Simulera klick på inloggningsknappen
  fireEvent.click(screen.getByText("Logga in"));

  // Simulera klick på "Hämta filmer"-knappen
  fireEvent.click(screen.getByText("Hämta filmer"));

  // Vänta på att filmen ska visas och verifiera att den finns i DOM:en
  // Använder en flexibel textmatcher för att hantera whitespace/kommatecken
  const movieTitle = await screen.findByText((content, element) => {
    return content.includes("The Matrix") && 
           element.tagName.toLowerCase() === 'li';
  });
  expect(movieTitle).toBeInTheDocument(); 
});

test("visar inte filmer utan inloggning", () => {
  // Rendera komponenten utan att logga in
  render(<MovieComponent />); 
  
  // Kontrollera att filmer INTE visas utan inloggning
  expect(screen.queryByText("The Matrix")).not.toBeInTheDocument(); 
});

test("visar felmeddelande om inloggning misslyckas", async () => {
  // Mocka ett misslyckat inloggningsförsök
  fetch.mockRejectedValueOnce(new Error("Login failed"));
  
  // Rendera komponenten
  render(<MovieComponent />); 

  // Simulera klick på inloggningsknappen
  fireEvent.click(screen.getByText("Logga in"));
  
  // Vänta på och verifiera att felmeddelandet visas
  await waitFor(() => {
    expect(screen.getByTestId("error-message")).toHaveTextContent("Login failed");
  });
});

// Extra rekommendation - Rensa mockar efter tester
afterEach(() => {
  vi.restoreAllMocks();
});