# Service Specification: GET /api/services

## Requirements

### Requirement: R1 - Database Query
The `GET /api/services` endpoint **MUST** query the `services` table in MySQL using the pool exported from `database.js`, instead of using in-memory mock data.

### Requirement: R2 - Active Services Filter
The endpoint **MUST** filter and return only services where `is_active = true`.

### Requirement: R3 - JSON Response Format
The response **MUST** be a JSON array of objects with the following properties:
- `id` (number)
- `name` (string)
- `description` (string)
- `category` (string)
- `is_active` (boolean)
- `created_at` (string/ISO date)

### Requirement: R4 - Error Handling
If the database query fails, the endpoint **MUST** respond with status 500 and a JSON body `{ "error": "Error obteniendo servicios" }`.

### Requirement: R5 - Unit Test Coverage
There **MUST** exist at least one unit test that verifies the logic of the `GET /api/services` handler in isolation (without starting the HTTP server).

### Requirement: R6 - Integration Test Coverage
There **MUST** exist at least one integration test that:
- Starts the HTTP server
- Makes a `GET /api/services` request
- Verifies status 200 and that the response is a non-empty array
- Verifies that all returned services have `is_active === true`

### Requirement: R7 - Vitest Backend Configuration
The project **MUST** have Vitest configuration that enables running backend tests with:
- `npm test` or `npx vitest run` as the test runner command
- ES modules support (`type: "module"` in package.json)
- Mock DB mode activatable via environment variable

## Scenarios

### Scenario: Active Services Available
- **Given** the `services` table has 3 active services and 2 inactive
- **When** a `GET /api/services` request is made
- **Then** exactly 3 services are returned
- **And** all have `is_active === true`

### Scenario: Empty Services Table
- **Given** the `services` table is empty
- **When** a `GET /api/services` request is made
- **Then** status 200 is returned with an empty array `[]`

### Scenario: Database Error
- **Given** the database connection fails
- **When** a `GET /api/services` request is made
- **Then** status 500 is returned with `{ "error": "Error obteniendo servicios" }`

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```
