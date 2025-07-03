# @poupe/eslint-plugin-vue-types

TypeScript type definitions for `eslint-plugin-vue` compatible with ESLint 9.x.

## Problem

ESLint 9.x has stricter type definitions that expect all rules to have type
`RuleEntry<any[]>`, but many Vue plugin rules with empty schemas have type
`RuleEntry<[]>` (empty tuple), which TypeScript considers incompatible.

## Solution

This package provides properly typed definitions that resolve the
incompatibility between Vue plugin rules and ESLint 9's type requirements.

## Installation

```bash
npm install --save-dev @poupe/eslint-plugin-vue-types
# or
yarn add -D @poupe/eslint-plugin-vue-types
# or
pnpm add -D @poupe/eslint-plugin-vue-types
```

## Usage

### TypeScript Path Mapping (Recommended)

Configure your `tsconfig.json` to use these types instead of the default ones:

```json
{
  "compilerOptions": {
    "paths": {
      "eslint-plugin-vue": ["node_modules/@poupe/eslint-plugin-vue-types"]
    }
  }
}
```

### Direct Import

Import from this package instead of `eslint-plugin-vue`:

```typescript
import vuePlugin from '@poupe/eslint-plugin-vue-types';
// or
import { VueRuleDefinitions } from '@poupe/eslint-plugin-vue-types';
```

## Type Exports

- `VuePlugin` - Properly typed Vue plugin interface
- `VueConfig` - Vue ESLint configuration type
- `VueRuleDefinitions` - All Vue rule definitions with proper ESLint 9.x
  compatible types
- Individual rule option types (e.g., `VueArrayBracketNewline`,
  `VueAttributeHyphenation`, etc.)

## Development

### Building

```bash
pnpm build
```

### Type Checking

```bash
pnpm type-check
```

### Linting

```bash
pnpm lint
```

## License

MIT
