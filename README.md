This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Vercel Blob Client Uploads Setup

To avoid Vercel Serverless Function 4.5MB request body limitations, portfolio photos and videos in `InfluencerApplyForm` are uploaded directly from the client's browser to **Vercel Blob storage** using `@vercel/blob/client`. Only the returned public file URLs are submitted via JSON to `/api/partners/influencer`.

### 1. Setting up Vercel Blob in Vercel Dashboard
1. Go to your project dashboard on [Vercel](https://vercel.com).
2. Navigate to the **Storage** tab in the sidebar and click **Create Database** > **Blob**.
3. Name your store (e.g. `collabo-media`), set the access to **Public**, and click **Create a new Blob store**.
4. In the store's settings, connect it to your project. Vercel automatically configures the environment variable `BLOB_READ_WRITE_TOKEN` in **Project Settings > Environment Variables** for **Production** and **Preview** environments.

### 2. Setting up Local Development (.env.local)
To test Blob uploads on your local machine:
- Run the Vercel CLI to pull the token into your local environment:
  ```bash
  vercel env pull .env.local
  ```
- Or copy `BLOB_READ_WRITE_TOKEN` directly from the Vercel Dashboard (Project Settings > Environment Variables) and paste it into `.env.local`:
  ```bash
  BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
  ```

