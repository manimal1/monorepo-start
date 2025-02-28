# Mono Repo starter template

Turbo repo monorepo starter template. It has a frontend Vite bundled React app with react-query, Firebase auth, Material-UI + tailwindcss theme, and a swagger documented REST API. It has shared UI and Form libraries, along with tsconfig and eslint config shared packages. The backend is a Node.js Fastify API with Firebase and Firestore configured.

## Getting started

Run the following commands:

```sh
npm install
turbo build
npm run local
```

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `frontend`: a React [React](https://react.dev/) web app bundled with [vite](https://vitejs.dev)
- `backend`: a Node.js API that uses [Fastify](https://fastify.dev/) and has the possibility to use  [Prisma](https://www.prisma.io/) with a [postgresQL](https://www.postgresql.org/developer/) database, or to use [Firebase](https://firebase.google.com/) with a [Firestore](https://firebase.google.com/docs/firestore) database.
- `@repo/ui`: a stub component & utility library
- `@repo/forms`: a stub component & utility library for [react-hook-form](https://react-hook-form.com/docs)
- `@repo/eslint-config`: shared `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/aisist-api-client`: API files used in the `frontend` repo generated with [swagger](https://swagger.io/) from the `backend` API

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
