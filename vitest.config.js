// Use mock DB for all backend tests (no MySQL required)
// eslint-disable-next-line no-undef
process.env.USE_MOCK_DB = '1';
// eslint-disable-next-line no-undef
process.env.NODE_ENV = 'test';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['backend/test/**/*.test.{js,ts}'],
    testTimeout: 10000,
    hookTimeout: 10000,
    singleThread: true,
  },
});
