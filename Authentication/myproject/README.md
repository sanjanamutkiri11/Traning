# MFA Authentication System

A full-stack authentication system with Multi-Factor Authentication (MFA) built with Go backend and React frontend.

## Features

- ✅ User Registration with password hashing (bcrypt)
- ✅ User Login with password verification
- ✅ Multi-Factor Authentication (MFA) with 4-digit OTP
- ✅ Clean and modern UI
- ✅ PostgreSQL database for persistent user storage
- ✅ Protected routes with authentication

## Project Structure

```
myproject/
├── backend/
│   ├── main.go          # Go backend server
│   └── go.mod           # Go dependencies
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/   # API service
│   │   └── App.jsx      # Main app component
│   ├── package.json     # Node dependencies
│   └── vite.config.js   # Vite configuration
└── README.md
```

## Prerequisites

- Go 1.21 or higher
- Node.js 16 or higher
- npm or yarn
- PostgreSQL 12 or higher

## Setup Instructions

### Database Setup

1. Install and start PostgreSQL on your system

2. Create a database for the application:
```sql
CREATE DATABASE mfa_auth;
```

3. (Optional) The application will automatically create the `users` table on first run. 
   Alternatively, you can run the schema manually:
```bash
psql -U postgres -d mfa_auth -f backend/schema.sql
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Go dependencies:
```bash
go mod download
```

3. (Optional) Set environment variables for database connection:
```bash
export DB_HOST=localhost
export DB_PORT=5432
export DB_USER=postgres
export DB_PASSWORD=your_password
export DB_NAME=mfa_auth
```

   Or create a `.env` file in the backend directory (see `.env.example`)

4. Run the backend server:
```bash
go run main.go database.go
```

The backend will start on `http://localhost:8080` and automatically connect to PostgreSQL.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### POST /api/register
Register a new user.

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

### POST /api/login
Login with username and password. Returns OTP for MFA.

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password verified. Please enter OTP",
  "otp": "1234"
}
```

**Note:** The OTP is shown in a browser alert popup (4-digit code).

### POST /api/verify-otp
Verify the OTP to complete login.

**Request Body:**
```json
{
  "username": "john_doe",
  "otp": "1234"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login Successful"
}
```

## Usage Flow

1. **Register**: Create a new account with username and password (stored in PostgreSQL)
2. **Login**: Enter your credentials (verified against database)
3. **MFA**: After successful password verification, a 4-digit OTP is generated
   - The OTP is displayed in a browser alert popup
   - Enter the OTP in the frontend
4. **Success**: Upon OTP verification, login is complete and you're redirected to dashboard

## Security Features

- Passwords are hashed using bcrypt with default cost
- OTP expires after 5 minutes
- CORS enabled for frontend-backend communication
- Input validation on both frontend and backend

## Technologies Used

### Backend
- Go (Golang)
- Gorilla Mux (HTTP router)
- bcrypt (Password hashing)
- Gorilla Handlers (CORS)
- PostgreSQL (Database)
- lib/pq (PostgreSQL driver)

### Frontend
- React 18
- React Router DOM
- Axios (HTTP client)
- Vite (Build tool)

## Database Schema

The `users` table structure:
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Notes

- User data is stored in PostgreSQL database (persistent)
- OTP is stored temporarily in memory (expires after 5 minutes)
- OTP is shown in browser alert for development purposes
- In production, OTP should be sent via SMS/Email service
- For production use, consider:
  - JWT tokens for session management
  - Rate limiting
  - HTTPS
  - Environment variables for configuration (already implemented)
  - Database connection pooling
  - Prepared statements for better security
