# 📄 Documents App Challenge 🚀

This is a **challenge** project designed to develop a **real-time document management application** using **WebSockets** and **server requests**, following the principles of **hexagonal architecture**.

> ⚠ **Note**: This project **does NOT use React**, but it looks like it it uses **JSX, functional components, and hooks** within a custom framework.

## 📂 Project Structure

```
my-documents-app/
│── __mocks__/                # Jest mocks for testing
│── node_modules/             # Dependencies
│── src/
│   ├── core/
│   │   ├── fTree/            # Custom framework with JSX and hooks
│   │   │   ├── hooks/        # Custom hooks implementation
│   │   │   ├── render.ts     # Component rendering logic
│   │   │   ├── fTree.ts      # Core framework logic
│   │   │   ├── jsxRuntime.ts # JSX runtime
│   ├── modules/
│   │   ├── document/
│   │   │   ├── application/  # Document API and services
│   │   │   ├── domain/       # Domain models
│   │   │   ├── infrastructure/ # Repositories for data persistence
│   ├── ui/
│   │   ├── components/       # UI components
│   │   │   ├── DocumentsManager/
│   │   │   ├── Header/
│   │   │   ├── Notifications/
│   │   │   ├── Sort/
│   │   │   ├── utils/Dropdown/
│   │   ├── views/            # Page views
│── index.ts                  # Application entry point
│── package.json              # Project dependencies
│── README.md                 # Project documentation
```

## 📦 Installation

Make sure you have [pnpm](https://pnpm.io/) installed on your system. Then, run:

```sh
pnpm install
```

## 🚀 Running the Application

To start the application, run:

```sh
pnpm start
```

## ✅ Testing

The project includes **unit tests**. To run them, use:

```sh
pnpm test
```

## 🎯 Linting

To analyze and ensure code quality, run:

```sh
pnpm lint
```

## 🛠️ Technologies Used

- **Custom framework** using JSX and hooks.
- **Hexagonal architecture** for a modular and decoupled structure.
- **WebSockets** for real-time updates.
- **State management with custom hooks**.
- **Server requests** for document management.

## 📜 Description

The application allows users to **manage documents in real time**, with **sorting and filtering capabilities**, as well as a **dynamic interface** based on asynchronous events.

💻 **Challenge created to assess skills in modern application development with scalable architectures.**
