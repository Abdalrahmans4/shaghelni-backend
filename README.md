# 💼 Shaghelni Backend (Express + PostgreSQL)

This is the **backend API** for the Shaghelni application. Freelancers can add, edit, delete, and view profiles without requiring login. The backend is built using Express.js and PostgreSQL.

---

## 🛠️ Tech Stack

- Node.js + Express
- PostgreSQL (via `pg`)
- CORS
- dotenv

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm init
npm install express
npm install cors
npm install dotenv
```

## Project Structure
shaghelni-backend/
```
├── routes/
│├──freelancers.js   # endpoints for freelancers
├
├── db.js        #pg client          
├── server.js    #app entery   
├── .env         # port num      
└── package.json
```
## API Endpoints
The API will run on http://localhost:5000

## Freelancers Routes
**Base URL**:/api/freelancers

| Method            | Endpoints| Description |
| :---------------- | :------:   | ----: |
| GET               |   /        | Get all freelancers |
| GET               |   /:id     | Get a single freelancer by ID|
|
| POST              |  /         | Create a new freelancer |
| PUT               |  /:id      | 	Update a freelancer by ID |
| DELETE            |  /:id      | 	Delete a freelancer by ID|

#### GET/api/freelacers/
```json
RESPONSE
{
  "message": "Freelancer Retrieved succesfully"
}
```

#### POST/api/freelacers
```json
{
  "name": "Sara Ahmad",
  "email": "sara@example.com",
  "phone": "0791234567",
  "job_title": "Web Designer",
  "skills": "Figma, HTML, CSS",
  "projects": "Portfolio site, NGO platform",
  "location": "Amman",
  "experience": "2 years",
  "bio": "Creative designer focused on clean and modern design.",
  "portfolio": "https://behance.net/sara",
  "availability": "Fulltime"
}
```
#### GET/api/freelacers/1
```json
RESPONSE
{
  "name": "Sara Ahmad",
  "email": "sara@example.com",
  "phone": "0791234567",
  "job_title": "Web Designer",
  "skills": "Figma, HTML, CSS",
  "projects": "Portfolio site, NGO platform",
  "location": "Amman",
  "experience": "2 years",
  "bio": "Creative designer focused on clean and modern design.",
  "portfolio": "https://behance.net/sara",
  "availability": "Fulltime"
}
```


#### PUT/api/freelacers/:id
```json
{
  "name": "Sara Ahmad",
  "email": "sara@example.com",
  "phone": "0791234567",
  "job_title": "Senior Web Designer",
  "skills": "Figma, HTML, CSS, JS",
  "projects": "Full redesign for Company X",
  "location": "Amman",
  "experience": "3 years",
  "bio": "I specialize in UX/UI design with clean layouts.",
  "portfolio": "https://behance.net/sara",
  "availability": "PartTime"
}
```
#### DELETE/api/freelacers/1
```json
RESPONSE
{
  "message": "Freelancer DELETED succesfully"
}
```

## 🗃️ Database Setup

To create the PostgreSQL database and table manually, run:

```sql
CREATE DATABASE shaghelni_db;
\c shaghelni_db

CREATE TABLE freelancers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  job_title VARCHAR(100),
  skills TEXT,
  projects TEXT,
  location VARCHAR(100),
  experience VARCHAR(50),
  bio TEXT,
  portfolio TEXT,
  availability VARCHAR(50)
);

