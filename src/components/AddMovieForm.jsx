import React, { useState } from 'react';

export default function AddMovieForm({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    const res = await fetch('https://tokenservice-jwt-2025.fly.dev/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, description, year: Number(year) })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Film tillagd!');
      setTitle('');
      setDescription('');
      setYear('');
    } else {
      setMessage(`❌ Fel: ${data.details?.join(', ') || data.error}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>➕ Lägg till film</h2>
      {message && <p>{message}</p>}
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titel" required />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Beskrivning" required />
      <input value={year} onChange={e => setYear(e.target.value)} placeholder="År (valfritt)" type="number" />
      <button type="submit">Lägg till</button>
    </form>
  );
}
