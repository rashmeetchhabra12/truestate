# Deployment Guide - TruEstate Sales Management System

## Part 1: Adding to GitHub

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Sign in or create an account
3. Click the **+** icon in the top right → **New repository**
4. Fill in:
   - **Repository name**: `truestate` (or any name you prefer)
   - **Description**: TruEstate Sales Management System
   - **Visibility**: Public (for deployment) or Private (for personal use)
   - **Initialize repository**: Leave unchecked (we already have git initialized)
5. Click **Create repository**

### Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you the commands. Copy and run these in PowerShell:

```powershell
cd d:\TrueStateAssignment
git remote add origin https://github.com/YOUR_USERNAME/truestate.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

### Step 3: Verify Upload

- Go to your GitHub repository URL: `https://github.com/YOUR_USERNAME/truestate`
- You should see all your files there ✅

---

## Part 2: Backend Deployment

Choose one of these platforms:

### Option A: Deploy Backend on Railway (Recommended - Free & Easy)

#### Step 1: Set Up Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your `truestate` repository
5. Railway will auto-detect it's a Python project

#### Step 2: Configure Environment Variables
1. In Railway dashboard, go to **Variables**
2. Add these environment variables:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/dbname
   PORT=8080
   ```
3. Get your actual DATABASE_URL from Supabase:
   - Go to [supabase.com](https://supabase.com)
   - Create a project or use existing one
   - Go to **Settings** → **Database** → **Connection string** → Copy the full URL

#### Step 3: Deploy
1. Railway will automatically deploy when you push to GitHub
2. Once deployed, you'll get a public URL like: `https://truestate-production.up.railway.app`
3. Copy this URL

#### Step 4: Update Frontend with Backend URL
- In your frontend `.env` file, update:
  ```
  VITE_API_BASE_URL=https://your-railway-url/api
  ```

---

### Option B: Deploy Backend on Heroku (Free tier limited)

#### Step 1: Install Heroku CLI
```powershell
# Download from https://devcenter.heroku.com/articles/heroku-command-line
# Or use chocolatey
choco install heroku-cli
```

#### Step 2: Login to Heroku
```powershell
heroku login
```

#### Step 3: Create Heroku App
```powershell
cd d:\TrueStateAssignment
heroku create your-app-name
```

#### Step 4: Add Environment Variables
```powershell
heroku config:set DATABASE_URL="your_database_url"
```

#### Step 5: Add Procfile
Create a file named `Procfile` (no extension) in root directory:
```
web: python -m uvicorn backend_python.main:app --host 0.0.0.0 --port $PORT
```

#### Step 6: Deploy
```powershell
git push heroku main
```

#### Step 7: Get Your URL
```powershell
heroku open
```

---

### Option C: Deploy Backend on Render

#### Step 1: Create Account
1. Go to [render.com](https://render.com)
2. Sign in with GitHub

#### Step 2: Create New Web Service
1. Click **New +** → **Web Service**
2. Select your GitHub repository
3. Fill in:
   - **Name**: truestate-api
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r backend_python/requirements.txt`
   - **Start Command**: `python backend_python/run.py`

#### Step 3: Add Environment Variables
1. Go to **Environment** tab
2. Add:
   ```
   DATABASE_URL=your_database_url
   ```

#### Step 4: Deploy
Click **Deploy**. Render will deploy automatically.

---

## Part 3: Frontend Deployment

### Option A: Deploy Frontend on Vercel (Recommended)

#### Step 1: Create Account
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub

#### Step 2: Import Project
1. Click **New Project**
2. Select your `truestate` repository
3. Vercel will auto-detect it's a Vite project

#### Step 3: Configure
1. **Framework Preset**: Vite
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Environment Variables**: Add
   ```
   VITE_API_BASE_URL=https://your-backend-url/api
   ```
   (Use the URL from your backend deployment)

#### Step 4: Deploy
Click **Deploy**. It will deploy automatically!

#### Step 5: Get Your URL
Once deployed, Vercel gives you a URL like: `https://truestate.vercel.app`

---

### Option B: Deploy Frontend on Netlify

#### Step 1: Create Account
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub

#### Step 2: New Site
1. Click **Add new site** → **Import an existing project**
2. Select GitHub, then your repository

#### Step 3: Configure
1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. **Environment Variables**: Add
   ```
   VITE_API_BASE_URL=https://your-backend-url/api
   ```

#### Step 4: Deploy
Click **Deploy**. Netlify will build and deploy automatically!

---

## Part 4: Connect Frontend to Backend

After both are deployed:

### Update Frontend Environment
1. In your frontend repository on GitHub, edit `.env.example` and commit
2. Or create `.env` file in production (if using Vercel/Netlify environment variables)

### Test the Connection
1. Open your deployed frontend URL
2. Try searching or filtering transactions
3. If data appears, everything is working! ✅

---

## Complete Deployment Checklist

- [ ] Created GitHub account
- [ ] Created repository
- [ ] Pushed code to GitHub
- [ ] Created Supabase database and got DATABASE_URL
- [ ] Deployed backend (Railway/Heroku/Render)
- [ ] Got backend public URL
- [ ] Deployed frontend (Vercel/Netlify)
- [ ] Updated frontend with backend URL
- [ ] Tested connection (can see data in app)
- [ ] Both services running in production ✅

---

## Useful Commands

### Git Commands
```powershell
# Check git status
git status

# Make changes and commit
git add .
git commit -m "Your message"

# Push to GitHub
git push origin main

# View commit history
git log --oneline
```

### Backend Commands
```powershell
# Run locally
cd backend_python
python run.py

# Or with uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8080
```

### Frontend Commands
```powershell
# Run locally
cd frontend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Troubleshooting

### Backend won't start
- Check DATABASE_URL is correct
- Ensure all requirements are installed: `pip install -r requirements.txt`
- Check if port 8080 is available

### Frontend won't connect to backend
- Verify backend URL in `.env` file
- Check CORS settings in backend (`main.py`)
- Ensure both URLs are accessible from browser

### Database connection error
- Verify DATABASE_URL format is correct
- Check if Supabase credentials are valid
- Ensure database exists and is accessible

---

## After Deployment

1. **Monitor your apps**
   - Railway/Heroku/Render: Check logs in dashboard
   - Vercel/Netlify: Check deployment logs

2. **Make updates**
   - Make code changes locally
   - Commit and push to GitHub
   - Services auto-deploy from main branch

3. **Scale as needed**
   - Most platforms offer paid tiers for higher performance
   - Monitor usage and upgrade if necessary

---

## Next Steps

1. Follow Part 1 to push to GitHub
2. Choose and follow one backend deployment option
3. Choose and follow one frontend deployment option
4. Test your live application
5. Share your deployed URL! 🎉
