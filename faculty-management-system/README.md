# Faculty Management System

NestJS REST API for creating faculty records in PostgreSQL with TypeORM.

## Setup

1. Create the PostgreSQL database `faculty_management_db`.
2. Copy `.env.example` to `.env` and set your PostgreSQL connection details.
3. Install dependencies and start the API:

```bash
npm install
npm run start:dev
```

`DB_SYNCHRONIZE=true` creates and updates the `faculties` table automatically for local assignment development. Turn it off when using migrations in a production environment.

## Create a faculty

`POST http://localhost:3000/faculties/create-faculty`

```json
{
  "id": "23898-2880-203",
  "Name": "mr. NewFaculty",
  "expertise": "Machine Learning",
  "noOfPublication": 30
}
```

The API validates all four required fields and returns the saved faculty record. Unknown properties are rejected.

## Verification

```bash
npm run build
npm test
npm run test:e2e
```
