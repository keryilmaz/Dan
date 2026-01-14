# GoDaddy Deployment Guide for dan.kaaneryilmaz.com

## Step 1: Create Subdomain in GoDaddy Hosting

1. Log into your **GoDaddy account**
2. Go to **My Products** → **Web Hosting** → **Manage**
3. Find **Subdomains** or **Subdomain Manager**
4. Click **Create Subdomain** or **Add**
5. Enter: `dan`
6. Document root should be: `dan` or `public_html/dan` (note this path!)
7. Click **Create** or **OK**

## Step 2: Add DNS Record (if not auto-created)

1. Go to **My Products** → **DNS** (or **Domains** → **Manage DNS**)
2. Find your domain: `kaaneryilmaz.com`
3. Look for existing `dan` record:
   - If it exists, you're good! ✅
   - If not, continue below
4. Click **Add** to create new record:
   - **Type**: A Record (or CNAME if your host provides one)
   - **Name**: `dan`
   - **Value**: Your hosting IP address (found in hosting details)
     - OR use: `@` if same as main domain
     - OR use the CNAME target if provided by GoDaddy
   - **TTL**: 600 (or default)
5. Click **Save**

## Step 3: Upload Files

You need to upload these 3 files to the subdomain directory:

**Files to upload:**
- `index.html`
- `styles.css`
- `script.js`

**Upload location:**
- If subdomain root is `dan`: Upload to `/dan/` directory
- If subdomain root is `public_html/dan`: Upload to `/public_html/dan/` directory

**Upload methods:**

### Option A: GoDaddy File Manager
1. Go to **My Products** → **Web Hosting** → **Manage**
2. Click **File Manager**
3. Navigate to the `dan` folder (or `public_html/dan`)
4. Upload the 3 files: `index.html`, `styles.css`, `script.js`

### Option B: FTP (if you have credentials)
1. Use FTP client (FileZilla, Cyberduck, etc.)
2. Connect using your hosting FTP credentials
3. Navigate to `/dan/` or `/public_html/dan/`
4. Upload the 3 files

## Step 4: Verify

1. Wait 5-10 minutes for DNS to propagate
2. Visit: `http://dan.kaaneryilmaz.com`
3. Check that the site loads correctly
4. Test all functionality (theme toggle, modals, etc.)

## Troubleshooting

**Site not loading?**
- Check DNS propagation: https://www.whatsmydns.net/#A/dan.kaaneryilmaz.com
- Verify files are in correct directory
- Check file permissions (should be 644)

**404 Error?**
- Ensure `index.html` is in the subdomain root directory
- Check subdomain document root path matches file location

**Styles/JS not loading?**
- Verify all 3 files are uploaded
- Check file paths in browser console (F12)
