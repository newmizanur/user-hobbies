### Deployment

#### Manual Deployment without Docker

- Create a `.env` file using the `cp .env.example .env` command and replace the existing env variables with personal settings

- Modify the connection string by modifying the following.

- Download dependencies using `npm i` or `yarn`

- Start the app in pre-production mode using `npm run start` or `npm run start:dev` for development

- Open http://localhost:3000/api/docs/

#### Deploying with Docker

- Execute the following command in-app directory:

```bash
$ docker-compose up -d
```

- Open http://localhost:3000/api/docs/

### Environment Configuration

By default, the application comes with a config module that can read in every environment variable from the `.env` file.

**APP_ENV** - the application environment to execute as, either in development or production. Determines the type of logging options to utilize. Options: `dev` or `prod`.

**APP_URL** - the base URL for the application. Made mainly to showcase the power of `ConfigService` and can be removed as it doesn't serve any other purpose

**DB_URL** - the URL to the MongoDB collection

### Testing

#### Docker

```bash
# e2e tests
$ docker exec -it nest yarn test:e2e
```

#### Non-Docker

```bash
# e2e tests
$ npm run test:e2e
```
