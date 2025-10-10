# electrician_capstone

## Overview

This is a full-stack web application for an electrician service business, built with React on the frontend and Express.js on the backend. The application manages electrical services, user authentication with role-based access (admin/client), and service requests. It's designed to handle both standard and emergency electrical services, with features for service browsing, booking, and administrative management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 19.1.1 with React Router DOM for client-side routing
- **Build Tool:** Vite 7.1.7 for fast development and optimized production builds
- **Styling:** Sass for component styling and utility-first CSS
- **Language:** JavaScript (JSX) with ES2020+ features

**Design Decisions:**
- **Vite over Create React App:** Chosen for faster hot module replacement (HMR) and better build performance
- **React Router:** Enables single-page application navigation with multiple views
- **Dual styling approach:** Sass for custom component styles
- **Modern React:** Uses React 17+ features (no need for explicit React imports in JSX)

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with ES Modules
- **Framework:** Express.js 4.18.2 for REST API
- **Database Driver:** MySQL2 with connection pooling
- **Middleware:** CORS for cross-origin requests, express.json() for body parsing

**Design Decisions:**
- **Mock Database Mode:** Includes a USE_MOCK_DB environment flag that allows the application to run without MySQL (useful for Windows/Codespaces development environments). When enabled, database queries return empty arrays instead of real data
- **Connection Pooling:** Uses MySQL connection pools for efficient database connection management (10 concurrent connections, unlimited queue)
- **Socket Path Support:** Configurable MySQL socket path for Unix-based systems
- **Role-Based Access:** User system with 'admin' role for authorization
- **Service Categories:** Services are categorized (reparación, instalación) with emergency service flags

**API Proxy:**
- Vite development server proxies `/api` requests to Express backend on port 3001
- This avoids CORS issues during development while maintaining separation between frontend and backend

### Data Storage

**Database:**
- **Technology:** MySQL 2.3.3+
- **Connection Method:** Pool-based with promise wrapper for async/await support
- **Fallback Mode:** Mock database implementation that returns empty result sets when MySQL is unavailable

**Schema Design:**
- **Users Table:** Stores user credentials (email, password_hash), profile info (nombre), and role-based access control
- **Services Table:** Contains service details (name, description, category), emergency flags (is_emergency), active status (is_active), and timestamps

**Configuration:**
- Database credentials loaded from environment variables (DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_SOCKET)
- Defaults to localhost MySQL with 'electrician_capstone' database
- Graceful error handling with console logging for connection issues

### Authentication & Authorization

**Approach:**
- Password hashing indicated by password_hash field (likely bcrypt based on hash format)
- Role-based access control with 'admin' and 'cliente' roles
- Mock users include admin@electricista.com and cliente@ejemplo.com for testing

**Rationale:**
- Separate roles allow different permission levels for service management vs. service booking
- Hash storage ensures passwords are never stored in plain text

## External Dependencies

### Core Framework Dependencies
- **React & React DOM (19.1.1):** Frontend UI library
- **React Router DOM (7.9.3):** Client-side routing and navigation
- **Vite (7.1.7):** Build tool and development server
- **Express (4.18.2):** Backend web server framework

### Database & Data Layer
- **mysql2 (2.3.3+):** MySQL database driver with promise support
- **No ORM:** Direct SQL queries through mysql2 connection pools

### Styling & UI
- **Sass (1.93.2):** CSS preprocessor for advanced styling features
- **Tailwind CSS (via config):** Utility-first CSS framework
- **PostCSS & Autoprefixer:** CSS processing and vendor prefixing

### Development Tools
- **ESLint (9.36.0):** Code linting with React-specific plugins
  - eslint-plugin-react
  - eslint-plugin-react-hooks  
  - eslint-plugin-react-refresh
- **Nodemon (3.0.2):** Backend auto-restart during development

### Middleware & Utilities
- **CORS (2.8.5):** Cross-origin resource sharing for API access
- **dotenv (16.3.1/17.2.3):** Environment variable management

### Development Environment Considerations
- **GitHub Codespaces Support:** CORS configured for Codespaces URLs
- **Windows Compatibility:** Mock database mode bypasses Unix socket requirements
- **Multi-environment Ready:** Separate configurations for development (port 5000) and backend (port 3001)