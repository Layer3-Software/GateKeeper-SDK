# KYC Package

Integrate and customize the Gatekeeper KYC frontend with your existing frontend.

## How to use it

To integrate KYC into your project, only need to install the package first and have web3 connected.

```bash
npm i @layer3/gatekeeper-sdk
```

If you use yarn.

```bash
yarn add @layer3/gatekeeper-sdk
```

Then on your `app` file or a `main` file, import as:

```js
import { LayerModal } from '@layer3/gatekeeper-sdk';
// CODE HERE....
return (
  <div>
    <LayerModal account={account} kycType={['DeFi']} />
  </div>
);
```

| Parameter             | Description                             | Type           | Required |
| -------------------   | -----------------------------           | -------------- | -------- |
| **account**           | Wallet Address from the user            | `string`       | Yes      |
| **kycType**           | Building description                    | `string array` | Yes      |
| **geoIds**            | Arrays of countries allowed             | `string array` | No       |
| **backgroundColor**   | Background color of the modal           | `string`       | No       |
| **textColor**         | Color for the body text                 | `string`       | No       |
| **buttonTextColor**   | Color for button texts                  | `string`       | No       |
| **primaryColor**      | Primary button, info color              | `string`       | No       |
| **screening**         | Perform additional screening on wallets | `boolean`      | No       |
| **screeningCallback** | Callback ran if wallet fails screening  | `void()`       | No*      |

\* `screeningCallback` is required if screening is set to `true` 

**geoIds** by Default as `US`. To set your own array of countries, please use the Alpha-2 codes. [CODES](https://www.iban.com/country-codes)

## Commands

TSDX scaffolds your new library inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run either Storybook or the example playground:

### Storybook

Run inside another terminal:

```bash
yarn storybook
```

This loads the stories from `./stories`.

> NOTE: Stories should reference the components as if using the library, similar to the example playground. This means importing from the root project directory. This has been aliased in the tsconfig and the storybook webpack config as a helper.

### Jest

Run inside another terminal:

```bash
yarn test
```

This loads the tests from `./test`.

It really important to have many tests as possible if the package start growing to avoid future issues.

### Example

Then run the example inside another:

```bash
cd example
yarn
yarn start
```

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Bundle analysis

Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `npm run size` and visulize it with `npm run analyze`.

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

### GitHub Actions

One actions are added by default:

- `node` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix

We use a semantic versioning to update the build or changes that we have on the project. They way to handle this is using a command

```bash
git add .
yarn run commit
git push
```

## Including Styles

There are many ways to ship styles, including with CSS-in-JS. TSDX has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader.
