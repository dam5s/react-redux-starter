# React Redux Starter

## Initial setup

```
$ node --version
v16.13.1

$ npm init vite@latest react-redux-starter --template react-ts

$ cd react-redux-starter 

$ npm install react-redux
```

## Improve Typescript config

Edit `tsconfig.json`
```json
{
    "compilerOptions": {
        "target": "ESNext",
        "useDefineForClassFields": true,
        "lib": ["DOM", "DOM.Iterable", "ESNext"],
        "allowJs": false,
        "skipLibCheck": false,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "module": "ESNext",
        "moduleResolution": "Node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "noImplicitAny": true,
        "jsx": "react-jsx"
    },
    "include": ["./src"]
}
```

## Linting

Install dependencies

```shell
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin vite-plugin-eslint
```

Create `.eslintrc` file

```json
{
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
        "@typescript-eslint/no-namespace": [2, {"allowDeclarations": true}],
        "quotes": ["error", "single", {"avoidEscape": true}],
        "semi": ["error", "always"]
    }
}
```

Configure vite

```js
import eslintPlugin from 'vite-plugin-eslint';
//...
eslintPlugin({throwOnWarning: true, throwOnError: true})
//...
```

Add manual command for running the linter in `package.json`

```
"lint": "eslint src --ext .ts,.tsx"
```

## Setting up Jest and React Testing

Add dependencies

```shell
npm install -D \
    @testing-library/jest-dom \
    @testing-library/react \
    @testing-library/user-event \
    ts-jest
```

Configure test run task in `package.json`

```
    "test": "jest"
```

Create `jest.config.js`

```js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    globals: {'ts-jest': {useESM: true}},
};
```

## Writing your first component

1. Render your component at the root, e.g.
   ```
   ReactDOM.render(
       <Joke text="Chuck Norris once won a game of connect four in 3 moves." />,
       document.getElementById('root')
   )
   ```
1. Write the jest test at `src/components/__tests__/Joke.test.tsx`, it will be detected by jest automatically.
1. Create your `src/components/Joke.tsx` to match your specification.

## Writing your first network access

1. `neworking/Http` contains the base of the HTTP layer:
   * `sendRequest` returns a `Result.Async.Pipeline<Response, Http.Failure>`
   * `sendRequestForJson` takes an additional json `Decoder<T>`
     and returns a `Result.Async.Pipeline<T, Http.Failure>` aliased as `HttpResult<T>`
1. `networking/JokeApi` is an example of integration with an actual API endpoint.
1. The `Joke` component now integrates with the API via a dispatch that goes to the `interactions` middleware.

## Loading environment specific configuration

The `ApiConfig` reads values from the environment that we create on window in `env.js`.
`env.js` is a separate entry in the webpack config. This lets us re-use the generated `app.js`
when promoting to higher environments and only change `env.js` for those environments. 
