# Silly App for Music (SAM)

This is a simple app for managing music products such as albums and singles.

## Stack

The app is based ontop of the following technologies:

- [React](https://reactjs.org/) - As front-end framework
- [Next.js](https://nextjs.org/) - Used here for its router, API routes and some server-side rendering
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with type safety
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework to ease styling
- [Prisma](https://www.prisma.io/) - ORM to connect to the Postgres database and manage migrations
- [tRPC](https://trpc.io/) - Library for creating typesafe APIs

## Scaffolding

The project was scaffoled using the [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Instructions

### Requirements

You have to have installed:

- Node.js (for npm and running the app)
- PostgreSQL (for the database)

### Installation steps

Install the packages:

```shell
npm install
```

Create the DB for the first time and seed (or reset the database):

```shell
npx prisma migrate reset
```

Copy the .env.example file to .env and set the connection string for your Postgres database.

### Running and developing

To run migrations accor3ding to changes in the prisma schema, run:

```shell
npx prisma migrate dev
```

To run the app:

```shell
npm run dev
```
