import { useState } from "react";

export default function MovieComponent() {
  const [token, setToken] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);  // ✅ Declare success state

  // Hanterar inloggning
  const handleLogin = async () => {
    try {
      setIsLoading(true); 
      setError(null); 
      
      // Skicka inloggningsförfrågan
      const response = await fetch(
        "https://tokenservice-jwt-2025.fly.dev/token-service/v1/request-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: import.meta.env.VITE_LOGIN_USERNAME,
            password: import.meta.env.VITE_LOGIN_PASSWORD,
          }),
        }
      );

      // Kontrollera om inloggningen misslyckades
      if (!response.ok) {
        throw new Error("Inloggning misslyckades: Ogiltiga uppgifter");
      }

      // Spara JWT-token
      const jwt = await response.text();
      setToken(jwt);
      localStorage.setItem('token', jwt); // Spara token för persistence
    
      // Visa popup-meddelande
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);  // Popup disappears after 3 seconds

    } catch (err) {
      setError(err.message); // Visa felmeddelande
    } finally {
      setIsLoading(false); // Stäng av laddningsindikator
    }
  };

  // Hämtar filmer från API:et
  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Kontrollera om användaren är inloggad
      if (!token) {
        throw new Error("Var vänlig logga in först");
      }

      // Skicka begäran om filmer
      const response = await fetch(
        "https://tokenservice-jwt-2025.fly.dev/movies",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Specifik hantering av 401-fel (Obehörig)
      if (response.status === 401) {
        throw new Error("Obehörig: Ogiltig eller utgången token. Var vänlig logga in igen.");
      }

      // Allmän felhantering
      if (!response.ok) {
        throw new Error("Kunde inte hämta filmer");
      }

      // Spara filmerna i tillståndet
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError(err.message); // Visa felmeddelande
    } finally {
      setIsLoading(false); // Stäng av laddningsindikator
    }
  };

  return (
    <div>
      {/* Inloggningsknapp med laddningsindikator */}
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Loggar in..." : "Logga in"}
      </button>
      
      {/* Knapp för att hämta filmer - inaktiverad om ingen token finns */}
      <button onClick={fetchMovies} disabled={!token || isLoading}>
        {isLoading ? "Laddar..." : "Hämta filmer"}
      </button>

      {/* Visar felmeddelande med tydlig styling */}
      {error && (
        <div 
          data-testid="error-message"
          style={{
            color: "red",
            margin: "10px 0",
            padding: "10px",
            border: "1px solid red",
            borderRadius: "4px"
          }}
        >
          {error}
        </div>
      )}

      {/* Success message pop-up */}
      {showSuccess && (
        <div style={{ 
          color: "green", 
          marginTop: "10px", 
          padding: "10px", 
          border: "1px solid green", 
          borderRadius: "4px" 
        }}>
          Inloggning lyckades, näst hämta filmer!
        </div>
      )}

      {/* Lista över filmer */}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong>, {movie.description}, {movie.year}
          </li>
        ))}
      </ul>
    </div>
  );
}
