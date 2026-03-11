# Innexia Frontend

> Hotel booking web application built with **Angular 21** as a Capstone project for the Programming 5 course.

---

## Project Description

**Innexia** is a hotel booking platform that allows users to:

- Search for hotels by check-in/check-out dates, number of guests, and room count.
- View hotel details and available rooms.
- Make and cancel reservations.
- Manage their bookings through a personal dashboard.

The project connects to a **NestJS** backend via a REST API, implementing JWT authentication, token management, and HTTP interceptors.

### Capstone Objectives

- Build a Single Page Application (SPA) with Angular following the **Features / Shared / Core** architecture.
- Implement a complete authentication system (login, guards, interceptors).
- Consume a REST API for managing hotels, rooms, and bookings.
- Apply responsive design (mobile, tablet, desktop) using CSS Variables and Angular Material.
- Manage reactive state with Angular **Signals**.

---

## Prerequisites

Make sure the following tools are installed before running the project:

| Tool            | Recommended Version | Link                                        |
|-----------------|---------------------|---------------------------------------------|
| Node.js         | >= 20.x (LTS)       | https://nodejs.org                          |
| npm             | >= 11.x             | Bundled with Node.js                        |
| Angular CLI     | >= 21.x             | `npm install -g @angular/cli`               |
| Innexia Backend | —                   | See `innexiabackend` repository             |

---

## Installation & Setup

###  Folder Structure Sugested

Progra5/
├── indexiaFrontend/  
├── indexiaBackend/  


### 1. Clone the repository

```
cd Progra5  // Or the directory where you want to clone the repositories
```
```bash
git clone FrontEndGitLabURL
git clone BackendGitLabURL
```

### 2. Install dependencies

```bash
cd indexiafrontend
npm install -g @angular/cli
npm install
```

### 3. Configure environment variables

- you nedd to go to the environments folder that are located in: `innexiafrontend/src/environments`
- then create a new two files 
    - environment.development.ts
    - environment.example.ts

and then modify this two files that you created with the info provided in the example files located in: `innexiafrontend/src/environments` in our case our backend works in `'http://localhost:3000'`


### 4. Start the development server

```bash
ng serve
```

Open your browser at: **http://localhost:4200/**

> The application will automatically reload whenever you save changes to source files.

### 5. Build for production

```bash
ng build
```

Build artifacts will be generated in the `dist/` directory.

---

## Folder Structure

```
innexiafrontend/
├── public/                         # Static public assets
├── src/
│   ├── app/
│   │   ├── core/                   # Core application logic
│   │   │   ├── auth/               # Guards and authentication strategies
│   │   │   ├── interceptors/       # HTTP interceptors (JWT, error handling)
│   │   │   ├── interfaces/         # Global interfaces (Hotel, Room, Booking...)
│   │   │   └── services/           # Global services (Auth, Hotels, Bookings)
│   │   │
│   │   ├── features/               # Feature modules (page-level)
│   │   │   ├── search/             # Hotel search page
│   │   │   ├── booking-detail/     # Booking detail & confirmation page
│   │   │   └── user/               # User reservations dashboard
│   │   │
│   │   ├── shared/                 # Reusable components, pipes, and utilities
│   │   │   ├── components/
│   │   │   │   ├── booking-card/           # Individual booking card
│   │   │   │   ├── booking-card-list/      # List of booking cards
│   │   │   │   ├── booking-detail/         # Booking detail component
│   │   │   │   ├── hotel-booking/          # Hotel booking form
│   │   │   │   ├── hotel-card/             # Hotel card in search results
│   │   │   │   ├── hotel-list/             # Hotel list component
│   │   │   │   ├── room/                   # Room component
│   │   │   │   ├── search-form/            # Search form component
│   │   │   │   └── side-menu/              # Sidebar / navigation menu
│   │   │   ├── pipes/              # Custom pipes
│   │   │   └── utils/              # Utility functions
│   │   │
│   │   ├── app.routes.ts           # Main route definitions
│   │   ├── app.config.ts           # Application configuration
│   │   └── app.ts                  # Root component
│   │
│   ├── index.html                  # Main HTML entry point
│   ├── main.ts                     # Angular bootstrap entry point
│   ├── styles.css                  # Global styles
│   └── material-theme.scss         # Angular Material theme
│
├── angular.json                    # Angular workspace configuration
├── package.json                    # npm dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md
```

---

## Tech Stack

| Technology         | Version   | Purpose                                   |
|--------------------|-----------|-------------------------------------------|
| Angular            | ^21.0.0   | Main framework (SPA)                      |
| Angular Material   | ~21.1.3   | UI components and design system           |
| Angular CDK        | ~21.1.3   | UI primitives and accessibility           |
| RxJS               | ~7.8.0    | Reactive programming and stream handling  |
| TypeScript         | ~5.9.2    | Static typing                             |
| Vitest             | ^4.0.8    | Unit testing                              |

---

## Main Routes

| Route                  | Description                              | Guard         |
|------------------------|------------------------------------------|---------------|
| `/`                    | Redirects to search                      | —             |
| `/search`              | Hotel search page                        | —             |
| `/hotel/:id`           | Hotel detail and booking                 | AuthGuard     |
| `/booking-detail`      | Booking confirmation                     | AuthGuard     |
| `/user`                | User reservations dashboard              | AuthGuard     |
| `/login`               | Login page                               | —             |

---

## Running Tests

```bash
ng test
```

Unit tests are run with **Vitest**.

---

## Project Conventions

- **Architecture**: Features / Shared / Core
- **Reactive state**: Angular Signals (`signal`, `computed`, `effect`)
- **Styles**: CSS Variables for theming, Angular Material for components
- **Responsive breakpoints**: mobile (< 768px), tablet (768px–1024px), desktop (> 1024px)
- **Date handling**: UTC-5 timezone
- **JWT tokens**: Stored in cookies with automatic refresh

---

## Author

**Steven Balaguera**  
Course: Programming 5 — Capstone Project  
Year: 2026
