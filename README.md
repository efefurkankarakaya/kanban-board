## Kanban Board

A Notion-like full-stack Kanban Board application built on Next.js, Zustand and MongoDB.

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
- Start the MongoDB instance in your local: `$ docker compose up`
- Then the local MongoDB instance will be available at `http://localhost:27017`.
- Also, MongoDB Express (admin panel) will be available at `http://localhost:8081`. But, I'd recommend you to use <a href="https://www.mongodb.com/products/tools/compass">MongoDB Compass</a> to access the MongoDB server.

#### Running the app

- Install the packages: `$ pnpm i`
- Start the development server: `$ pnpm dev`

### Build

- Build the app: `$ pnpm build`
- Start the build: `$ pnpm start`
