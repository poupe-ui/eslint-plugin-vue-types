# AGENT.md

This file provides guidance to AI coding assistants (Claude Code, GitHub
Copilot, etc.) when working with code in this repository.

## Project Overview

`@poupe/eslint-plugin-vue-types` is a TypeScript type definitions package for
`eslint-plugin-vue` that's compatible with ESLint 9.x. It resolves type
incompatibilities between Vue plugin rules and ESLint 9's stricter type
requirements, where ESLint expects all rules to have type `RuleEntry<any[]>`,
but Vue plugin rules with empty schemas have type `RuleEntry<[]>`.

## Commands

### Development Commands

- `pnpm build` - Build the package
- `pnpm lint` - Run ESLint with auto-fix enabled
- `pnpm type-check` - Check TypeScript types
- `pnpm clean` - Remove dist folder and node_modules
- `pnpm prepack` - Full validation before publishing
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm precommit` - Run all pre-commit checks
- `pnpm publint` - Check package publishing readiness

## Code Style Guidelines

All code follows these conventions (enforced by .editorconfig and ESLint):

- **Indentation**: 2 spaces for TypeScript/JavaScript/JSON
- **Line Endings**: Unix (LF)
- **Charset**: UTF-8
- **Quotes**: Single quotes for strings
- **Semicolons**: Always use semicolons
- **Module System**: ES modules (`type: "module"`)
- **Arrow Functions**: Always use parentheses
- **Line Length**: Max 78 characters preferred
- **Comments**: Use TSDoc format for documentation
- **Naming**: camelCase for variables/functions, PascalCase for types/interfaces
- **Final Newline**: Always insert
- **Trailing Whitespace**: Always trim

## Development Practices

### Pre-commit Checklist (MANDATORY)

#### CRITICAL: THINK BEFORE YOU COMMIT - READ THIS SECTION TWICE

Before committing any changes, ALWAYS:

1. **Run `git status` and READ every file listed**
2. **Ask yourself: "Do ALL these files belong in this commit?"**
3. **If working on feature X, do NOT include unrelated feature Y files**
4. **NEVER stage files in bulk with `git add -A` or `git add .`**
5. `pnpm precommit` - Run all precommit checks (includes lint, type-check,
   test, build)
6. Fix any issues found by the precommit checks
7. If linter made automatic fixes, create fixup commits:
   - Use `git blame` to identify which commit introduced the code
   - Create fixup: `git commit -s --fixup=<commit-hash> path/to/file`
   - ALWAYS specify the file path, never rely on staged files
8. Update CHANGELOG.md under [Unreleased] section:
   - Add entries for new features under ### Added
   - Add entries for bug fixes under ### Fixed
   - Add entries for breaking changes under ### BREAKING CHANGES
   - Follow Keep a Changelog format
9. Update AGENT.md if guidelines change
10. Update README.md if public API changes
11. Review documentation formatting follows guidelines
12. Verify all imports are actually used (common linting issue)

### DO

- Run `pnpm lint` and `pnpm type-check` before committing
- Write tests for all new functionality
- Follow existing patterns
- Use semantic versioning for releases

### DON'T

- Create files unless necessary
- Add external dependencies without careful consideration
- Ignore TypeScript errors or ESLint warnings
- Skip pre-commit checks
- **NEVER DELETE FILES WITHOUT EXPLICIT PERMISSION**

## Git Workflow

### Direct Commits (MANDATORY - NO EXCEPTIONS)

#### 🚨 CRITICAL: NEVER use the staging area or commit without explicit files

#### FORBIDDEN commands that will commit unintended files

```bash
# NEVER DO THESE:
git commit                    # ❌ Commits everything staged
git commit -a                 # ❌ Stages and commits all tracked files
git add . && git commit       # ❌ Stages everything then commits
git commit --amend            # ❌ Will include whatever is staged
git commit --amend --no-edit  # ❌ Same problem, includes staged files
```

#### ALWAYS specify files directly in the commit command

```bash
# ALWAYS DO:
git add src/file1.ts src/file2.ts              # ✅ Explicit files only
git commit -sF .commit-msg file1.ts file2.ts   # ✅ Explicit files
git commit --amend -F .commit-msg file1.ts file2.ts  # ✅ Explicit files
```

### Commit Message Guidelines

- First line: type(scope): brief description (50 chars max)
- Blank line
- Body: what and why, not how (wrap at 72 chars)
- Use commit message files: Write to `.commit-msg-<descriptive-slug>`, then use
  `git commit -sF .commit-msg-<descriptive-slug>`
- Delete commit message files after use: `rm .commit-msg-<descriptive-slug>`
- For fixup commits: No message needed, just `git commit -s --fixup=<hash> file`

### TSDoc Guidelines

- Use backticks for code examples in TSDoc: `` `RuleEntry<any[]>` ``
- Escape @ symbols in TSDoc when not in backticks: `\@`
- Prefer TSDoc over JSDoc for TypeScript files
- Add TSDoc for all public APIs and complex internal functions

### Common Mistakes That Waste Credits (STRICT ENFORCEMENT)

**CRITICAL**: Using bare `git commit` without file arguments is the #1 mistake
that leads to committing unintended files. This is unacceptable and shows a lack
of attention to detail.

- Committing unrelated work (e.g., type fixes + unrelated documentation)
- Using `git add -A` or `git add .` instead of specific files
- Not reading `git status` output before committing
- Using `--amend` without explicit file lists
- Rushing commits without thoughtful review
- Staging files without verifying they belong in the commit
- Including test files in feature commits without reason
- Mixing refactoring with feature implementation

## Agent-Specific Instructions

### Claude Code-Specific Instructions

- Use TodoWrite tool for complex multi-step tasks
- **CRITICAL: Always enumerate files explicitly in git commit commands**
- **NEVER use bare `git commit` without file arguments**
- **ALWAYS run tests before marking a to-do as completed**
- Fix issues immediately without commentary
- Stay focused on the task at hand
- When creating PRs, ensure description includes:
  - Summary of changes (what and why)
  - Test plan with specific steps
  - Any breaking changes or migration notes
- Use PR body files: Write to `.pr-body-<descriptive-slug>`, then
  `gh pr create --title "..." --body-file .pr-body-<descriptive-slug>`
- Delete PR body files after use: `rm .pr-body-<descriptive-slug>`

### Universal Agent Guidelines

- Test changes thoroughly before considering tasks complete
- Follow the pre-commit checklist strictly
- Use Write tool for commit messages, not echo, -m, or heredocs
- NEVER USE `cd` IN BASH COMMANDS - NO EXCEPTIONS
- Always check for merge conflicts before committing
- Run `git status` before AND after commits to verify state

## Architecture

This is a TypeScript type definitions package that provides properly typed
definitions for eslint-plugin-vue rules compatible with ESLint 9.x. It exports
type definitions that can be used as a drop-in replacement for the default
eslint-plugin-vue types.

### Key Concepts

1. **Type Compatibility**: Resolves `RuleEntry<[]>` vs `RuleEntry<any[]>` issues
2. **Rule Definitions**: Complete type definitions for all Vue ESLint rules
3. **Plugin Interface**: Properly typed Vue plugin interface
4. **Configuration Types**: Vue ESLint configuration type definitions
5. **Drop-in Replacement**: Can be used via TypeScript path mapping or
   direct import

### Project Structure

```text
.
├── src/              # Source code
│   ├── configs/      # Configuration type definitions
│   │   └── index.ts  # Config types export
│   ├── types/        # Type definitions
│   │   ├── configs.ts    # Vue config types
│   │   ├── plugin.ts     # Vue plugin interface
│   │   └── rules.ts      # Rule definitions and options
│   ├── __tests__/    # Unit tests
│   │   └── types.test.ts # Type compatibility tests
│   ├── index.ts      # Main entry point
│   └── vue.ts        # Vue-specific exports
├── docs/             # Documentation
│   └── migration.md  # Migration guide from type-overrides
├── build.config.ts   # Build configuration
├── eslint.config.mts # Self-linting configuration
├── package.json      # Package manifest
└── tsconfig.json     # TypeScript configuration
```

### Type Exports

#### Main Exports (index.ts)

- Default export: Complete Vue plugin with proper types
- Named exports:
  - `VuePlugin` - Properly typed Vue plugin interface
  - `VueConfig` - Vue ESLint configuration type
  - `VueRuleDefinitions` - All Vue rule definitions

#### Rule Type Exports (types/rules.ts)

- `EmptyRuleOptions` - Type for rules with no options (`[{}]`)
- Individual rule option types (e.g., `VueArrayBracketNewline`, etc.)
- `VueRuleDefinitions` - Complete interface with all rules

#### Usage Methods

1. **TypeScript Path Mapping** (Recommended):

   ```json
   {
     "compilerOptions": {
       "paths": {
         "eslint-plugin-vue": ["node_modules/@poupe/eslint-plugin-vue-types"]
       }
     }
   }
   ```

2. **Direct Import**:

   ```typescript
   import vuePlugin from '@poupe/eslint-plugin-vue-types';
   ```

## Common Tasks

### Adding or Updating Rule Types

#### Step-by-Step Guide

1. **Update rule definitions** in `src/types/rules.ts`

   ```typescript
   // Add new rule option type
   export type VueNewRuleName =
     | []
     | [{ option1?: boolean; option2?: string }];

   // Add to VueRuleDefinitions interface
   export interface VueRuleDefinitions {
     // ... existing rules ...
     'vue/new-rule-name': RuleEntry<VueNewRuleName>;
   }
   ```

2. **Export from rules index** if needed

3. **Create tests** in `src/__tests__/types.test.ts`

   ```typescript
   it('should accept new-rule-name configurations', () => {
     const config: VueRuleDefinitions['vue/new-rule-name'] = 'error';
     const configWithOptions: VueRuleDefinitions['vue/new-rule-name'] =
       ['error', { option1: true }];

     expect(config).toBeDefined();
     expect(configWithOptions).toBeDefined();
   });
   ```

4. **Update documentation** if adding new features

### Updating from eslint-plugin-vue

When eslint-plugin-vue releases new versions with new rules:

1. **Check for new rules**:

   ```bash
   # Compare rule lists
   npm view eslint-plugin-vue@latest
   ```

2. **Analyze rule schemas** to determine option types

3. **Add new rule types** following the guide above

4. **Test compatibility** with ESLint 9.x

5. **Update version** in package.json dependencies

### Type Compatibility Testing

```bash
# Run type checks
pnpm type-check

