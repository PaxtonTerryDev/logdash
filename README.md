# LogDash

An opinionated yet highly configurable logging utility for Typescript.

## Quick Start

You can create a logging instance through the `createLogger()` method.
```typescript
const log = createLogger();

export default log;
```

Logdash ships with sensible defaults, but you can provide configurations by passing a configuration object into the `createLogger()` function.
