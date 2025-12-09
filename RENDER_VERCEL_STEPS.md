# Complete Deployment Guide: Render + Vercel

## BEFORE YOU START - HAVE THESE READY:

1. **GitHub Account** - https://github.com
2. **Render Account** - https://render.com (Sign up with GitHub)
3. **Vercel Account** - https://vercel.com (Sign up with GitHub)
4. **Supabase Database URL** - Get from your Supabase project

---

## ✅ STEP 1: PUSH CODE TO GITHUB (REQUIRED FIRST)

### Why? 
Both Render and Vercel deploy directly from GitHub. They need your repo link!

### Do This:

1. **Go to GitHub.com**
   - Sign in to your account
   - Click **+** icon (top right) → **New repository**

2. **Create Repository:**
   - Repository name: `truestate`
   - Visibility: **Public** (important for free tier)
   - Click **Create repository**

3. **GitHub will show you commands. Copy and run in PowerShell:**
   ```powershell
   cd d:\TrueStateAssignment
   git remote add origin https://github.com/YOUR_USERNAME/truestate.git
   git branch -M main
   git push -u origin main
   ```
   
   **⚠️ REPLACE `YOUR_USERNAME` with your actual GitHub username!**

4. **Verify:**
   - Go to `https://github.com/YOUR_USERNAME/truestate`
   - You should see all your files there

---

## 🔗 YOU NOW HAVE:
**GitHub Repo Link:** `https://github.com/YOUR_USERNAME/truestate`

---

## ⚡ STEP 2: DEPLOY BACKEND ON RENDER

### Part A: Create Render Account

1. Go to https://render.com
2. Click **Sign up**
3. Choose **Sign up with GitHub**
4. Authorize access to your GitHub account
5. ✅ You're logged in

### Part B: Deploy Backend

1. **In Render Dashboard:**
   - Click **New +** (top right)
   - Select **Web Service**

2. **Connect Repository:**
   - Click **Connect GitHub**
   - Find and click on your `truestate` repository
   - Click **Connect**

3. **Configure Service:**
   - **Name:** `truestate-api`
   - **Environment:** Python 3
   - **Build Command:** 
     ```
     pip install -r backend_python/requirements.txt
     ```
   - **Start Command:** 
     ```
     python backend_python/run.py
     ```
   - **Plan:** Free (select it)

4. **Add Environment Variables:**
   - Click **Environment**
   - Click **Add Environment Variable**
   - **Key:** `DATABASE_URL`
   - **Value:** Paste your Supabase connection string
     - Get it from: Supabase → Your Project → Settings → Database → Connection String → URI
   - Click **Add Environment Variable**

5. **Deploy:**
   - Click **Create Web Service**
   - Wait 2-3 minutes for deployment
   - You'll see "Your service is live!" ✅

6. **Copy Your Backend URL:**
   - It looks like: `https://truestate-api.onrender.com`
   - **SAVE THIS - YOU'LL NEED IT FOR VERCEL**

---

## 📱 YOU NOW HAVE:
**Backend URL:** `https://truestate-api.onrender.com`

---

## 🚀 STEP 3: DEPLOY FRONTEND ON VERCEL

### Part A: Create Vercel Account

1. Go to https://vercel.com
2. Click **Sign up**
3. Choose **Continue with GitHub**
4. Authorize access
5. ✅ You're logged in

### Part B: Deploy Frontend

1. **In Vercel Dashboard:**
   - You should see "Import Project"
   - OR click **Add New...** → **Project**

2. **Import Your Repository:**
   - Search for `truestate`
   - Click on your repository
   - Click **Import**

3. **Configure Project:**
   - **Project Name:** `truestate` (or any name)
   - **Framework Preset:** Vite
   - **Root Directory:** `./frontend`
   - Leave others as default

4. **Add Environment Variables:**
   - Click **Environment Variables**
   - Add New:
     - **Name:** `VITE_API_BASE_URL`
     - **Value:** `https://truestate-api.onrender.com/api`
       - Replace with your actual Render backend URL
     - Click **Add**

5. **Deploy:**
   - Click **Deploy**
   - Wait 1-2 minutes
   - You'll see "Congratulations! Your site is ready" ✅

6. **Copy Your Frontend URL:**
   - It looks like: `https://truestate.vercel.app`
   - **THIS IS YOUR LIVE WEBSITE!**

---

## 📊 YOU NOW HAVE:

**Frontend URL (Your App):** `https://truestate.vercel.app`
**Backend URL (API):** `https://truestate-api.onrender.com`

---

## ✨ TEST YOUR DEPLOYMENT

1. **Open your frontend URL:** `https://truestate.vercel.app`
2. **Try to search or filter data**
3. **If you see transaction data:** 🎉 **SUCCESS!**

---

## 🔄 MAKING UPDATES

**To update your deployed app:**

1. Make changes locally
2. Test locally
3. **Git commands:**
   ```powershell
   cd d:\TrueStateAssignment
   git add .
   git commit -m "Your message"
   git push origin main
   ```
4. **Render & Vercel auto-deploy** in 1-2 minutes ✅

---

## ⚠️ TROUBLESHOOTING

### **Backend won't deploy:**
- Check Build Command is correct
- Check DATABASE_URL is set
- Check logs in Render dashboard

### **Frontend shows blank:**
- Check VITE_API_BASE_URL is correct
- Check backend is running (visit the backend URL)
- Clear browser cache (Ctrl+Shift+Delete)

### **Data not showing in app:**
- Open browser DevTools (F12)
- Go to Console tab
- Look for red errors
- Check if backend URL is correct

---

## 📋 QUICK CHECKLIST

- [ ] GitHub account created
- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub (`git push`)
- [ ] Render account created
- [ ] Backend deployed on Render
- [ ] Render backend URL copied
- [ ] Vercel account created
- [ ] Frontend deployed on Vercel
- [ ] Environment variable added to Vercel
- [ ] Vercel deployment complete
- [ ] Tested frontend URL in browser
- [ ] Saw transaction data ✅

---

## 🎉 YOU'RE DONE!

Your app is now **LIVE ON THE INTERNET**!

**Share your app URL:** `https://truestate.vercel.app`

Every time you `git push`, your app auto-updates!

