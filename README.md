# Livy Backend

## Description

This is a backend for retrieve clients and policies from a Livy server, acting like a middleware.

### Installation

`npm install`

### Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

Go to http://localhost:3000/api/v1/

#### Swagger parameter test

For `/api/v1/clients` and `/api/v1/clients/{client_id}`:

**Client ID**
a0ece5db-cd14-4f21-812f-966633e7be86

For `/api/v1/pollcicies/{id}`

**Policy ID**
7b624ed3-00d5-4c1b-9ab8-c265067ef58b

![Swagger](/resources/swagger_screenshot.png 'Demo Swagger')

## Test

Run `npm run start` and in another terminal run any of these:

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

![Jest Test](/resources/test_screenshot.png 'Demo Jest test')

## ToDo

- [ ] Add middleware to handle token validation and role validation
