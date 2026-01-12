# Quick Deploy - V1 Frontend

## 🚀 Fast Track Deployment (5 minutes)

### Using Vercel (Recommended)

```bash
# 1. Install Vercel CLI (one-time)
npm install -g vercel

# 2. Navigate to V1 frontend
cd "k:\Scoutung platform\v1\user-frontend-main\user-frontend-main"

# 3. Login to Vercel
vercel login

# 4. Deploy to production
vercel --prod
```

**Follow prompts:**
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? `idasports-v1` (or your choice)
- Directory? **./** (press Enter)
- Override settings? **N**

**After deployment:**
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add: `REACT_APP_BACKEND_URL` = `https://api.idasports.io/api`
3. Go to Domains → Add Domain → `idasports.io` and `www.idasports.io`
4. Redeploy: `vercel --prod`

---

### Using Traditional Server

```bash
# 1. Build
cd "k:\Scoutung platform\v1\user-frontend-main\user-frontend-main"
npm run build

# 2. Upload build folder to server
# The build folder will be at:
# k:\Scoutung platform\v1\user-frontend-main\user-frontend-main\build\

# 3. Configure web server (Nginx example above)
```

---

## ✅ Quick Verification

After deployment, visit: https://idasports.io

**Test:**
1. Site loads ✓
2. No console errors ✓
3. Try registration ✓
4. Check Network tab - requests go to `api.idasports.io` ✓

Done! 🎉
