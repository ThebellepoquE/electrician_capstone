# Electrician Capstone Project

Full-stack web app for a self-employed electrician. Built with React, Vite and Express.
Featuring a responsive design, dynamic service management and admin dashboard.

## Features

- **Modern React SPA**: Fast, responsive single-page app built with React 19 and Vite.
- **Dynamic Service Management**: CRUD operations for electrical services via REST API.
- **Admin Dashboard**: Secure admin panel for managing services (role-based access required).
- **Authentication System**: Login/register with bcrypt password hashing and role-based access control.
- **Responsive Design**: Mobile-first approach with consistent breakpoints (480px, 768px, 1024px).
- **Smooth Navigation**: Scroll animation and section anchoring with navbar offset.
- **Database Integration**: MySQL backend for persistent data storage.
- **Professional UI**: Clean, accessible design with SCSS styling and custom components.
- **Input Validation**: Zod schemas for all API endpoints.
- **Rate Limiting**: Protected auth and contact endpoints against brute-force abuse.

## Tech Stack

### Frontend

- **React 19** — UI library
- **React Router DOM v7** — Client-side routing
- **Vite 7** — Build tool and dev server
- **SCSS/Sass** — Styling with mixins
- **Vitest 4** — Frontend test runner

### Backend

- **Node.js** — Runtime environment
- **Express.js 4** — REST API server
- **MySQL2 3** — Database driver
- **bcrypt** — Password hashing
- **express-rate-limit** — Rate limiting for auth/contact endpoints
- **zod 4** — Request validation schemas
- **cors** — Cross-origin resource sharing
- **dotenv** — Environment variable management

### Testing

- **Vitest** — Test runner (frontend + backend)
- **supertest** — HTTP integration testing

## Installation

### Prerequisites

- Node.js (v20 or higher)
- MySQL (v8 or higher)
- pnpm (v10 or higher)

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/ThebellepoquE/electrician_capstone.git
cd electrician_capstone
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure the database**

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=electrician_db
PORT=3001
```

4. **Setup the database**

```bash
mysql -u your_user -p electrician_db < database.sql
```

## Usage

### Development Mode

1. Start the backend server:

```bash
cd backend
node server.js
```

Server runs on `http://localhost:3001`

2. Start the frontend dev server (in a new terminal):

```bash
pnpm dev
```

App runs on `http://localhost:5000`

### Production Build

```bash
pnpm run build
pnpm preview
```

### Running Tests

```bash
pnpm exec vitest run
```

## Design System

### Color palette

| Token     | Value      | Usage             |
|-----------|------------|-------------------|
| Primary   | `#212c3f`  | Dark Blue         |
| Accent    | `#ffcc00`  | Yellow accent     |
| Dark      | `#0b1220`  | Text              |
| Surface   | `#ffffff`  | White backgrounds |
| Off-white | `#f7f9fc`  | Subtle backgrounds|

### Responsive Breakpoints

| Breakpoint | Width  |
|------------|--------|
| Mobile     | 480px  |
| Tablet     | 768px  |
| Desktop    | 1024px |
| Wide       | 1200px |

## Authentication

The app uses a role-based authentication system:

- **Login**: `POST /api/auth/login` — returns a mock JWT token with user data including role
- **Register**: `POST /api/auth/register` — creates a new user with `role: 'cliente'` by default
- **Password hashing**: All passwords are hashed with bcrypt (salt rounds: 10)
- **Rate limiting**: Auth endpoints are rate-limited (5 requests per 15 minutes)

### Roles

| Role       | Access                                    |
|------------|-------------------------------------------|
| `admin`    | Full CRUD access to services + admin UI   |
| `cliente`  | Read-only access to services              |

### Admin Middleware

Protected endpoints (`POST`, `PUT`, `DELETE` `/api/services`) require:
- `Authorization: Bearer mock_jwt_token_<userId>` header
- The user must have `role: 'admin'`
- Returns `401 Unauthorized` if no/invalid token
- Returns `403 Forbidden` if token is valid but user is not admin

### Default Credentials

| Email                     | Password   | Role      |
|---------------------------|------------|-----------|
| `admin@electricista.com`  | `admin123` | admin     |
| `cliente@ejemplo.com`     | `cliente123` | cliente |

## API Endpoints

### Services

| Method   | Endpoint             | Auth Required | Description          |
|----------|----------------------|---------------|----------------------|
| `GET`    | `/api/services`      | No            | Get all active services |
| `POST`   | `/api/services`      | Admin         | Create a new service    |
| `PUT`    | `/api/services/:id`  | Admin         | Update a service        |
| `DELETE` | `/api/services/:id`  | Admin         | Soft-delete a service   |

### Authentication

| Method | Endpoint              | Auth Required | Description   |
|--------|-----------------------|---------------|---------------|
| `POST` | `/api/auth/login`     | No            | User login    |
| `POST` | `/api/auth/register`  | No            | User signup   |

### Contact

| Method | Endpoint       | Auth Required | Description      |
|--------|----------------|---------------|------------------|
| `POST` | `/api/contact` | No            | Submit a message |

### Example: Creating a Service (Admin Only)

```bash
curl -X POST http://localhost:3001/api/services \
  -H "Authorization: Bearer mock_jwt_token_1" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Service","description":"A test","category":"test"}'
```

## Routes

| Route       | Description                          | Access       |
|-------------|--------------------------------------|--------------|
| `/`         | Home (hero, about, services, contact)| Public       |
| `/about-us` | About page                           | Public       |
| `/services` | Services catalog                     | Public       |
| `/contact`  | Contact page                         | Public       |
| `/auth`     | Login/register page                  | Public       |
| `/admin`    | Admin dashboard                      | Admin only   |

## Project Structure

```
electrician_capstone/
├── backend/
│   ├── server.js           # Express server + routes + middleware
│   ├── services.js         # Service data access layer
│   ├── database.js         # MySQL connection + schema
│   ├── validation.js       # Zod validation schemas
│   └── test/               # Backend tests
├── src/
│   ├── components/         # Shared React components
│   ├── pages/              # Route page components
│   ├── styles/             # SCSS stylesheets
│   └── config/             # App configuration
├── openspec/               # SDD artifacts (specs, changes, designs)
├── public/                 # Static assets
├── package.json            # Root workspace config
└── pnpm-workspace.yaml     # pnpm workspace definition
```

## License

This project is created for educational purposes and as a capstone for learning full-stack development.

## Author

**ThebellepoquE**

- GitHub: [@ThebellepoquE](https://github.com/ThebellepoquE)
