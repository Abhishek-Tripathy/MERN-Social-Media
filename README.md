# MERN Social Media App : VibeHive

This is a full-stack social media application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to connect, share posts, and interact with others in real-time. It includes features such as authentication, profile management, and real-time chat functionality.

---

## Deployed Link

Explore the app here: [VibeHive](https://mern-social-media-83gx.onrender.com)

## Features

### Backend

- **User Authentication**: Secure authentication using JWT (JSON Web Tokens) and password hashing with bcrypt.
- **File Uploads**: Integration with Multer and Cloudinary for image uploads.
- **Database**: MongoDB as the database to store user data, posts, and chats.
- **Real-Time Communication**: Socket.io for real-time notifications and messaging.
- **Environment Configuration**: Managed with dotenv.

### Frontend

- **UI Framework**: Built with React and styled using TailwindCSS for a modern, responsive design.
- **State Management**: Context API for managing application-wide state.
- **Routing**: React Router for seamless navigation.
- **Animations**: Framer Motion for smooth transitions and animations.
- **Notifications**: React Hot Toast for user-friendly notifications.

---

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- bcrypt
- Cloudinary
- Multer
- Socket.io
- dotenv

### Frontend

- React.js
- Vite
- Axios
- TailwindCSS
- Framer Motion
- React Router DOM
- React Hot Toast
- Date-fns

---

## Installation

### Prerequisites

- Node.js installed
- MongoDB instance running
- Cloudinary account (for image uploads)

### Steps

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/mern-social.git
    cd mern-social
    ```

2.  Set up environment variables:

    - Create a `.env` file in both `server` and `client` directories.
    - Add the following variables:
      ``` # Server/.env
      MONGO_URI=<your-mongo-db-uri>
      JWT_SECRET=<your-jwt-secret>
      CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
      CLOUDINARY_API_KEY=<your-cloudinary-api-key>
      CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

      # Client/.env
      VITE_API_URL=<backend-api-url>
      ```

3.  Install dependencies:

    ```bash
    npm i
    ```

4. Setup Frontend:

   ```cd client
   npm install
   npm run build
   cd ..
   ```

5.  Start the development server:
    ```bash
    npm run start
    ```

---


