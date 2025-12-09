# Render Backend Deployment - Quick Start

## ⚡ 5-Minute Setup

### Before You Start:
- [ ] GitHub repo: https://github.com/rashmeetchhabra12/truestate
- [ ] Supabase URL (from Database settings)

---

## Step-by-Step

### 1️⃣ Sign Up (2 min)
```
Go to https://render.com
Click "Sign up with GitHub"
Authorize and login
```

### 2️⃣ Create Web Service (1 min)
```
Click "New +" → "Web Service"
Click "Connect GitHub"
Select "truestate" repository
Click "Connect"
```

### 3️⃣ Configure (1 min)

Copy-paste these exact values:

```
Name:              truestate-api
Environment:       Python 3
Branch:            main
Build Command:     pip install -r backend_python/requirements.txt
Start Command:     python backend_python/run.py
Plan:              Free
```

### 4️⃣ Add Database (1 min)

```
Scroll down to "Environment"
Click "Add Environment Variable"

Key:   DATABASE_URL
Value: [Paste Supabase connection string]

Click "Add"
```

### 5️⃣ Deploy (2-3 min)

```
Click "Create Web Service"
Wait for green checkmark
See: "Your service is live"
```

---

## ✅ Verify Deployment

### Check API Works:

1. **Go to:** `https://truestate-api.onrender.com/docs`
2. **See:** Swagger UI with endpoints
3. **Click:** `GET /api/transactions`
4. **Click:** "Try it out"
5. **Click:** "Execute"
6. **Result:** See transaction data ✅

---

## 🎯 Your Backend URL

Copy this:
```
https://truestate-api.onrender.com
```

**Use in Vercel as:**
```
VITE_API_BASE_URL=https://truestate-api.onrender.com/api
```

---

## ⚠️ Common Issues

| Problem | Solution |
|---------|----------|
| **Build Failed** | Check `requirements.txt` exists |
| **Service Won't Start** | Review logs, check database URL |
| **502 Bad Gateway** | Wait 1 min, refresh, or restart service |
| **No Data Returned** | Check DATABASE_URL is correct in environment |

---

## 🔍 Debugging

**View Logs:**
1. Go to Web Service page
2. Scroll to "Logs" section
3. Look for errors

**Restart Service:**
1. Click menu (top right)
2. Click "Restart"

**Check Status:**
- Green = Running ✅
- Yellow = Deploying
- Red = Failed ❌

---

## 📊 Next: Deploy Frontend on Vercel

Go to: `VERCEL_FRONTEND_DEPLOYMENT.md`

---

## 💾 Database Connection String Format

Supabase provides it as:
```
postgresql://postgres.[PROJECT]:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
```

**Examples:**
```
postgresql://postgres.abc123:myPassword@db.abc123.supabase.co:5432/postgres
postgresql://postgres.xyz789:pass@db.xyz789.supabase.co:5432/postgres
```

---

## 🚀 You're Done!

Your backend is now:
- ✅ Deployed on Render
- ✅ Connected to Supabase
- ✅ Running 24/7
- ✅ Public and accessible

**Next:** Deploy frontend on Vercel!
