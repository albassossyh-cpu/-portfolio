# Ala Damanty Company Website

Full-stack company website built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js installed
- MongoDB installed and running locally on port 27017

## Setup

1.  Open a terminal in this directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
    (Dependencies: express, mongoose, bcryptjs, jsonwebtoken, dotenv, cors, body-parser)

3.  Ensure MongoDB is running.

4.  Start the server:
    ```bash
    npm start
    ```
    Or for development with auto-restart (if nodemon is installed):
    ```bash
    npm run dev
    ```

5.  Open your browser and visit: `http://localhost:3000`

## Project Structure

- `server.js`: Main server file.
- `models/`: Database models.
- `routes/`: API routes.
- `public/`: Frontend files (HTML, CSS, JS).
- `assets/`: Images (Place your `logo.png` here).

## Notes

- The database is named `aladamanty`.
- The logo is expected at `assets/logo.png`. Please add a logo image with this name to the `assets` folder.
