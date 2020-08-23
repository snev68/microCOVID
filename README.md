![CI](https://github.com/microcovid/microcovid/workflows/CI/badge.svg?branch=main)

# microcovid.org

## Local Development

Requirements:

- Node.JS 12
- Yarn

(See `.tool-versions` for specific and up-to-date versions).

1. Install local depenendences
    ```sh
    $ yarn install
    ```
1. Start local **server**
    ```sh
    $ yarn start
    ```
1. Open http://localhost:3000

## Linting

We use `eslint` to standardize our style across files. To check your files with the linter run:

```sh
$ yarn lint
```

If you see warnings, you can attempt to auto-correct them with:

```sh
$ yarn lint --fix
```

If there are errors it can't fix, please fix them manually before committing.