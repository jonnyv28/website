# 📧 Resend Email Setup - Quick Start

Your contact form is configured and ready! Follow these 3 simple steps:

## ✅ Step 1: Sign up for Resend (2 minutes)

1. Visit: https://resend.com/signup
2. Create a free account
3. Navigate to "API Keys" 
4. Click "Create API Key"
5. **Copy** your API key (starts with `re_`)

## ✅ Step 2: Configure Your Project (1 minute)

Create a file named `.env.local` in the `boxzooka-blue` folder with:

```env
RESEND_API_KEY=re_paste_your_key_here
CONTACT_EMAIL=your-email@jvlogisticsgroup.com
```

Replace:
- `re_paste_your_key_here` with your actual Resend API key
- `your-email@jvlogisticsgroup.com` with where you want to receive inquiries

## ✅ Step 3: Test It! (1 minute)

1. Restart the dev server in terminal:
   ```bash
   cd boxzooka-blue
   bun run dev
   ```

2. Go to your website and fill out the contact form

3. Check your email inbox! 🎉

---

## 📝 What Emails Look Like

You'll receive beautifully formatted emails with:
- Professional blue JV Logistics Group branding
- All customer details (name, company, phone, email)
- Their service interest (Storage, Crossdocking, etc.)
- Their message
- Timestamp in Arizona time
- Clickable phone and email links

---

## 🚀 For Production (When Deploying)

When you deploy your site, make sure to add these environment variables to your deployment platform:

- `RESEND_API_KEY`
- `CONTACT_EMAIL`

---

## ✨ Bonus: Custom Email Address

Want emails to come FROM `contact@jvlogisticsgroup.com`?

1. In Resend, go to **Domains**
2. Add `jvlogisticsgroup.com`
3. Add the DNS records they provide
4. Add to `.env.local`:
   ```env
   RESEND_FROM_EMAIL=contact@jvlogisticsgroup.com
   ```

---

## ❓ Need Help?

- Check Resend logs: https://resend.com/logs
- Email Same support: support@same.new
- Resend docs: https://resend.com/docs

