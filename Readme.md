
# NOTES2

NOTES2 is a full-stack web application that allows users to create, manage, and share their notes. It features a modern and responsive user interface built with React and Tailwind CSS, and a robust backend powered by Node.js, Express, and MongoDB.

## Features

-   **User Authentication:** Secure user registration and login with JWT-based authentication.
-   **Create and Manage Notes:** Users can create, view, edit, and delete their notes.
-   **Rich Text Editing:** A rich text editor for creating detailed and formatted notes.
-   **PDF Viewer:** View PDF documents directly in the application.
-   **Image Uploads:** Upload and attach images to notes.
-   **Responsive Design:** A fully responsive design that works on all devices.

## Tech Stack

### Frontend

-   **React:** A JavaScript library for building user interfaces.
-   **Vite:** A fast build tool for modern web projects.
-   **React Router:** For routing and navigation within the application.
-   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
-   **Axios:** A promise-based HTTP client for making API requests.
-   **React-PDF:** To display PDF files.

### Backend

-   **Node.js:** A JavaScript runtime for building server-side applications.
-   **Express:** A fast and minimalist web framework for Node.js.
-   **MongoDB:** A NoSQL database for storing application data.
-   **Mongoose:** An object data modeling (ODM) library for MongoDB and Node.js.
-   **JSON Web Tokens (JWT):** For secure user authentication.
-   **Cloudinary:** A cloud-based service for image and video management.
-   **Multer:** A middleware for handling `multipart/form-data`, used for file uploads.

## Project Structure

The project is organized into two main directories: `Frontend` and `Backend`.

### `Frontend`

The `Frontend` directory contains the React application.

```
/Frontend
|-- /src
|   |-- /components
|   |   |-- AddNotesModal.jsx
|   |   |-- land.jsx
|   |   |-- login.jsx
|   |   |-- navbar.jsx
|   |   |-- notes.jsx
|   |   |-- PDFModal.jsx
|   |   `-- register.jsx
|   |-- App.jsx
|   |-- main.jsx
|   ...
`-- package.json
```

### `Backend`

The `Backend` directory contains the Node.js and Express application.

```
/Backend
|-- /src
|   |-- /controllers
|   |   |-- admin.controller.js
|   |   |-- healthcheck.controller.js
|   |   `-- note.controller.js
|   |-- /models
|   |   |-- admin.model.js
|   |   `-- note.model.js
|   |-- /routes
|   |   |-- admin.routes.js
|   |   |-- healthcheck.routes.js
|   |   `-- note.routes.js
|   |-- app.js
|   |-- index.js
|   ...
`-- package.json
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js and npm installed on your machine.
-   A MongoDB database (local or cloud-based).
-   A Cloudinary account for image uploads.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/akshay0712-dev/notes_hub.git
    ```
2.  **Backend Setup:**
    -   Navigate to the `Backend` directory:
        ```sh
        cd Backend
        ```
    -   Install the dependencies:
        ```sh
        npm install
        ```
    -   Create a `.env` file in the `Backend` directory and add the following environment variables:
        ```
        PORT=8000
        MONGODB_URI=<your_mongodb_uri>
        CORS_ORIGIN=*
        ACCESS_TOKEN_SECRET=<your_access_token_secret>
        ACCESS_TOKEN_EXPIRY=1d
        REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
        REFRESH_TOKEN_EXPIRY=10d
        CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
        CLOUDINARY_API_KEY=<your_cloudinary_api_key>
        CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
        ```
    -   Start the backend server:
        ```sh
        npm run dev
        ```
3.  **Frontend Setup:**
    -   Navigate to the `Frontend` directory:
        ```sh
        cd ../Frontend
        ```
    -   Install the dependencies:
        ```sh
        npm install
        ```
    -   Create a `.env` file in the `Frontend` directory and add the following environment variables:
        ```
        VITE_API_URL=http://localhost:8000
        ```
    -   Start the frontend development server:
        ```sh
        npm run dev
        ```

The application should now be running at `http://localhost:5173`.

## API Endpoints

The backend provides the following API endpoints:

-   `GET /api/healthcheck`: Health check endpoint.
-   `POST /api/admin/register`: Register a new admin.
-   `POST /api/admin/login`: Login an admin.
-   `GET /api/notes`: Get all notes.
-   `POST /api/notes`: Create a new note.
-   `GET /api/notes/:id`: Get a note by ID.
-   `PUT /api/notes/:id`: Update a note by ID.
-   `DELETE /api/notes/:id`: Delete a note by ID.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the ISC License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/your-username/NOTES2](https://github.com/your-username/NOTES2)
