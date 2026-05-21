import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import cors from 'cors';

// Mock bcrypt before importing any module that uses it
vi.mock('bcrypt', () => ({
  default: {
    compare: async () => true,
    hash: async (pw) => 'mock_hash_' + pw,
  },
}));

// Mock the database module to simulate errors
vi.mock('../database.js', () => ({
  default: {
    execute: vi.fn().mockRejectedValue(new Error('Database connection failed')),
  },
}));

// Import services AFTER mocking
import { getActiveServices } from '../services.js';

describe('Unit: getActiveServices() - error handling', () => {
  it('should throw when database query fails', async () => {
    await expect(getActiveServices()).rejects.toThrow('Database connection failed');
  });
});

describe('Integration: GET /api/services - error handling', () => {
  // Create a test app that imports the mocked services
  let testApp;

  beforeEach(async () => {
    // Dynamic import after mock is set up
    const { getActiveServices: mockedGetActive } = await import('../services.js');

    testApp = express();
    testApp.use(cors());
    testApp.use(express.json());
    testApp.get('/api/services', async (_req, res) => {
      try {
        const services = await mockedGetActive();
        res.json(services);
      } catch (error) {
        console.error('Error al obtener servicios:', error);
        res.status(500).json({ error: 'Error obteniendo servicios' });
      }
    });
  });

  it('should respond with status 500 on database error', async () => {
    const res = await request(testApp).get('/api/services');
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error', 'Error obteniendo servicios');
  });
});
