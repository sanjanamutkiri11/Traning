# MFA Authentication System

A full-stack authentication system with Multi-Factor Authentication (MFA) built with Go backend and React frontend.


### Database Setup

1. Install and start PostgreSQL on your system

2. Create a database for the application:
```sql
CREATE DATABASE mfa_auth;
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

3 Run the backend server:
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

