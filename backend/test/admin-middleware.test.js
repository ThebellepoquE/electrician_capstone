import { describe, it, expect } from "vitest";
import request from "supertest";
import { vi } from "vitest";

// Mock bcrypt before importing server.js
vi.mock("bcrypt", () => ({
	default: {
		compare: async () => true,
		hash: async (pw) => "mock_hash_" + pw,
	},
}));

// Set mock DB mode BEFORE importing server/database
process.env.USE_MOCK_DB = "1";

import { app } from "../server.js";

const adminToken = "Bearer mock_jwt_token_1";
const clienteToken = "Bearer mock_jwt_token_2";

describe("Admin role middleware", () => {
	describe("POST /api/services", () => {
		it("returns 401 when no Authorization header is provided", async () => {
			const res = await request(app)
				.post("/api/services")
				.send({ name: "Test", description: "Test", category: "test" });
			expect(res.status).toBe(401);
			expect(res.body.error).toBe("Unauthorized");
		});

		it("returns 401 when token format is invalid", async () => {
			const res = await request(app)
				.post("/api/services")
				.set("Authorization", "invalid_token")
				.send({ name: "Test", description: "Test", category: "test" });
			expect(res.status).toBe(401);
		});

		it("returns 403 when cliente token is used", async () => {
			const res = await request(app)
				.post("/api/services")
				.set("Authorization", clienteToken)
				.send({ name: "Test", description: "Test", category: "test" });
			expect(res.status).toBe(403);
			expect(res.body.error).toContain("Forbidden");
		});

		it("returns 200 when admin token is used with valid data", async () => {
			const res = await request(app)
				.post("/api/services")
				.set("Authorization", adminToken)
				.send({ name: "Test Service", description: "Test", category: "test" });
			expect(res.status).toBe(200);
		});
	});

	describe("PUT /api/services/:id", () => {
		it("returns 401 when no Authorization header is provided", async () => {
			const res = await request(app)
				.put("/api/services/1")
				.send({ name: "Updated" });
			expect(res.status).toBe(401);
		});

		it("returns 403 when cliente token is used", async () => {
			const res = await request(app)
				.put("/api/services/1")
				.set("Authorization", clienteToken)
				.send({ name: "Updated" });
			expect(res.status).toBe(403);
		});

		it("returns 200 when admin token is used", async () => {
			const res = await request(app)
				.put("/api/services/1")
				.set("Authorization", adminToken)
				.send({ name: "Updated Name" });
			expect(res.status).toBe(200);
		});
	});

	describe("DELETE /api/services/:id", () => {
		it("returns 401 when no Authorization header is provided", async () => {
			const res = await request(app).delete("/api/services/1");
			expect(res.status).toBe(401);
		});

		it("returns 403 when cliente token is used", async () => {
			const res = await request(app)
				.delete("/api/services/1")
				.set("Authorization", clienteToken);
			expect(res.status).toBe(403);
		});

		it("returns 200 when admin token is used", async () => {
			const res = await request(app)
				.delete("/api/services/1")
				.set("Authorization", adminToken);
			expect(res.status).toBe(200);
		});
	});

	describe("GET /api/services remains public", () => {
		it("returns 200 without any Authorization header", async () => {
			const res = await request(app).get("/api/services");
			expect(res.status).toBe(200);
			expect(Array.isArray(res.body)).toBe(true);
		});
	});

	describe("Auth endpoints remain public", () => {
		it("POST /api/auth/login works without admin token", async () => {
			const res = await request(app)
				.post("/api/auth/login")
				.send({ email: "admin@electricista.com", password: "anything" });
			expect(res.status).toBe(200);
		});
	});
});
