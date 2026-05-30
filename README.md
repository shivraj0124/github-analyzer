# GitHub Profile Analyzer API

## Overview

GitHub Profile Analyzer API is a backend service built using **Node.js**, **Express.js**, and **MySQL**. It fetches public GitHub profile data using the GitHub REST API, analyzes useful insights, stores them in a MySQL database, and provides APIs to retrieve analyzed profiles.

---

## Features

### Required Features

- Fetch GitHub profile data using username
- Store analyzed profile data in MySQL
- Retrieve all analyzed profiles
- Retrieve a single analyzed profile

### Additional Features

- Total Stars Count across all repositories
- Total Forks Count across all repositories
- Most Starred Repository Analysis
- Duplicate Profile Handling using Upsert (`ON DUPLICATE KEY UPDATE`)
- Layered Architecture (Routes → Controllers → Services)
- MySQL Connection Pooling
- Centralized Error Handling
- Railway Deployment Ready

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API
- Axios
- mysql2
- dotenv
- cors

---

## Project Structure

```text
github-profile-analyzer/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── githubController.js
│
├── routes/
│   └── githubRoutes.js
│
├── services/
│   └── githubService.js
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

## Database Schema

```sql
CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    github_id BIGINT UNIQUE,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    public_repos INT,
    followers INT,
    following INT,
    total_stars INT,
    total_forks INT,
    most_starred_repo VARCHAR(255),
    profile_url VARCHAR(500),
    avatar_url VARCHAR(500),
    account_created_at DATETIME,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/shivraj0124/github-profile-analyzer.git

cd github-profile-analyzer
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

### Local MySQL

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer
```

### Railway MySQL

```env
MYSQL_URL=your_railway_mysql_url
```

---

## Running the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

Server starts on:

```text
http://localhost:5000
```

---

## API Endpoints

### 1. Analyze GitHub Profile

Fetches profile data from GitHub, analyzes it, and stores it in MySQL.

**Endpoint**

```http
POST /api/github/analyze/:username
```

**Example**

```http
POST /api/github/analyze/shivraj0124
```

**Response**

```json
{
  "success": true,
  "data": {
    "id": 2,
    "github_id": 120171741,
    "username": "shivraj0124",
    "name": "Shivraj Kolwankar",
    "bio": "Software Developer",
    "public_repos": 57,
    "followers": 32,
    "following": 30,
    "total_stars": 5,
    "total_forks": 10,
    "most_starred_repo": "E-commerce",
    "profile_url": "https://github.com/shivraj0124",
    "avatar_url": "https://avatars.githubusercontent.com/u/120171741?v=4",
    "account_created_at": "2022-12-09T14:33:12.000Z",
    "analyzed_at": "2026-05-30T10:32:13.000Z"
  }
}
```

---

### 2. Get All Analyzed Profiles

Returns all profiles stored in the database.

**Endpoint**

```http
GET /api/github/profiles
```

---

### 3. Get Single Profile

Returns details of a specific analyzed profile.

**Endpoint**

```http
GET /api/github/profiles/:username
```

**Example**

```http
GET /api/github/profiles/shivraj0124
```

---

## Postman Testing

### Analyze Profile

```http
POST http://localhost:5000/api/github/analyze/shivraj0124
```

### Get All Profiles

```http
GET http://localhost:5000/api/github/profiles
```

### Get Single Profile

```http
GET http://localhost:5000/api/github/profiles/shivraj0124
```

---

## Tech / Features Added Beyond Requirements

- Total Stars Analysis
- Total Forks Analysis
- Most Starred Repository Detection
- Duplicate Record Prevention
- Modular Folder Structure
- Connection Pooling for MySQL
- RESTful API Design
- Error Handling & Validation
- Railway Deployment Support

---

## Deployment

### Backend

Railway

### Database

Railway MySQL

---

## Live API

```text
https://your-railway-app.up.railway.app
```

---

## Future Enhancements

- Top Programming Language Analysis
- Repository Activity Insights
- Swagger API Documentation
- Pagination & Filtering
- Response Caching
- GitHub Contribution Statistics

---

## Author

**Shivraj Kolwankar**

Information Technology Student | Full Stack Developer

GitHub: https://github.com/shivraj0124
