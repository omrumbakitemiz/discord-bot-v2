# Railway Deployment Guide

This guide will walk you through deploying your Discord YouTube bot to Railway.

## Prerequisites

- A [Railway](https://railway.app/) account (sign up for free)
- A Discord bot token (see main README for setup)
- GitHub account (optional, but recommended)

## Deployment Methods

You can deploy to Railway in two ways:

### Method 1: Deploy from GitHub (Recommended)

This method enables automatic deployments when you push changes.

#### Step 1: Push to GitHub

1. **Create a new GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Discord YouTube bot"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

#### Step 2: Deploy to Railway

1. **Go to [Railway](https://railway.app/) and log in**

2. **Click "New Project"**

3. **Select "Deploy from GitHub repo"**

4. **Connect your GitHub account** (if not already connected)

5. **Select your repository**

6. **Railway will automatically detect your configuration**
   - It will use the `railway.json` and `nixpacks.toml` files
   - Build command: `npm run build`
   - Start command: `npm start`

#### Step 3: Configure Environment Variables

1. **In your Railway project, go to the "Variables" tab**

2. **Add the following environment variables:**
   ```
   DISCORD_TOKEN=your_bot_token_here
   DISCORD_CLIENT_ID=your_client_id_here
   COMMAND_PREFIX=!
   ```

3. **Click "Add Variable" for each one**

#### Step 4: Deploy

1. **Railway will automatically trigger a deployment**

2. **Monitor the build logs** in the "Deployments" tab

3. **Once deployed, check the logs** to see "✅ Bot is online!"

---

### Method 2: Deploy from CLI

Deploy directly from your local machine using Railway CLI.

#### Step 1: Install Railway CLI

```bash
# macOS/Linux
curl -fsSL https://railway.app/install.sh | sh

# Windows (PowerShell)
iwr https://railway.app/install.ps1 | iex

# Or use npm
npm install -g @railway/cli
```

#### Step 2: Login to Railway

```bash
railway login
```

This will open a browser window to authenticate.

#### Step 3: Initialize Project

```bash
railway init
```

Follow the prompts to create a new project or link to an existing one.

#### Step 4: Set Environment Variables

```bash
railway variables set DISCORD_TOKEN=your_bot_token_here
railway variables set DISCORD_CLIENT_ID=your_client_id_here
railway variables set COMMAND_PREFIX=!
```

#### Step 5: Deploy

```bash
railway up
```

This will build and deploy your bot to Railway.

---

## Railway Configuration Files

The project includes several Railway-specific files:

### `railway.json`
Configures the build and deployment settings:
- Builder: NIXPACKS
- Build command: `npm run build`
- Start command: `npm start`
- Restart policy: ON_FAILURE with 10 max retries

### `nixpacks.toml`
Specifies system dependencies and build phases:
- **System packages**: Node.js and FFmpeg (required for audio processing)
- **Install phase**: Runs `npm install`
- **Build phase**: Runs `npm run build`
- **Start command**: `npm start`

### `Procfile`
Alternative process definition:
- Defines the worker process type
- Runs `npm start`

### `.railwayignore`
Excludes unnecessary files from deployment:
- Source TypeScript files (only compiled JS is needed)
- Development dependencies
- Documentation files

---

## Post-Deployment

### Verify Deployment

1. **Check the logs** in Railway dashboard:
   ```
   ✅ Bot is online!
   📝 Logged in as: YourBot#1234
   🎵 Serving X server(s)
   📌 Command prefix: !
   ```

2. **Test in Discord**:
   - Join a voice channel
   - Type `!help` to see commands
   - Try `!play <YouTube URL>` to test audio streaming

### Monitor Your Bot

1. **View real-time logs** in the Railway dashboard
2. **Check metrics** (CPU, Memory, Network usage)
3. **Set up alerts** for deployment failures

### Update Your Bot

#### If using GitHub (Method 1):
Simply push changes to your repository:
```bash
git add .
git commit -m "Update bot features"
git push
```
Railway will automatically redeploy!

#### If using CLI (Method 2):
Run the deploy command again:
```bash
railway up
```

---

## Troubleshooting

### Bot Doesn't Start

**Check logs for errors:**
```bash
railway logs
```

**Common issues:**
- ❌ Missing environment variables
  - Solution: Check all required vars are set in Railway dashboard
- ❌ Invalid Discord token
  - Solution: Verify token in Discord Developer Portal
- ❌ Build failed
  - Solution: Check build logs for TypeScript errors

### Bot Goes Offline

**Check Railway dashboard:**
- Look for crash logs
- Check if deployment succeeded
- Verify restart policy is working

**Common causes:**
- Invalid YouTube URLs causing crashes
- Memory limits exceeded
- Network connectivity issues

### Audio Doesn't Play

**Verify FFmpeg is installed:**
- Check `nixpacks.toml` includes `ffmpeg` in nixPkgs
- Look for FFmpeg-related errors in logs

**Test commands:**
- Ensure bot joins voice channel first (`!join`)
- Try different YouTube URLs
- Check Discord voice permissions

### Environment Variables Not Working

**Ensure variables are set correctly:**
1. Go to Railway dashboard
2. Click on your project
3. Go to "Variables" tab
4. Verify all three variables exist:
   - `DISCORD_TOKEN`
   - `DISCORD_CLIENT_ID`
   - `COMMAND_PREFIX`

**Restart deployment after adding variables:**
```bash
railway restart
```

---

## Railway Free Tier Limits

Railway offers a generous free tier:
- ✅ **$5 free credit per month**
- ✅ **500 hours of usage**
- ✅ **Enough for small to medium bots**

For a Discord bot that runs 24/7:
- ~720 hours per month
- Consider upgrading for production use

**Optimize usage:**
- Bot only uses resources when processing commands
- Voice streaming uses minimal CPU
- Memory usage is stable

---

## Advanced Configuration

### Custom Domain (Pro Plan)

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Database Integration

If you want to add a database:
```bash
railway add postgresql
# or
railway add mysql
# or
railway add redis
```

Environment variables are automatically added!

### Scheduled Deployments

Set up GitHub Actions for scheduled updates:
```yaml
# .github/workflows/deploy.yml
name: Deploy to Railway
on:
  push:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'  # Weekly
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Trigger Railway Deploy
        run: curl -X POST ${{ secrets.RAILWAY_WEBHOOK }}
```

---

## Cost Estimation

**Free Tier:**
- Cost: $0 (with $5 monthly credit)
- Best for: Testing and small servers

**Paid Usage:**
- ~$5-10/month for 24/7 uptime
- Scales based on usage
- No hidden fees

---

## Security Best Practices

✅ **Never commit `.env` file** (already in `.gitignore`)
✅ **Use Railway's environment variables** for sensitive data
✅ **Rotate bot token** if compromised
✅ **Enable 2FA** on Railway account
✅ **Review deployment logs** regularly
✅ **Set up log retention** for debugging

---

## Support

### Railway Support
- [Railway Documentation](https://docs.railway.app/)
- [Railway Discord](https://discord.gg/railway)
- [Railway GitHub](https://github.com/railwayapp)

### Project Issues
- Check the logs first: `railway logs`
- Review this documentation
- Check Discord.js documentation
- Open an issue on your repository

---

## Next Steps

After successful deployment:

1. ✅ **Invite bot to your Discord servers**
2. ✅ **Test all commands thoroughly**
3. ✅ **Monitor logs for errors**
4. ✅ **Set up monitoring/alerts**
5. ✅ **Consider upgrading for production use**
6. ✅ **Star the Railway project** 😊

---

## Quick Reference

### Essential Commands

```bash
# Login to Railway
railway login

# View logs
railway logs

# Restart service
railway restart

# Open dashboard
railway open

# Set environment variable
railway variables set KEY=value

# Deploy from CLI
railway up

# SSH into deployment (Pro plan)
railway run
```

### Environment Variables

```env
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_client_id_here
COMMAND_PREFIX=!
```

### URLs

- Railway Dashboard: https://railway.app/dashboard
- Railway Docs: https://docs.railway.app/
- Discord Developer Portal: https://discord.com/developers/applications

---

Happy deploying! 🚀🎵

Your bot will now run 24/7 on Railway, ready to stream music to your Discord servers!
