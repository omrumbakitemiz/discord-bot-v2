# Railway Deployment Checklist

Use this checklist to ensure your Discord bot is properly configured for Railway deployment.

## ✅ Pre-Deployment Checklist

### Repository Setup
- [ ] Code pushed to GitHub repository
- [ ] `.env` file is in `.gitignore` (verified)
- [ ] All Railway configuration files present
- [ ] Build runs successfully locally (`npm run build`)

### Discord Bot Configuration
- [ ] Discord bot created in Developer Portal
- [ ] Bot token obtained and ready
- [ ] Client ID obtained
- [ ] Bot permissions configured (View Channels, Send Messages, Connect, Speak)
- [ ] Message Content Intent enabled in Developer Portal

### Railway Configuration Files

#### ✅ Required Files (All Present)
- [x] `railway.json` - Railway deployment configuration
- [x] `railway.toml` - Alternative configuration format
- [x] `nixpacks.toml` - Build configuration with FFmpeg
- [x] `Procfile` - Process definition
- [x] `.railwayignore` - Files to exclude from deployment
- [x] `.github/workflows/railway.yml` - CI/CD workflow

#### ✅ Package Configuration
- [x] `package.json` has correct start script
- [x] Build script configured
- [x] Node version specified in engines
- [x] All dependencies listed

## 🚀 Deployment Steps

### Step 1: GitHub Setup
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Railway deployment"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Railway Setup
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository

### Step 3: Environment Variables
Set these in Railway dashboard:
```
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_client_id_here
COMMAND_PREFIX=!
```

### Step 4: Deploy
- Railway will automatically build and deploy
- Monitor logs for "✅ Bot is online!"

## 📋 Post-Deployment Verification

### Immediate Checks
- [ ] Build completed successfully in Railway logs
- [ ] Bot appears online in Discord
- [ ] No error messages in Railway logs
- [ ] Bot responds to `!help` command

### Functional Testing
- [ ] `!join` - Bot joins voice channel
- [ ] `!play <URL>` - Audio plays successfully
- [ ] `!queue` - Queue displays correctly
- [ ] `!skip` - Skip works
- [ ] `!stop` - Stop works
- [ ] `!leave` - Bot leaves channel

### Monitoring
- [ ] Set up Railway alerts
- [ ] Check resource usage (CPU, Memory)
- [ ] Monitor error logs
- [ ] Test across multiple servers

## 🔧 Configuration Files Explained

### `railway.json`
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```
- **Builder**: Uses Nixpacks for building
- **Build Command**: Compiles TypeScript
- **Start Command**: Runs compiled JavaScript
- **Restart Policy**: Auto-restart on failure

### `nixpacks.toml`
```toml
[phases.setup]
nixPkgs = ["nodejs", "ffmpeg"]
```
- **Critical**: Installs FFmpeg for audio processing
- **nodejs**: Node.js runtime
- **ffmpeg**: Required for audio streaming

### `Procfile`
```
worker: npm start
```
- Defines the process type as "worker" (not web)
- Discord bots are worker processes, not web servers

## 🐛 Troubleshooting Guide

### Build Fails
**Check:**
- TypeScript compilation errors
- Missing dependencies
- Incorrect build command

**Solution:**
```bash
# Test build locally
npm run build

# Check for errors
npm run dev
```

### Bot Doesn't Start
**Check:**
- Environment variables set correctly
- Discord token is valid
- Client ID is correct

**Solution:**
- Review Railway logs
- Verify environment variables in Railway dashboard
- Regenerate Discord token if needed

### Audio Doesn't Play
**Check:**
- FFmpeg is in nixpacks.toml
- Voice permissions granted
- YouTube URL is valid

**Solution:**
- Verify `nixPkgs = ["nodejs", "ffmpeg"]` in nixpacks.toml
- Test with different YouTube URLs
- Check bot permissions in Discord

### Bot Crashes on Commands
**Check Railway logs for:**
- Error stack traces
- Memory issues
- Network errors

**Solution:**
- Add error handling
- Increase Railway plan if memory limited
- Check YouTube URL validity

## 💰 Cost Management

### Free Tier Usage
- **$5 monthly credit**
- ~120-150 hours of bot uptime
- Suitable for testing and small servers

### Optimization Tips
- Bot only uses resources when active
- Voice streaming is efficient
- Keep dependencies minimal
- Monitor usage in Railway dashboard

### When to Upgrade
- Bot used 24/7
- Multiple large Discord servers
- High command volume
- Need more reliability

## 🔒 Security Checklist

- [ ] `.env` file in `.gitignore`
- [ ] No tokens in source code
- [ ] Environment variables in Railway dashboard
- [ ] GitHub 2FA enabled
- [ ] Railway 2FA enabled
- [ ] Bot token rotated regularly
- [ ] Logs don't expose sensitive data

## 📊 Monitoring Setup

### Railway Dashboard
- View real-time logs
- Monitor CPU/Memory usage
- Check deployment history
- Set up alerts

### Discord Bot Status
- Create status channel in Discord
- Bot posts when online/offline
- Regular health checks
- Command usage statistics

## 🔄 Update Process

### Automatic Updates (GitHub)
```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Railway auto-deploys!
```

### Manual Updates (CLI)
```bash
# Deploy directly
railway up

# Or restart
railway restart
```

## 📞 Support Resources

### Railway
- Docs: https://docs.railway.app/
- Discord: https://discord.gg/railway
- Status: https://status.railway.app/

### Discord.js
- Docs: https://discord.js.org/
- Guide: https://discordjs.guide/
- Discord: https://discord.gg/djs

### Project-Specific
- Check `RAILWAY_DEPLOYMENT.md` for details
- Review logs: `railway logs`
- GitHub Issues for bugs

## ✨ Success Criteria

Your deployment is successful when:
- ✅ Bot shows online in Discord
- ✅ Responds to all commands
- ✅ Audio plays in voice channels
- ✅ No errors in Railway logs
- ✅ Auto-restarts on failure
- ✅ Uses < $5/month on free tier

## 🎉 Congratulations!

Once all items are checked, your Discord bot is:
- ✅ Deployed to Railway
- ✅ Running 24/7
- ✅ Auto-updating from GitHub
- ✅ Monitored and reliable
- ✅ Streaming music to Discord!

---

**Need help?** See [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) for detailed instructions.
