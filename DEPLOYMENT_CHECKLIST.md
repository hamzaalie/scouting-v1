# V1 Frontend - Production Deployment Checklist

## ✅ Pre-Deployment Verification

### 1. Environment Configuration
- [x] `.env.production` created with production API URL
- [x] API points to `https://api.idasports.io/api`
- [ ] Verify no hardcoded localhost URLs in code

### 2. API Integration Check
- [x] API service configured (`api.service.ts`)
- [x] Token management implemented
- [x] Refresh token flow implemented
- [x] Auth endpoints ready:
  - Register
  - Login
  - Verify Email
  - Forgot Password
  - Reset Password
  - Logout
- [x] Subscriptions API ready
- [x] Payments API ready

### 3. Build Test
```bash
# Test production build locally
cd v1/user-frontend-main/user-frontend-main
npm run build

# The build should complete without errors
# Check build/static folder is created
```

---

## 🚀 Deployment Options

### Option A: Vercel (Recommended - Easiest)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd v1/user-frontend-main/user-frontend-main
   vercel --prod
   ```

4. **Configure Domain**
   - In Vercel Dashboard → Project Settings → Domains
   - Add: `idasports.io` and `www.idasports.io`
   - Follow DNS instructions

5. **Set Environment Variables**
   - Project Settings → Environment Variables
   - Add: `REACT_APP_BACKEND_URL` = `https://api.idasports.io/api`
   - Redeploy to apply changes

**DNS Configuration:**
```
Type    Name    Value                       TTL
CNAME   @       cname.vercel-dns.com        300
CNAME   www     cname.vercel-dns.com        300
```

---

### Option B: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   cd v1/user-frontend-main/user-frontend-main
   npm run build
   netlify deploy --prod --dir=build
   ```

4. **Configure Domain & Environment**
   - Add domain in Netlify dashboard
   - Set environment variable: `REACT_APP_BACKEND_URL`

---

### Option C: Self-Hosted (Traditional Server)

1. **Build**
   ```bash
   cd v1/user-frontend-main/user-frontend-main
   npm run build
   ```

2. **Upload to Server**
   ```bash
   # Via SCP
   scp -r build/* user@your-server:/var/www/idasports.io/

   # Or via FTP/SFTP
   # Upload contents of build/ folder to /var/www/idasports.io/
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name idasports.io www.idasports.io;
       root /var/www/idasports.io;
       index index.html;

       # React Router support
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache static assets
       location /static/ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

4. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/idasports.io /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. **SSL Certificate**
   ```bash
   sudo certbot --nginx -d idasports.io -d www.idasports.io
   ```

**DNS Configuration:**
```
Type    Name    Value              TTL
A       @       YOUR_SERVER_IP     300
A       www     YOUR_SERVER_IP     300
```

---

## 🧪 Testing After Deployment

### 1. Basic Checks
- [ ] Visit https://idasports.io - Site loads
- [ ] Visit https://www.idasports.io - Redirects or loads
- [ ] No console errors in browser
- [ ] All pages load correctly

### 2. Registration Flow
```
1. Go to /auth/register
2. Fill in email & password
3. Click Register
4. Check for success message
5. Check email inbox for verification
6. Click verification link
7. Verify redirects to login or success page
```

### 3. Login Flow
```
1. Go to /auth/login
2. Enter verified email & password
3. Click Login
4. Should receive JWT tokens
5. Should redirect to dashboard/home
6. Check localStorage has tokens:
   - access_token
   - refresh_token
   - user
```

### 4. API Connection Test
**Open browser console and run:**
```javascript
// Check environment
console.log('API URL:', process.env.REACT_APP_BACKEND_URL);

// Test API call
fetch('https://api.idasports.io/api/health')
  .then(r => r.json())
  .then(console.log);
```

### 5. Network Tab Verification
- [ ] Open DevTools → Network tab
- [ ] Perform login
- [ ] Verify requests go to `api.idasports.io`
- [ ] Check response status codes (200, 201)
- [ ] Verify CORS headers present

---

## 🔧 Troubleshooting

### Issue: CORS Error
**Symptoms:** "Access to fetch at 'https://api.idasports.io' has been blocked by CORS policy"

**Fix:**
1. Check central backend `.env.production` has:
   ```
   V1_URL=https://idasports.io,https://www.idasports.io
   ```
2. Restart backend: `pm2 restart central-backend`
3. Clear browser cache

### Issue: API URL Not Updating
**Symptoms:** Still calling localhost in production

**Fix:**
1. Verify `.env.production` exists
2. Rebuild: `npm run build`
3. Redeploy
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue: 404 on Page Refresh
**Symptoms:** Direct URL access works, but refresh gives 404

**Fix (Nginx):**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Fix (Vercel/Netlify):**
Create `public/_redirects` (Netlify) or `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Issue: White Screen
**Symptoms:** Production site shows blank page

**Fix:**
1. Check browser console for errors
2. Verify `homepage` in package.json:
   ```json
   "homepage": "/"
   ```
3. Check if build files exist
4. Verify environment variables loaded

---

## 📊 Post-Deployment Monitoring

### Health Checks
```bash
# Frontend
curl -I https://idasports.io
# Should return 200 OK

# Backend API
curl https://api.idasports.io/api/health
# Should return {"status":"ok"}
```

### Analytics (Optional)
- Add Google Analytics to track usage
- Set up error monitoring (Sentry)
- Monitor API response times

---

## 🔄 Update Process

### For Code Changes
```bash
# 1. Make changes
# 2. Test locally
npm start

# 3. Build
npm run build

# 4. Deploy
# Vercel/Netlify: Just push to git (auto-deploys)
# Self-hosted: Upload build folder

# 5. Verify deployment
curl -I https://idasports.io
```

### For Environment Changes
1. Update `.env.production`
2. Rebuild and redeploy
3. For Vercel/Netlify: Update env vars in dashboard

---

## ✅ V1 Deployment Complete When:

- [ ] Site accessible at https://idasports.io
- [ ] No console errors
- [ ] Registration works & sends email
- [ ] Login works & returns tokens
- [ ] Protected routes require authentication
- [ ] Subscription pages load
- [ ] Payment flow works (test mode)
- [ ] API calls go to production backend
- [ ] SSL certificate valid
- [ ] All images/assets load

---

## 📞 Need Help?

**Common Commands:**
```bash
# Check build size
du -sh build/

# Test production build locally
npx serve -s build -l 3001

# View production in browser
# http://localhost:3001

# Check for bundle issues
npm run build -- --stats
```

**Useful Links:**
- Backend API Docs: https://api.idasports.io/api/docs
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- React Deployment: https://create-react-app.dev/docs/deployment

---

## 🎯 Next Steps After V1 Deployment

1. ✅ Deploy M3 Frontend (app.idasports.io)
2. ✅ Deploy Admin Panel (admin.idasports.io)
3. Test payment flows with real transactions
4. Set up monitoring and alerts
5. Configure backup procedures
6. Plan content updates
