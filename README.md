# Pharmacy Management System

A Pharmacy Management System built to streamline drug inventory, sales, and employee management. Currently, the project contains the Backend API service.

## Project Structure

```text
pharmacy-ManagementSystem/
├── Backend/
│   ├── db/
│   │   └── index_db.js     # MongoDB connection setup
│   ├── models/             # Mongoose schemas (empty, ready for schemas)
│   ├── .env                # Local environment variables configuration
│   ├── app.js              # Express app configuration & middleware
│   ├── package.json        # Dependencies & start scripts
│   └── server.js           # Server entry point (starts server & database connection)
├── .gitignore              # Files ignored by Git (node_modules, .env, etc.)
└── README.md               # Project documentation
```

## Technologies & Libraries Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB & Mongoose**: NoSQL database and Object Data Modeling (ODM) library for MongoDB.
- **Zod**: Schema declaration and validation library to validate incoming API data.
- **Bcrypt**: Library to hash passwords for secure authentication.
- **Nodemon**: Utility that monitors for code changes and automatically restarts the server during development.

## Setup and Installation

### Prerequisites

Ensure you have **Node.js** (v14+) and **MongoDB** installed on your local machine or access to a MongoDB Atlas cluster.

### Steps

1. **Navigate to the Backend directory:**
   ```bash
   cd Backend
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file inside the `Backend` directory (if not already present) and specify the following variables:
   ```env
   PORT=5500
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The backend server will start running at `http://localhost:5500` (or the port specified in your `.env` file).
