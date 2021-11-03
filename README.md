# Livy Backend

## Pendings

- [ ] Add policies interfaces and put in IClients interface

- [ ] Add pagination by default 10 elements per page, for limit parameter and name parameter works for a search engine

- [x] Extract role, overall info and role from the token

- [ ] In get clients endpoint, there is necessary to add a role validation, if the role is not admin, the user can only see the clients that are in the same role, else the user can see all the clients

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
