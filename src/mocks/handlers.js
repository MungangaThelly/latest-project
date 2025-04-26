import { http, HttpResponse } from 'msw';

let movies = [
  { id: 1, title: 'Inception', description: 'A mind-bending heist movie', year: 2010 }
];
let nextId = 2;

export const handlers = [
  // === AUTH ENDPOINTS ===

  http.post('https://tokenservice-jwt-2025.fly.dev/token-service/v1/request-token', async ({ request }) => {
    const { username, password } = await request.json();

    // Enkel validering för test
    if (username === 'xmas' && password === 'xmaspass') {
      return HttpResponse.json(
        { token: 'mock-jwt-token' },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  // === MOVIE ENDPOINTS ===

  http.get('https://tokenservice-jwt-2025.fly.dev/movies', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Authorization header missing or invalid' },
        { status: 401 }
      );
    }

    return HttpResponse.json(movies);
  }),

  http.get('https://tokenservice-jwt-2025.fly.dev/movies/:id', ({ params, request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const movie = movies.find(m => m.id === Number(params.id));
    if (!movie) {
      return HttpResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(movie);
  }),

  http.post('https://tokenservice-jwt-2025.fly.dev/movies', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const errors = [];
    if (!body.title) errors.push('Title is required');
    if (!body.description) errors.push('Description is required');
    if (body.year && (typeof body.year !== 'number' || body.year < 1888)) {
      errors.push('Year must be a number after 1888');
    }

    if (errors.length > 0) {
      return HttpResponse.json(
        { 
          error: 'Validation failed',
          details: errors 
        },
        { status: 400 }
      );
    }

    const newMovie = { 
      id: nextId++,
      title: body.title,
      description: body.description,
      year: body.year || null
    };
    movies.push(newMovie);

    return HttpResponse.json(newMovie, { status: 201 });
  }),

  http.put('https://tokenservice-jwt-2025.fly.dev/movies/:id', async ({ params, request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const movieIndex = movies.findIndex(m => m.id === Number(params.id));

    if (movieIndex === -1) {
      return HttpResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }

    const updatedMovie = { 
      ...movies[movieIndex], 
      ...data,
      id: Number(params.id) 
    };
    movies[movieIndex] = updatedMovie;

    return HttpResponse.json(updatedMovie);
  }),

  http.delete('https://tokenservice-jwt-2025.fly.dev/movies/:id', ({ params, request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const initialLength = movies.length;
    movies = movies.filter(m => m.id !== Number(params.id));

    if (movies.length === initialLength) {
      return HttpResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }

    return new HttpResponse(null, { status: 204 });
  }),
];

export function resetMovieData() {
  movies = [
    { id: 1, title: 'Inception', description: 'A mind-bending heist movie', year: 2010 }
  ];
  nextId = 2;
}
