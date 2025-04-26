import '@testing-library/jest-dom/vitest'; 
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll, vi } from 'vitest';

import { server } from './mocks/server';

// Startar MSW-servern innan några tester körs
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Återställer MSW-handlers och städar upp efter varje test
afterEach(() => {
  server.resetHandlers(); // Återställ ändrade mock-handlers
  cleanup(); // Avmonterar komponenter och rensar DOM:en
});

// Stänger ner MSW-servern efter alla tester har kört
afterAll(() => server.close());

// Global mock för fetch (används om du inte alltid använder MSW)
global.fetch = vi.fn();
