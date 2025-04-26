import { setupServer } from 'msw/node'

import { handlers } from './handlers.js'

export const server = setupServer(...handlers)

if (process.env.NODE_ENV === 'development') {
  server.listen({
    onUnhandledRequest: 'warn' // eller bypass
  })
}
