# Vercel Deployment Guide for dan.kaaneryilmaz.com

## Step 1: Deploy to Vercel

### Option A: Via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"Add New Project"**
3. Import your GitHub repository: `keryilmaz/Dan`
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (root)
   - **Build Command**: (leave empty - static site)
   - **Output Directory**: (leave empty)
5. Click **Deploy**

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
```
Follow the prompts to deploy.

## Step 2: Add Custom Domain

1. In your Vercel project dashboard, go to **Settings** → **Domains**
2. Click **Add Domain**
3. Enter: `dan.kaaneryilmaz.com`
4. Click **Add**

## Step 3: Configure DNS in GoDaddy

Vercel will show you the DNS records needed. Typically:

1. Go to **GoDaddy** → **My Products** → **DNS** (or **Domains** → **Manage DNS**)
2. Find your domain: `kaaneryilmaz.com`
3. Add a new record:
   - **Type**: CNAME
   - **Name**: `dan`
   - **Value**: `cname.vercel-dns.com` (or the value Vercel provides)
   - **TTL**: 600
4. Click **Save**

## Step 4: Verify

1. Wait 5-10 minutes for DNS propagation
2. Vercel will automatically provision SSL certificate
3. Visit: `https://dan.kaaneryilmaz.com`
4. Your site should be live! 🎉

## Automatic Deployments

Vercel will automatically deploy when you push to your GitHub repository's main branch.

## Troubleshooting

**Domain not working?**
- Check DNS propagation: https://www.whatsmydns.net/#CNAME/dan.kaaneryilmaz.com
- Verify CNAME record in GoDaddy DNS settings
- Check Vercel domain status in project settings

**Need to update?**
- Just push to GitHub main branch
- Vercel will auto-deploy
