# Waitlist Mode

This website includes a waitlist mode that restricts access to only the `/launch-access` page, redirecting all other routes to the waitlist.

## Enabling/Disabling Waitlist Mode

Waitlist mode is controlled by a single environment variable: `NEXT_PUBLIC_WAITLIST_MODE`

### To Enable Waitlist Mode (Development):
Edit `.env.development.local` and set:
```
NEXT_PUBLIC_WAITLIST_MODE='true'
```
Then restart the dev server.

### To Disable Waitlist Mode (Back to Normal):
Edit `.env.development.local` and set:
```
NEXT_PUBLIC_WAITLIST_MODE='false'
```
Then restart the dev server.

### For Production:
Add the environment variable to your Vercel project settings:
- Go to **Project Settings** → **Environment Variables**
- Add `NEXT_PUBLIC_WAITLIST_MODE` with value `true` or `false`
- Redeploy to apply changes

## How It Works

The middleware (`middleware.ts`) intercepts all requests and:
- Allows access to `/launch-access` (the waitlist page)
- Allows API routes (`/api/*`) to pass through
- Allows static assets and Next.js internals to pass through
- Redirects all other routes to `/launch-access`

## What's Preserved

All existing pages and routes remain intact and functional:
- `app/page.tsx` - Home page (redirected when waitlist mode is on)
- `app/launch-access/page.tsx` - Waitlist page (always accessible)
- All API endpoints continue to work

When you disable waitlist mode, everything returns to normal immediately.
