import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

// Set mock DB mode BEFORE importing server/database
process.env.USE_MOCK_DB = '1';

// Import app for integration tests
import { app } from '../server.js';

// Import the function to test in unit tests
import { getActiveServices } from '../services.js';

describe('Unit: getActiveServices()', () => {
  it('should return an array of services', async () => {
    const services = await getActiveServices();
    expect(Array.isArray(services)).toBe(true);
  });

  it('should return only active services (is_active === true)', async () => {
    const services = await getActiveServices();
    services.forEach((s) => {
      expect(s.is_active).toBe(true);
    });
  });

  it('should return services with correct structure', async () => {
    const services = await getActiveServices();
    if (services.length > 0) {
      const service = services[0];
      expect(service).toHaveProperty('id');
      expect(service).toHaveProperty('name');
      expect(service).toHaveProperty('description');
      expect(service).toHaveProperty('category');
      expect(service).toHaveProperty('is_active');
      expect(service).toHaveProperty('created_at');
    }
  });
});

describe('Integration: GET /api/services', () => {
  it('should respond with status 200', async () => {
    const res = await request(app).get('/api/services');
    expect(res.status).toBe(200);
  });

  it('should return a non-empty array of services', async () => {
    const res = await request(app).get('/api/services');
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return only active services', async () => {
    const res = await request(app).get('/api/services');
    res.body.forEach((service) => {
      expect(service.is_active).toBe(true);
    });
  });

  it('should return services with correct structure', async () => {
    const res = await request(app).get('/api/services');
    const service = res.body[0];
    expect(service).toHaveProperty('id');
    expect(service).toHaveProperty('name');
    expect(service).toHaveProperty('description');
    expect(service).toHaveProperty('category');
    expect(service).toHaveProperty('is_active');
    expect(service).toHaveProperty('created_at');
  });
});