# Test in example project
pnpm build
cd ../example-project
pnpm add -D file:../eslint-plugin-vue-types
pnpm type-check
```

### Building the Package

```bash
# Development build (stub)
pnpm dev:prepare

# Production build
pnpm build

# Clean and rebuild
pnpm clean && pnpm build
```

## Debugging Tips

1. **Build Issues**: Run `pnpm clean` then `pnpm build`
2. **Type Errors**: Check `tsconfig.json` references and paths
3. **Import Issues**: Verify exports in index.ts and package.json
4. **Test Failures**: Use `--reporter=verbose` flag
5. **ESLint Integration**: Test with real Vue files using the types

## Migration from type-overrides

For projects currently using the type-overrides hack:

1. Install this package:

   ```bash
   pnpm add -D @poupe/eslint-plugin-vue-types
   ```

2. Update tsconfig.json paths:

   ```json
   {
     "compilerOptions": {
       "paths": {
         "eslint-plugin-vue": ["node_modules/@poupe/eslint-plugin-vue-types"]
       }
     }
   }
   ```

3. Remove the old type-overrides directory

4. Run type-check to verify everything works

## Future Considerations

- Monitor eslint-plugin-vue for ESLint 9.x compatibility updates
- When Vue plugin updates types, this package may become obsolete
- Consider automating type generation from Vue plugin source
- Add CLI tool for updating types when Vue plugin updates
