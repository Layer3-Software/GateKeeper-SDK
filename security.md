# Using GateKeeper Security

### Notes

Remember to wrap your app with the `GatekeeperContextProvider` at a higher level in your component hierarchy (typically in your root component) so that the verification status is accessible to all components.

These gatekeeper components add protective functionality to your routes. The use of one over the other depends on the specific UX/UI requirements of your application. 

In general, use `ProtectedRouteStrong` when you want to provide alternative content or actions for non-verified users. Use `ProtectedRouteWeak` when you want to show the main content but prevent interaction, usually when waiting for verification or when verification has failed.

## React Router v6 - Routing Components

### `ProtectedRouteStrong`

#### Definition:

A gatekeeper component that protects the route based on a verification status. If verification passes (`verified === true`), the main component is rendered. If not, a fallback component is shown instead.

#### Usage:

```tsx
<Route
  element={
    <ProtectedRouteStrong
      component={<MainComponent />}
      fallbackComponent={<FallbackComponent />}
    />
  }
  path="/routeStrong"
/>
```

#### Pros:
- Hard to bypass
- Provides a completely different user experience when not verified. Useful when you want to present users with alternative information or actions when they're not verified.- Hard to bypass

#### Cons:
- Needs a custom component built out.
- Switching between the main and fallback component might be seen as a more intrusive change in the UI compared to just overlaying the current component.

### `ProtectedRouteWeak`

#### Definition:

A gatekeeper component that protects the route based on a verification status. If verification fails (`verified === false`), the component is overlaid with a semi-transparent layer that prevents interaction.

#### Usage:

```tsx
<Route
  element={
    <ProtectedRouteWeak
      component={<MainComponent />}
    />
  }
  path="/routeWeak"
/>
```

#### Pros:
- No extra components are needed.
- The main component remains visible and familiar to the user, even when they are not verified. The overlay provides a visual hint of non-verification status, without changing the entire UI.

#### Cons:
- Easier to bypass.
- As the main component remains visible, it might give users the impression that they should be able to interact with it. This could lead to potential confusion if users attempt to interact with the overlaid UI.


## HOC method

### `withGatekeeperStrong`

#### Definition:

A higher-order component (HOC) that wraps around a component and protects it based on a verification status. If verification passes (`verified === true`), the wrapped component is rendered. If not, a fallback component is shown instead.

#### Usage:

```tsx
const ProtectedComponent = withGatekeeperStrong(MainComponent, FallbackComponent);
```

Then you can use `ProtectedComponent` anywhere in your application:

```tsx
<ProtectedComponent />
```

#### Pros:
- Harder to bypass.
- Provides a completely different user experience when not verified. Useful when you want to present users with alternative information or actions when they're not verified.

#### Cons:
- Needs a custom component built out.
- Switching between the main and fallback component might be seen as a more intrusive change in the UI compared to just overlaying the current component.

### `withGatekeeperWeak`

#### Definition:

A higher-order component (HOC) that wraps around a component and protects it based on a verification status. If verification fails (`verified === false`), the component is overlaid with a semi-transparent layer that prevents interaction.

#### Usage:

```tsx
const ProtectedComponent = withGatekeeperWeak(MainComponent);
```

Then you can use `ProtectedComponent` anywhere in your application:

```tsx
<ProtectedComponent />
```

#### Pros:
- No extra components are needed
- The main component remains visible and familiar to the user, even when they are not verified. The overlay provides a visual hint of non-verification status, without changing the entire UI.

#### Cons:
- Easier to bypass.
- As the main component remains visible, it might give users the impression that they should be able to interact with it. This could lead to potential confusion if users attempt to interact with the overlaid UI.