# QuickLink: A Full-Stack URL Shortener 🔗

QuickLink is a high-performance, full-stack URL shortening service built with a modern technology stack. The backend is a robust REST API developed with **Java** and **Spring Boot**, and the frontend is a responsive single-page application (SPA) built with **React** and **TypeScript**.

This project demonstrates a professional, multi-layered architecture and includes advanced features such as custom link aliases, click tracking analytics, and optional link expiration.

---

## Features ✨

### Core Features
* **URL Shortening:** Generates a unique, short code for any long URL using a Base62 encoding algorithm.
* **Redirection:** Seamlessly redirects users from the short link to the original URL with an HTTP 301/302 response.
* **URL Validation:** Performs basic validation on incoming URLs.

### Advanced Features
* **Custom Short Links:** Users can propose their own custom aliases for links (e.g., `/my-resume`).
* **Click Analytics:** Tracks the number of times each link is accessed and provides a statistics endpoint.
* **Link Expiration:** Allows users to set an optional expiration date and time for any short link.

---

## Tech Stack 🛠️

### Backend
* **Language:** Java 17 (LTS)
* **Framework:** Spring Boot 3
* **Data Access:** Spring Data JPA / Hibernate
* **Database:** PostgreSQL
* **Dependencies:** Lombok, Spring Web, Spring Boot DevTools

### Frontend
* **Framework:** React
* **Language:** TypeScript
* **Build Tool:** Vite

---

## API Endpoints 🚀

| Method | Path                         | Description                                | Example Body                                                                 |
| :----- | :--------------------------- | :----------------------------------------- | :--------------------------------------------------------------------------- |
| `POST` | `/api/v1/url/shorten`        | Creates a new short link.                  | `{ "longUrl": "...", "customAlias": "...", "expiresAt": "..." }` |
| `GET`  | `/{shortCode}`               | Redirects to the original long URL.        | (None)                                                                       |
| `GET`  | `/api/v1/url/stats/{shortCode}` | Retrieves statistics for a short link.     | (None)                                                                       |

---

## Project Setup & Installation ⚙️

### 1. Backend (Spring Boot)

The backend is a Maven project built with Java 17.

#### **Configuration**
1.  **Database Setup:**
    * Install PostgreSQL.
    * Using a tool like pgAdmin, create a new database named `quicklink_db`.

2.  **Application Properties:**
    * Navigate to `/backend/src/main/resources/application.properties`.
    * Update the following properties with your PostgreSQL credentials:
        ```properties
        spring.datasource.url=jdbc:postgresql://localhost:5433/quicklink_db
        spring.datasource.username=postgres
        spring.datasource.password=YOUR_PASSWORD
        ```

#### **Running the Backend**
1.  Open the `backend` folder in IntelliJ IDEA.
2.  Let Maven resolve the dependencies.
3.  Run the main application class `QuicklinkApplication.java`.
4.  The server will start on `http://localhost:8080`.

### 2. Frontend (React)

The frontend is a React + TypeScript project created with Vite.

#### **Installation**
1.  Navigate to the `frontend` directory in your terminal.
2.  Install the required `npm` packages:
    ```bash
    npm install
    ```

#### **Running the Frontend**
1.  From the `frontend` directory, run the development server:
    ```bash
    npm run dev
    ```
2.  The frontend application will be available at `http://localhost:5173`.

---

## Architectural Notes 🏗️

This project follows a professional multi-layered architecture to ensure a clean separation of concerns.

* **`model`:** Contains the JPA `@Entity` classes (e.g., `UrlMapping`) that define the database schema.
* **`repository`:** Contains the Spring Data JPA interfaces (e.g., `UrlMappingRepository`) for data access.
* **`service`:** Contains the core business logic of the application.
* **`controller`:** Exposes the application's functionality via REST API endpoints.
* **`dto`:** Contains Data Transfer Objects used to shape the data for API requests and responses.

Error handling is centralized using a `@RestControllerAdvice` class to provide consistent API error responses.
