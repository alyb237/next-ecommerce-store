## e-commerce store(mock up): selling used and vintage synthesizers 🎛 🎹
___________________________________________
### Description: Adding products to a cart and checking out using cookies. 
___________________________________________
#### Functionalities: create separated util functions to get and set localStorage that abstract the JSON.stringify / parse process, useEffect is needed to update the component, Retrieving cookies on the server-side in Next.js via `req.cookies`, psql: Inserting records into the table, Connecting to that database from Node.js, Next.js: Querying data from the database, Using same packages as Node.js, Normalizing fields into JS properties with sindresorhus/camelcase-keys, Querying all synths,Querying a single synth, Next.js: Refactoring the database connection to fix Next.js connection slots issue, Changing extension to .ts and .tsx, Usage with Emotion - add the jsxImportSource , Typing props, Typing useState - hovering to get original type of setter function, Typing events, Typing API handlers, including response and request, Typing database functions, Testing with Playwright, Selecting elements, Asserting that elements exist, Interacting with elements, Setting up automatic screenshots and videos on test failure, Testing synth pages, Usage of data-test-id, GitHub Actions, Deployment with Heroku, REST, API Design, HTTP Request and Response, Response Status Codes (200, 301, 302, 307, 308, 401, 403, 404, 500), Next.js API Routes (TS), TypeScript types for API handlers, including response and request, Setting up API routes connected to the database functions, Fetching from those API routes, `fetch` on Next.js server-side needs API_BASE_URL environment variable, Creation of frontend components to trigger Create, Update and Delete actions such as the delete from cart button. 
___________________________________________
#### Libraries: 
[Postgres.js library](https://www.npmjs.com/package/postgres)
[dotenv-safe library](https://www.npmjs.com/package/dotenv-safe)
[cameCase](https://www.npmjs.com/package/camelcase-keys)

####Technologies
--------------------
- Next.js
- Postgres.js
- Jest
- Playwright
- GitHub Actions

## Database Setup

Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.

Follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Then, connect to the built-in `postgres` database as administrator in order to create the database:

**Windows**

If it asks for a password, use `postgres`.

```bash
psql -U postgres
```

**macOS**

```bash
psql postgres
```

**Linux**

```bash
sudo -u postgres psql
```

Once you have connected, run the following to create the database:

```sql
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

Quit `psql` using the following command:

```bash
\q
```

On Linux, you will also need to create a Linux system user with a name matching the user name you used in the database. It will prompt you to create a password for the user - choose the same password as for the database above.

```bash
sudo adduser <user name>
```

Once you're ready to use the new user, reconnect using the following command.

**Windows and macOS:**

```bash
psql -U <user name> <database name>
```

**Linux:**

```bash
sudo -u <user name> psql -U <user name> <database name>
```

### Running the migrations

To set up the structure and the content of the database, run the migrations using Ley:

```bash
yarn migrate up
```

To reverse the last single migration, run:

```bash
yarn migrate down
```

## API Design

Base URL (development): http://localhost:3000/api/

1. Reading all users: `GET /users`
2. Reading a single user: `GET /users/:id`
3. Creating a new user: `POST /users`
4. Deleting a user: `DELETE /users/:id`
5. Updating a user: `PUT /users/:id`
