import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

worker.events.on('request:match', ({ request }) => {
    console.log('MSW intercepted:', request.method, request.url)
  })