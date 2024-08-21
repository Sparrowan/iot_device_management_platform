# iot_device_management_platform

The project is built with Vue 3 and Vite, Pinia for state management, Json server for a mock api and tailwind css for styling.

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Running Json Server for a mock api

```sh
bun run server
```

### Type-Check, Compile and Minify for Production

```sh
bun build
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
bun test:unit:dev # or `bun test:unit` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
bun test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
bun build
bun test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```
