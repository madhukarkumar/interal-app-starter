# Agent Instructions for Full Stack Starter Pack

## Commands
- **Build**: `pnpm run build` (uses vite, includes search index generation)
- **Dev**: `pnpm run dev` (vite dev server)
- **Test**: `pnpm run test` (vitest watch mode) or `pnpm run test_run` (single run)
- **Single test**: `pnpm run test -- filename.test.ts` or `vitest run filename.test.ts`
- **Lint**: `pnpm run lint` (ESLint)
- **Format**: `pnpm run format` (write) or `pnpm run format_check` (check only)
- **Type check**: `pnpm run check` or `pnpm run check:watch` (svelte-check)
- **Package manager**: Use pnpm for all package management

## Architecture
SvelteKit full-stack app with TypeScript, Supabase backend, Stripe payments, and email via Resend.
- **Frontend**: SvelteKit 2.0 + Svelte 5 + TypeScript + TailwindCSS + DaisyUI + Bits UI components
- **Backend**: Supabase (auth, database, RLS) with server hooks
- **Payments**: Stripe integration with webhooks
- **Email**: Resend for transactional emails
- **Testing**: Vitest with globals enabled, jsdom for DOM testing
- **Theming**: DaisyUI with Nord theme enabled
- **Structure**: `src/routes/` (pages with (admin)/(marketing) groups), `src/lib/` (utilities, components, schemas), `supabase/` (migrations, config)

## Code Style
- **Formatting**: Prettier with 2 spaces, no semicolons, prettier-plugin-svelte
- **Linting**: ESLint + TypeScript + Svelte plugins, relaxed @typescript-eslint/no-explicit-any in tests
- **Imports**: Use `$lib/` prefix for internal imports, ES modules
- **Types**: Strict TypeScript with checkJs, vitest globals enabled
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Error handling**: Use Zod schemas for validation, superforms for form handling
