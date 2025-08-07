# FluxCom

A real-time chat application built with Spring Boot backend and React frontend.

## Features

- User authentication with JWT
- Real-time messaging via WebSockets
- Chat rooms with user presence
- Light/dark theme toggle
- Responsive mobile-friendly UI

## Tech Stack

**Backend:** Java 17, Spring Boot, Spring Security, Spring WebSocket, JPA (H2), JWT
**Frontend:** React 18, Vite, React Router, Axios, STOMP/SockJS

## Quick Start

### Backend
```bash
cd backend
mvn clean package
mvn spring-boot:run
```
Runs on http://localhost:8080

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:3000

## Usage

1. Sign up or log in
2. Join or create chat rooms
3. Send real-time messages
4. Toggle themes and see online users

## License

MIT
