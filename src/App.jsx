import './App.css'
import React, { useState } from 'react';
import Counter from "./components/Counter.jsx";
import Login from './components/Login.jsx';
import MovieList from './components/MovieComponent.jsx'
import AddMovieForm from './components/AddMovieForm.jsx';

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
    <h1>Agile-jwt-mocks-project</h1>
      <section>
        <h1>counter</h1>
      count is <Counter />
      </section>

      <Login onLogin={setToken} />
      <MovieList />
      <AddMovieForm token={token} />
    </>
  )
}

export default App