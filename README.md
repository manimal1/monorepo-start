# Aissit - AI business assistant

This application has an AI chatbot that allows businesses and their clients to handle manual tasks - like invoicing or product ordering - via a chatbot. It holds all business and client actions - e.g. services rendered, goods purchased, invoices delivered/paid - in one useful dashboard for easy reference and tracking.

## Getting started

Run the following commands:

```sh
npm install
turbo build
npm run app
```

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `frontend`: a React [React](https://react.dev/) web app bundled with [vite](https://vitejs.dev)
- `backend`: a Node.js API that uses [Fastify](https://fastify.dev/) and [Prisma](https://www.prisma.io/) with a [postgresQL](https://www.postgresql.org/developer/) database
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
