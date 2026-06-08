# 🚀 Start Here — Setup Guide

This is your JV Logistics Group website, cleaned up and ready to manage with
**Claude Code**, hosted on **GitHub**, and published live by **Vercel**.

You don't need to memorize anything technical. The trick is: once Claude Code
is running, you mostly just *type requests in plain English*.

---

## ⚠️ Step 0 — Rotate your exposed keys (do this first)

The original zip contained live API keys. Treat them as compromised and
regenerate new ones:

- **Supabase service role key** → Supabase dashboard → Project Settings → API → "Reset"
- **Resend API key** → Resend dashboard → API Keys → revoke old, create new
- **Database password** → Supabase → Project Settings → Database → reset password

You'll paste the *new* values into `.env.local` (Step 3) and later into Vercel.

---

## Step 1 — Install the tools

1. **Claude Desktop app** — friendlier home base.
2. **Claude Code** — follow the installer. Sign in with your Claude account.

When Claude Code opens, it will ask which folder to work in. That's the next step.

---

## Step 2 — Put this project in a folder

1. Unzip this project somewhere easy to find, e.g. `Documents/jv-logistics-website`.
2. In Claude Code, open that folder (it'll prompt you, or you point it there).

---

## Step 3 — Add your secret keys

1. Find the file `.env.example` in this folder.
2. Make a copy of it and rename the copy to **`.env.local`**.
3. Open `.env.local` and paste in your NEW keys from Step 0.
4. Save. (This file stays private — it's already set to never upload to GitHub.)

---

## Step 4 — Let Claude Code do the technical setup

Open Claude Code in this folder and paste this request:

> "Install the project dependencies with npm, then start the dev server so I
> can see the site locally. Walk me through anything you need from me."

Then, when you're ready to go live, paste:

> "Help me put this project on GitHub and deploy it to Vercel. I'm a beginner,
> so explain each step and do the technical parts for me. Remind me to add my
> environment variables in the Vercel dashboard."

---

## Step 5 — Build new features

Once it's live, you can ask Claude Code things like:
- "Add user accounts and login using Supabase Auth."
- "Add Stripe payments to the booking flow."
- "Help me clean up and improve how bookings are stored in the database."

Recommended order: **accounts/login first**, then payments, then data cleanup —
because the other two work better once the app knows who each user is.

---

## What's what (quick reference)

| Folder / file            | What it is                                  |
|--------------------------|---------------------------------------------|
| `src/app/page.tsx`       | Your homepage                               |
| `src/app/services/`      | Services page                               |
| `src/app/booking/`       | Booking page                                |
| `src/app/warehouse/`     | Warehouse page                              |
| `src/app/admin/`         | Admin dashboard                             |
| `src/app/api/`           | Backend logic (contacts, bookings, spaces)  |
| `src/lib/supabase.ts`    | Database connection + data types            |
| `.env.local`             | Your private keys (you create this)         |
| `.env.example`           | Template showing which keys are needed      |
