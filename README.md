# FluxCom

FluxCom is a real-time chat application built with a **Spring Boot** backend and a **React** frontend (using Vite). It supports user authentication (JWT), chat rooms, real-time messaging via WebSockets (STOMP/SockJS), and a modern UI with light/dark themes.

---

## Features

- **User Authentication**: Signup and login with JWT-based authentication.
- **Real-time Chat**: Send and receive messages instantly using WebSockets.
- **Chat Rooms**: Join, create, and switch between chat rooms.
- **User Presence**: See who is online/offline.
- **Responsive UI**: Modern, mobile-friendly interface with theme toggle.
- **Error Handling**: Graceful error boundaries and toast notifications.

---

## Tech Stack

- **Backend**: Java 17, Spring Boot, Spring Security, Spring WebSocket, JPA (H2 DB), JWT (jjwt)
- **Frontend**: React 18, Vite, React Router, Axios, STOMP/SockJS
- **Dev Tools**: ESLint, Prettier, Docker

---

## Project Structure

```
backend/
  ├── src/main/java/com/fluxcom/
  │     ├── controller/      # REST & WebSocket controllers
  │     ├── dto/             # Data transfer objects
  │     ├── model/           # JPA entities
  │     ├── repository/      # Spring Data repositories
  │     ├── service/         # Business logic
  │     └── config/          # Security, WebSocket, etc.
  ├── src/main/resources/
  │     └── application.yml  # Main config
  └── pom.xml                # Maven build file

frontend/
  ├── src/
  │   ├── components/        # React components (Auth, Chat, Layout, UI)
  │   ├── hooks/             # Custom React hooks (auth, websocket, theme)
  │   ├── services/          # API and WebSocket services
  │   ├── styles/            # CSS (globals.css)
  │   └── App.jsx, main.jsx  # Entry points
  ├── public/                # Static assets
  ├── package.json           # NPM dependencies
  └── vite.config.js         # Vite config
```

---

## Getting Started

### Prerequisites

- Java 17+
- Node.js 16+
- Maven

### Backend Setup

1. **Install dependencies & build:**
    ```sh
    cd backend
    mvn clean package
    ```

2. **Run the backend:**
    ```sh
    mvn spring-boot:run
    ```
    The backend runs on [http://localhost:8080](http://localhost:8080).

3. **API Docs:**  
   - REST endpoints: `/api/*`
   - WebSocket endpoint: `/ws`

### Frontend Setup

1. **Install dependencies:**
    ```sh
    cd frontend
    npm install
    ```

2. **Run the frontend:**
    ```sh
    npm run dev
    ```
    The frontend runs on [http://localhost:3000](http://localhost:3000).

3. **Environment Variables:**  
   You can set `VITE_API_URL` and `VITE_WS_URL` in a `.env` file in `frontend/` if your backend is not on the default port.

---

## Usage

- **Sign up** for a new account or **log in**.
- **Join or create** chat rooms.
- **Send messages** in real time.
- **Switch themes** using the toggle in the header.
- **See online users** in the sidebar.

---

## Development

- **Linting:**  
  Run `npm run lint` in the frontend for code quality.
- **Docker:**  
  The backend includes a `Dockerfile` for containerization.

---

## License

MIT License

---

## Credits

- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [STOMP/SockJS](https://stomp-js.github.io/)
