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

The project was scaffoled using the [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`. To learn more see:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

## Install & Run

Install the packages:

```shell
npm install
```

Create the database and run the migrations:

```shell
npx prisma migrate dev
```

To reset the database (including replacing its data with the seed data):

```shell
npx prisma migrate reset
```

To run the app:

```shell
npm run dev
```
