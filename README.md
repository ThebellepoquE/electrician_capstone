# Electrician Capstone Project

Full-stack web app for a self-employed electrician . Built with React, Vite and Express. 
Featuring a responsive design, dynamic service management and admin dashboard.

## Features

- **Modern React SPA**: Fast, responsive single-page app built whith React 19 and Vite.
- **Dynamic Service Management**: CRUD operations for electrical services via REST API.
- **Admin Dashboard**: Secure admin panel for managing services and content.
- **Authentication System**: Login/logout functionality with protected routes.
- **Responsive Design**: Mobile-first approach with consistent breakpoints (480px, 768px, 1024px).
- **Smooth Navigation**: Scroll animation and section anchoring with navbar offset.
- **Database Integration**: MySQL backend for persistent data storage.
- **Professional UI**: Clean, accessible design with SCSS styling and custom components.

## Tech Stack

### Frontend

- **React 19** - UI library
- **React Router DOM v7** - Client-side routing
- **Vite** - Build tool and dev server
- **SCSS/Sass** - Styling with mixins

### Backend

- **Node.js** - Runtime enviroment
- **Express.js** - REST API server
- **MySQL2** - Database driver
- **CORS** - Cross-origin resource sharing
- **dotenv** - Enviroment variable management

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Setup

1. **Clone the repository**

git clone https://github.com/ThebellepoquE/electrician_capstone.git
cd electrician_capstone

2. Install dependencies

npm install

3. Configure de database
Create a .env file in the root directory:

DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=electrician_db
PORT=3001

4. Setup the database

mysql -u your_user -p electrician_db < database.sql
sudo mysql -u root   | then ask for your_password

**Usage**
Development Mode

1. Start the backend server

cd backend
node server.js

Server runs on http://localhost:3001

2. Start the frontend dev server (in a new terminal)

npm run dev

App runs on http://localhost:5000

**Production Build**
npm run build
npm run preview

**Design System** 
Color palette

- Primary: #212c3f (Dark Blue)
- Accent: #ffcc00
- Dark: #0b1220 (Text)
- Surface: #ffffff (White)
- Off-white: #f7f9fc

**Responsive Breakpoints**

- Mobile: 480px
- Tablet: 768px
- Desktop: 1024px
- Wide: 1200px

**Authentication**
The app includes a simple authenticantion system:

- Login page at /auth
- Protected admin routes with **ProtectedRoute** component
- Session management via **LocalStorage**

**API Endpoints**

**Method**	        **Endpoint**	            **Description**

GET	                /api/services	            Get all services
POST	            /api/services	            Create a new service
PUT	                /api/services/:id	        Update a service
DELETE	            /api/services/:id	        Delete a service
POST	            /api/login	                User authentication

**Routes**

- /         - Home page with hero, about, services and contact sections
- /about-us - About page
- /services - Services page
- /contact  - Contact page
- /auth     - Login page
- /admin    - Admin dashboard (protected)

**License**

This project is created for educational purposes.

**Author**
ThebellepoquE 

- Github: @ThebellepoquE