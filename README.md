# Gatekeeper package

Integrate and customize the Gatekeeper frontend with your existing frontend.

## Installation

Install @layer3/gatekeeper-sdk with `npm` or `yarn`

```bash
npm install @layer3/gatekeeper-sdk
```

```bash
yarn add @layer3/gatekeeper-sdk
```

## Usage/Examples

First, you'll need to setup the `GatekeeperContext`, you use it like any other React context:

```ts
import { GatekeeperContextProvider } from "@layer3/gatekeeper-sdk";

root.render(
  <GatekeeperContextProvider>
    <AppContextProvider>
      <Router>
        <App />
      </Router>
    </AppContextProvider>
  </GatekeeperContextProvider>
);
```

Then anywhere in your app, import as:

```javascript
import AccessControlModal from "@layer3/gatekeeper-sdk";

const GateKeeperModal = () => {
  return (
    <div>
      <AccessControlModal
        account={address}
        checkIds={["KYC", "exampleId"]}
        roles={["role1", "role2"]}
        polygonId={false}
        checkCallback={checkCallback}
        customization={{
          primaryColor: "#000000",
          backgroundColor: "#FFFFFF",
          buttonTextColor: "#FFFFFF",
          textColor: "#000000",
        }}
      />
    </div>
  );
};

export default GateKeeperModal;
```

## Parameters

| Parameter         | Description                                                     | Type           | Required |
| ----------------- | --------------------------------------------------------------- | -------------- | -------- |
| **account**       | Wallet address from the user                                    | `string`       | Yes      |
| **polygonId**     | Boolean to enable polygon id claim                              | `boolean`      | No\*     |
| **roles**         | Arrays of roles                                                 | `string array` | No\*     |
| **checkIds**      | Arrays of checks ids                                            | `string array` | No\*     |
| **customization** | Color properties explained below                                | `Object`       | No\*\*   |
| **nftClaimLinks** | Object with links to claim the nfts                             | `Object`       | No       |
| **signature**     | String provided to make the auth part with out user interaction | `string`       | No       |
| **isStaging**     | Boolean to change between staging/production url                | `boolean`      | No\*\*\* |

\* At least one have to be provide: `polygonId` or `roles` or `checkIds`
\*\* Default customization properties
\*\*\* `isStaging` by default is `false`

```js
primaryColor: '#059669',
textColor: '#e2e8f0',
buttonTextColor: '#e2e8f0',
backgroundColor: '#141724',
```

## Params examples

#### Roles:

```js
roles={['role1', 'role2']}
```

#### CheckIds:

```js
checkIds={['KYC', 'exampleId']}
```

#### NftClaimLinks:

```js
nftClaimLinks={{
  'nftContractAddress1': 'https://claimNft1.1com',
  'nftContractAddress2': 'https://claimNft2.com',
}}
```

## Security

![Check Here](security.md) for details on gating access to components/routes.

## Customization

| Parameter           | Description                   | Type     | Required |
| ------------------- | ----------------------------- | -------- | -------- |
| **backgroundColor** | Background color of the modal | `string` | No       |
| **textColor**       | Color for the body text       | `string` | No       |
| **buttonTextColor** | Color for button texts        | `string` | No       |
| **primaryColor**    | Primary button, info color    | `string` | No       |

## Issuance

- During this process, if the role or roles you are using have a verifiable credential (VC) available, the user will be able to claim it during the issuance process..

![issuanceExample](statics/issuanceExample.png)

## Commands

To start [TSDX](https://tsdx.io/) helps you develop, test, and publish modern TypeScript packages/

```bash
yarn start
```

To start [storybook](https://storybook.js.org/) Storybook is a frontend workshop for building UI components and pages in isolation.

```bash
yarn storybook
```

## GitHub Actions

One actions are added by default:

- `node` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix

We use a semantic versioning to update the build or changes that we have on the project. They way to handle this is using a command

```bash
git add .
yarn run commit
git push
```
