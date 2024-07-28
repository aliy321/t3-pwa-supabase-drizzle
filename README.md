# Create T3 App

### This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

\
Checklist

-   [x] Create Pwa Pop up

-   [x] Use supabase auth

-   [x] Created Protected Route

-   [x] Add Resend

-   [x] Add view transition

-   [x] Fix sitemap, robots, error, not found etc. pages

-   [x] Add Stripe Element

-   [ ] Detect user currently on the page or left

-   [ ] Trigger default system prompt

    -   [ ] Push Notification

    -   [ ] Location

    -   [ ] \[ \]

-   [ ] Database Schema

## Logo

To change logo, check `"/component/logo.tsx"` to update the svg. All usage for logo should be centralized for easier changes.

## OG Image

To change og image, check `"/public/opengraph-image.png"` and replace with new one, take note to keep the same name.

## Stripe CLI local webhook

[Install the Stripe CLI](https://stripe.com/docs/stripe-cli) and [link your Stripe account](https://stripe.com/docs/stripe-cli#login-account).

Next, start local webhook forwarding:

```bash
stripe listen --forward-to=localhost:3000/api/stripe
```

Running this Stripe command will print a webhook secret (such as, `whsec_***`) to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in your `.env.local` file.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

-   [Next.js](https://nextjs.org)
-   [NextAuth.js](https://next-auth.js.org)
-   [Prisma](https://prisma.io)
-   [Drizzle](https://orm.drizzle.team)
-   [Tailwind CSS](https://tailwindcss.com)
-   [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

-   [Documentation](https://create.t3.gg/)
-   [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

# t3-pwa-supabase-drizzle
