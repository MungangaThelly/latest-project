import { useState } from "react"; 

export default function MovieComponent() {
  const [token, setToken] = useState(""); 
  const [movies, setMovies] = useState([]); 
  const [error, setError] = useState(null); 

  const handleLogin = async () => {
    try {
      setError(null); 
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
      
      if (!response.ok) {
        throw new Error("Login failed");
      }
      
      const jwt = await response.text();
      setToken(jwt);
    } catch (err) {
      setError(err.message); 
    }
  };

  
  const fetchMovies = async () => {
    const response = await fetch(
      "https://tokenservice-jwt-2025.fly.dev/movies", 
      {
        headers: { Authorization: `Bearer ${token}` }, 
      }
    );
    const data = await response.json(); 
    setMovies(data); 
  };

  return (
    <div>
      <button onClick={handleLogin}>Logga in</button> 
      <button onClick={fetchMovies}>Hämta filmer</button> 
      
      {error && <div data-testid="error-message">{error}</div>}
      
      
      <ul>
        {movies.map((movie) => (
        <li key={movie.id}>{movie.title}, {movie.description}, {movie.year}</li> 
        ))}
      </ul>
    </div>
  );
}
