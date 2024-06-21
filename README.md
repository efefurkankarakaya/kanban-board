## Kanban Board

A Notion-like full-stack kanban board application built on Next.js, Zustand and MongoDB.

### Board

<img src="./docs/screenshots/board.png">

### Detail

<img src="./docs/screenshots/detail.png">

### Sign In / Sign Up

<img src="./docs/screenshots/sign-in.png">

Sign-in and Sign-up both functions are handled in the same screen, if a user does not exist, then the user will be created with their initial board data. And their board url will be publicly available over their user name.

### Installation

#### Initial Steps

- Create a environment file named `.env` in the root folder (`/`) of the project.
- Copy below data and paste inside of `.env` file:

```
    DATABASE_NAME="kanban-board"
    DATABASE_URI="mongodb://root:toor@localhost:27017/"
    DATABASE_USER="root"
    DATABASE_PASSWORD="toor"
```

#### Running the database (MongoDB instance)

- Clone the repository: `$ git clone https://github.com/efefurkankarakaya/kanban-board`
- Go inside the directory: `$ cd kanban-board/`
- Start the MongoDB instance in your local: `$ docker compose up`
- Then the local MongoDB instance will be available at `http://localhost:27017`.
- Also, MongoDB Express (admin panel) will be available at `http://localhost:8081`. But, I'd recommend you to use <a href="https://www.mongodb.com/products/tools/compass">MongoDB Compass</a> to access the MongoDB server.

#### Running the app

- Install the packages: `$ pnpm i`
- Start the development server: `$ pnpm dev`

### Build

- Build the app: `$ pnpm build`
- Start the build: `$ pnpm start`

### Folder Structure

#### /app

The main app folder, contains `pages` and `endpoints`.

#### /calls

This folder contains the service files (aka: API calls) of front-end.

#### /common

Contains common files and types.

#### /components

Contains client-side components.

#### /data

Contains initial/mock data.

#### /hooks

Contains custom hooks.

#### /models

Contains data models and interfaces.

#### /persistence

Contains database-related objects.

#### /public

Contains public files.

#### /services

Contains the back-end service files for API.

#### /store

Contains store files which are built on Zustand.

#### .husky/

Contains pre-commit hook to lint before commit.
