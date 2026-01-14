# Deployment Guide for dan.kaaneryilmaz.com

## Files to Deploy

The following files need to be uploaded to your web server:

- `index.html` (main file)
- `styles.css`
- `script.js`

## Deployment Options

### Option 1: GitHub Pages with Custom Domain

1. Go to your GitHub repository settings
2. Navigate to "Pages" section
3. Select "main" branch as source
4. Add custom domain: `dan.kaaneryilmaz.com`
5. Add a `CNAME` file in the root with: `dan.kaaneryilmaz.com`
6. Update your DNS to point to GitHub Pages

### Option 2: Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: (none needed - static site)
3. Set publish directory: `/` (root)
4. Add custom domain: `dan.kaaneryilmaz.com`
5. Update DNS records as instructed by Netlify

### Option 3: Traditional Web Hosting (FTP/SFTP)

1. Upload all files to your web server's public directory
2. Ensure `index.html` is in the root directory
3. Set proper file permissions (644 for files, 755 for directories)

### Option 4: Vercel

1. Import your GitHub repository
2. No build step needed (static site)
3. Add custom domain: `dan.kaaneryilmaz.com`
4. Update DNS as instructed

## DNS Configuration

For custom domain setup, you'll need to add DNS records:

- **A Record** or **CNAME**: Point `dan.kaaneryilmaz.com` to your hosting provider's IP or domain
- **CNAME**: If using GitHub Pages/Netlify/Vercel, use their provided CNAME target

## Testing

After deployment, test:
- [ ] Site loads at dan.kaaneryilmaz.com
- [ ] All styles load correctly
- [ ] JavaScript functionality works
- [ ] Theme toggle works
- [ ] Modal popups work
- [ ] Local storage saves correctly
