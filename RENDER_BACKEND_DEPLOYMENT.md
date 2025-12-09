# Backend Deployment on Render - Complete Guide

## Prerequisites

1. **GitHub Account** - with code pushed to https://github.com/rashmeetchhabra12/truestate
2. **Render Account** - https://render.com (sign up with GitHub)
3. **Supabase Database URL** - PostgreSQL connection string

---

## Step 1: Get Your Supabase Database URL

### Where to find it:

1. Go to https://supabase.com
2. Sign in to your account
3. Select your project
4. Go to **Settings** → **Database**
5. Click **Connection Pooling** (recommended for serverless)
6. Copy the **Connection string** (URI format)

**It looks like:**
```
postgresql://postgres.[PROJECT-ID]:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
```

**⚠️ Keep this safe - don't share it!**

---

## Step 2: Create Render Account

1. Go to https://render.com
2. Click **Sign up**
3. Choose **Continue with GitHub**
4. Authorize Render to access your GitHub account
5. ✅ You're logged in

---

## Step 3: Create Web Service on Render

### 3.1 Start Creating Service

1. In Render dashboard, click **New +** (top right)
2. Select **Web Service**

### 3.2 Connect Your GitHub Repository

1. Click **Connect account** (if not connected)
2. Choose **GitHub**
3. Authorize and install Render app on your GitHub account
4. Search for `truestate` repository
5. Click **Connect** next to your repo

---

## Step 4: Configure Web Service

### 4.1 Basic Settings

Fill in these fields:

| Field | Value |
|-------|-------|
| **Name** | `truestate-api` |
| **Environment** | `Python 3` |
| **Region** | `Oregon` (or closest to you) |
| **Branch** | `main` |
| **Build Command** | `pip install -r backend_python/requirements.txt` |
| **Start Command** | `python backend_python/run.py` |

### 4.2 Plan Selection

- Select **Free** plan (can upgrade later)
- ⚠️ Free plans spin down after 15 minutes of inactivity
- (Pro tip: Use paid tier if you need always-on service)

---

## Step 5: Add Environment Variables

### 5.1 Add DATABASE_URL

1. Scroll down to **Environment** section
2. Click **Add Environment Variable**

Fill in:
- **Key:** `DATABASE_URL`
- **Value:** Paste your Supabase connection string

**Example:**
```
postgresql://postgres.xxxxx:password123@db.xxxxx.supabase.co:5432/postgres
```

3. Click **Add**

### 5.2 Verify Environment Variable

- The variable should appear in the list
- ✅ Make sure value is pasted correctly

---

## Step 6: Deploy

1. Click **Create Web Service**
2. Render will start building
3. Watch the logs in real-time

### Build Process (usually 2-3 minutes):

```
Building Python environment...
Installing dependencies from requirements.txt...
Preparing Python runtime...
Starting application...
```

### Success Message:

```
INFO:     Uvicorn running on http://0.0.0.0:8080
INFO:     Application startup complete
```

---

## Step 7: Get Your Backend URL

Once deployment is complete:

1. Look at the top of the logs
2. You'll see your public URL: `https://truestate-api.onrender.com`

**Save this URL - you'll need it for frontend deployment!**

---

## Step 8: Test Your Backend API

### Test with Browser

1. Go to: `https://truestate-api.onrender.com/docs`
2. You should see **Swagger API Documentation**
3. Try the `/api/transactions` endpoint
4. ✅ If you see data, backend is working!

### Test Endpoints

Try these in the Swagger UI:

```
GET /api/transactions
  - Returns transaction data with pagination

GET /api/filters
  - Returns available filter options

GET /api/stats
  - Returns transaction statistics

GET /api/transactions/{id}
  - Get single transaction by ID
```

---

## Troubleshooting

### Issue: Build Failed

**Problem:** Error during `pip install`

**Solution:**
1. Check that `backend_python/requirements.txt` exists
2. Verify Python 3 is selected as environment
3. Check Render logs for specific error
4. Common causes:
   - Missing `requirements.txt`
   - Corrupted dependencies
   - Version conflicts

### Issue: Application Startup Failed

**Problem:** Uvicorn won't start

**Solutions:**
1. Check `Start Command` is exactly: `python backend_python/run.py`
2. Verify `main.py` syntax is correct
3. Check all imports are in requirements.txt
4. Review full error in logs

### Issue: DATABASE_URL Not Found

**Problem:** "Connection refused" or "DATABASE_URL not set"

**Solution:**
1. Go to Web Service Settings
2. Verify `DATABASE_URL` is in Environment Variables
3. Copy-paste Supabase URL again
4. Restart service (top right menu → Restart)

### Issue: Connection to Database Failed

**Problem:** PostgreSQL connection error

**Solutions:**
1. Verify Supabase database is running
2. Check connection string format:
   ```
   postgresql://user:password@host:5432/database
   ```
3. Make sure password doesn't have special characters (encode if needed)
4. Check Supabase firewall/IP restrictions

### Issue: 502 Bad Gateway

**Problem:** API returns 502 error

**Solutions:**
1. Service may still be starting (wait 1-2 min)
2. Check logs for runtime errors
3. Restart service
4. Check database connection

---

## Monitoring & Maintenance

### View Logs

1. Go to your Web Service page
2. Scroll to **Logs** section
3. View real-time application logs
4. Search for errors

### Restart Service

1. Click menu (top right)
2. Select **Restart**
3. Service redeploys in ~1 minute

### Update Code

When you push changes to GitHub:

1. Render automatically detects changes
2. Redeploys automatically (~2-3 minutes)
3. No manual action needed!

---

## Performance Tips

### For Free Tier:

- Service spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds (cold start)
- Data isn't lost, just dormant

### To Keep Warm:

- Frontend sends regular requests
- Or use external uptime monitor (e.g., UptimeRobot)

### Upgrade to Pro:

- Always-on service
- Better performance
- More resources
- Click **Settings** → **Plan** to upgrade

---

## Backend URL Summary

**Your deployed backend:**
```
https://truestate-api.onrender.com
```

**API Base URL:**
```
https://truestate-api.onrender.com/api
```

**API Documentation (Swagger UI):**
```
https://truestate-api.onrender.com/docs
```

**Use this URL in your frontend deployment (Vercel) as `VITE_API_BASE_URL`**

---

## Next Steps

1. ✅ Backend deployed on Render
2. 📝 Copy backend URL
3. 🚀 Go to [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for frontend
4. 🧪 Test both together

---

## Quick Checklist

- [ ] Supabase DATABASE_URL copied
- [ ] Render account created
- [ ] GitHub repo connected
- [ ] Web Service name set to `truestate-api`
- [ ] Build Command: `pip install -r backend_python/requirements.txt`
- [ ] Start Command: `python backend_python/run.py`
- [ ] DATABASE_URL environment variable added
- [ ] Service deployed successfully
- [ ] Backend URL copied
- [ ] API documentation accessible at `/docs`
- [ ] Test endpoint returns data ✅

---

## Support Resources

- **Render Docs:** https://render.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **Uvicorn Docs:** https://www.uvicorn.org
