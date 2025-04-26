import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';

import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';
import { resetMovieData } from '../mocks/handlers';

const server = setupServer(...handlers);

let authToken = '';

beforeAll(async () => {
  server.listen({ onUnhandledRequest: 'error' });

  const response = await fetch(
    'https://tokenservice-jwt-2025.fly.dev/token-service/v1/request-token',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: import.meta.env.VITE_LOGIN_USERNAME,
        password: import.meta.env.VITE_LOGIN_PASSWORD
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Misslyckades med att hämta auth-token inför tester');
  }

  const data = await response.json();
  authToken = data.token;
});

afterEach(() => {
  server.resetHandlers();
  resetMovieData();
});

afterAll(() => server.close());

describe('Movies API', () => {
  describe('Movie Operations', () => {
    test('GET /movies returnerar en lista med filmer', async () => {
      const response = await fetch(
        'https://tokenservice-jwt-2025.fly.dev/movies',
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    test('GET /movies/{id} returnerar en specifik film', async () => {
      const response = await fetch(
        'https://tokenservice-jwt-2025.fly.dev/movies/1',
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('id', 1);
    });

    test('POST + DELETE movie workflow', async () => {
      // Skapar ny film
      const postResponse = await fetch(
        'https://tokenservice-jwt-2025.fly.dev/movies',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            title: 'New Movie',
            description: 'New Description'
          }),
        }
      );

      expect(postResponse.status).toBe(201);
      const newMovie = await postResponse.json();

      // Raderar samma film
      const deleteResponse = await fetch(
        `https://tokenservice-jwt-2025.fly.dev/movies/${newMovie.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      expect(deleteResponse.status).toBe(204);
    });

    test('PUT uppdaterar en film korrekt', async () => {
      const updates = { title: 'Updated Title' };
      const response = await fetch(
        'https://tokenservice-jwt-2025.fly.dev/movies/1',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(updates),
        }
      );

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.title).toBe(updates.title);
    });
  });

  describe('Validation Tests', () => {
    test('POST avvisar ogiltig filmdata', async () => {
      const response = await fetch(
        'https://tokenservice-jwt-2025.fly.dev/movies',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({}), 
        }
      );

      expect(response.status).toBe(400);
      const error = await response.json();
      expect(error).toHaveProperty('error');
    });
  });
});
