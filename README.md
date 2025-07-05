# EventEase

## Description

EventEase is a full-stack web application aimed at simplifying the process of discovering, booking, and managing events. Users can browse available events, register/login securely, and book their spots. The application likely features integration with a payment gateway, and sends email notifications. The backend is built using Node.js and Express, providing a RESTful API that interacts with a MongoDB database for persistent storage.

## Features (Inferred)

- User Authentication (Login/Signup)
- Event Browsing and Booking
- Payment Processing (Integration likely via `/api/booking`)
- Email Notifications (Potentially for booking confirmation)

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JSON Web Tokens (JWT) for authentication
  - bcrypt for password hashing
  - CORS
  - dotenv for environment variables
- **Frontend (Likely):**
  - HTML
  - CSS
  - JavaScript
  - (Potentially others based on `proj.html` content)
- **Other:**
  - Nodemailer (for sending emails)

EventEase is a web application designed for booking and managing events. It features a backend built with Node.js and Express, utilizing MongoDB for data storage.

## Features (Inferred)

- User Authentication (Login/Signup)
- Event Browsing and Booking
- Payment Processing (Integration likely via `/api/booking`)
- Email Notifications (Potentially for booking confirmation)

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JSON Web Tokens (JWT) for authentication
  - bcrypt for password hashing
  - CORS
  - dotenv for environment variables
- **Frontend (Likely):**
  - HTML
  - CSS
  - JavaScript
- **Other:**
  - Nodemailer (for sending emails)

## Setup and Installation

1.  **Clone the repository:**

    ```bash

    git clone https://github.com/sriharsha0x1/Event-Ease

    git clone <your-repository-url>

    cd EventEase
    ```

2.  **Install Root Dependencies (if any frontend/utility scripts are here):**
    ```bash
    npm install
    ```
3.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
4.  **Install Backend Dependencies:**
    ```bash
    npm install
    ```
5.  **Configure Environment Variables:**

    - Create a `.env` file in the `backend` directory.
    - Add necessary environment variables, such as:
      ```
      MONGO_URI=<your_mongodb_connection_string>
      JWT_SECRET=<your_jwt_secret>
      PORT=5000 # Or your desired port
      # Add any other required variables (e.g., email service credentials)
      ```

    * Create a `.env` file in the `backend` directory.
    * Add necessary environment variables, such as:
      ```
      MONGO_URI=<your_mongodb_connection_string>
      JWT_SECRET=<your_jwt_secret>
      PORT=5000 # Or your desired port
      # Add any other required variables (e.g., email service credentials)
      ```

## Running the Application

1.  **Start the Backend Server:**

    - From the `backend` directory:

      ```bash
      # For development (requires nodemon)
      npm run dev

      # For production
      npm start
      ```

    - The server should start, typically on `http://localhost:5000` (or the port specified in your `.env` file).

2.  **Access the Frontend:**

    - Open the main HTML file (likely `proj.html` or similar, possibly served by the backend) in your web browser. (Instructions might need adjustment based on how the frontend is served).

    * From the `backend` directory:

      ```bash
      # For development (requires nodemon)
      npm run dev

      # For production
      npm start
      ```

    * The server should start, typically on `http://localhost:5000` (or the port specified in your `.env` file).

