# 🎯 DEPLOYMENT CHECKLIST - What You Need

## Required Accounts (All FREE)

| Platform | Why | Link | Time |
|----------|-----|------|------|
| GitHub | To store code | https://github.com | 2 min |
| Render | Backend server | https://render.com | 2 min |
| Vercel | Frontend hosting | https://vercel.com | 2 min |
| Supabase | Database (optional) | https://supabase.com | Already have? |

---

## Information You NEED to Have Ready

### 1. **GitHub Information**
```
GitHub Username: [YOUR USERNAME]
GitHub Repository Link: https://github.com/YOUR_USERNAME/truestate
GitHub Personal Access Token: (if needed, generate from Settings)
```

### 2. **Supabase Database URL**
```
Where to get it:
1. Go to your Supabase project dashboard
2. Settings → Database → Connection String
3. Copy the URI (looks like):
   postgresql://postgres.xxxxx:password@db.xxxxx.supabase.co:5432/postgres
```

### 3. **Render Backend Deployment**
```
What to fill in:
- Service Name: truestate-api
- Build Command: pip install -r backend_python/requirements.txt
- Start Command: python backend_python/run.py
- Environment Variable DATABASE_URL: [PASTE YOUR SUPABASE URL]

You'll get:
- Backend URL: https://truestate-api.onrender.com
```

### 4. **Vercel Frontend Deployment**
```
What to fill in:
- Project Name: truestate
- Root Directory: ./frontend
- Framework: Vite
- Environment Variable VITE_API_BASE_URL: https://truestate-api.onrender.com/api

You'll get:
- Frontend URL: https://truestate.vercel.app
```

---

## Step-by-Step Timeline

### **5 Minutes - Create Accounts**
- [ ] GitHub account
- [ ] Render account (via GitHub)
- [ ] Vercel account (via GitHub)

### **5 Minutes - Push to GitHub**
```powershell
git remote add origin https://github.com/YOUR_USERNAME/truestate.git
git branch -M main
git push -u origin main
```

### **5 Minutes - Deploy Backend**
1. Go to Render.com
2. New Web Service
3. Select your GitHub repo
4. Fill in commands above
5. Add DATABASE_URL
6. Click Deploy
7. **Get your Backend URL**

### **5 Minutes - Deploy Frontend**
1. Go to Vercel.com
2. Import project
3. Select `truestate` repo
4. Set Root Directory to `./frontend`
5. Add VITE_API_BASE_URL (with your Render URL)
6. Click Deploy
7. **Get your Frontend URL**

### **Total Time: 20 MINUTES** ⏱️

---

## The Commands You'll Run

### First Time Only:
```powershell
cd d:\TrueStateAssignment

# Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/truestate.git
git branch -M main

# Push code
git push -u origin main
```

### Every Update After:
```powershell
cd d:\TrueStateAssignment

# Make your changes, then:
git add .
git commit -m "Your message"
git push origin main

# That's it! Render & Vercel auto-deploy!
```

---

## What Happens After You Deploy

### Auto-Deploy on Every Push
- You push code to GitHub
- Render sees the change → rebuilds backend → deploys
- Vercel sees the change → rebuilds frontend → deploys
- Both update within 1-2 minutes ✅

### No Manual Steps Needed!
- No FTP
- No SSH
- No manual uploads
- Everything automatic!

---

## Your Final URLs

After deployment, you'll have:

```
🌐 Frontend (Your App):
   https://truestate.vercel.app

🔌 Backend API:
   https://truestate-api.onrender.com

📊 Database:
   Your Supabase project
```

---

## Common Mistakes to Avoid

❌ **Mistake:** Forgetting to set DATABASE_URL
✅ **Solution:** Copy from Supabase → Paste in Render env vars

❌ **Mistake:** Wrong Root Directory for frontend (don't set it to root)
✅ **Solution:** Set to `./frontend`

❌ **Mistake:** Forgetting VITE_API_BASE_URL in Vercel
✅ **Solution:** Add it with your Render backend URL + `/api`

❌ **Mistake:** Using `http://localhost` in production
✅ **Solution:** Use full `https://` URL from Render

---

## Need Help?

Check the logs:
- **Render:** Dashboard → Your Service → Logs
- **Vercel:** Dashboard → Your Project → Deployments → Logs

---

## You're Ready! 🚀

Follow RENDER_VERCEL_STEPS.md for the detailed walkthrough!
