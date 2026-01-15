# Superhero Database Web Application

This is a Fullstack web application designed to manage a database of superheroes. Users can perform full CRUD operations on superhero profiles, including managing multiple images for each hero.

## Tech Stack

- **Frontend:** React.js.
- **Backend:** Node.js, Express.js.
- **Database:** MySQL.
- **ORM:** Sequelize.
- **File Uploads:** Multer.
- **Validation:** Express-validator.

## Setup Instructions

### Database Setup

Open your MySQL terminal or MySQL Workbench.

Create a new database:

```sql
CREATE DATABASE superhero_db;
```

### Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a .env file in the root of the backend folder and copy the following (adjust with your MySQL credentials):

```env
PORT=your_port_to_connect_to_MySQL_server(by_default = 3306)
DB_NAME=superhero_db
DB_USER=your_username(by_default = root)
DB_PASSWORD=your_password
DB_HOST=127.0.0.1 or localhost
```

Start the server (this will automatically sync models and create tables):

```bash
node src/server.js
```

or

```bash
nodemon src/server.js
```

### Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

## Assumptions & Decisions

- **Database Sync:** I used sequelize.sync({ force: false }) to ensure that tables are created automatically upon the first launch without manual SQL imports.

- **Image Storage:** Images are stored locally in the /uploads directory. The database only stores the file names for performance efficiency.

- **Validation:** All text fields are required except for the "Real Name", which is optional.

- **State Management:** Local React state and Hooks were used for simplicity and performance in this specific scope.
