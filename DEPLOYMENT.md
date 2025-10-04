# Deployment Guide for Vercel

This guide explains how to deploy your full-stack e-commerce application to Vercel.

## Prerequisites

1. A Vercel account
2. MongoDB Atlas account (for database)
3. Cloudinary account (for image storage)
4. Stripe account (for payments)

## Environment Variables

Set the following environment variables in your Vercel project settings:

### Required Environment Variables

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Stripe
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key

# Frontend API URL (will be your Vercel app URL)
VITE_BACKEND=https://your-app-name.vercel.app
```

## Deployment Steps

1. **Connect your GitHub repository to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**

   - Framework Preset: `Other`
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables**

   - Go to your project settings in Vercel
   - Navigate to "Environment Variables"
   - Add all the required environment variables listed above

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete

## Project Structure

The deployment uses the following structure:

```
├── index.js              # Main entry point for Vercel
├── vercel.json           # Vercel configuration
├── server/               # Backend API
│   ├── app.js           # Express app configuration
│   ├── index.js         # Server entry point
│   └── ...              # Other server files
├── src/                  # Frontend React app
└── dist/                 # Built frontend (created during build)
```

## How It Works

1. **Build Process**: Vercel builds the frontend using `npm run vercel-build`
2. **API Routes**: All `/api/*` routes are handled by the Express server
3. **Static Files**: All other routes serve the React app
4. **Environment**: Production environment variables are automatically loaded

## API Endpoints

Your API will be available at:

- `https://your-app.vercel.app/api/*`

Examples:

- `https://your-app.vercel.app/api/auth/login`
- `https://your-app.vercel.app/api/products`
- `https://your-app.vercel.app/api/orders`

## Troubleshooting

### Common Issues

1. **Build Failures**

   - Check that all dependencies are in `package.json`
   - Ensure environment variables are set correctly

2. **API Not Working**

   - Verify MongoDB connection string
   - Check that all required environment variables are set

3. **Images Not Uploading**

   - Verify Cloudinary credentials
   - Check file upload limits

4. **Payments Not Working**
   - Verify Stripe keys are correct
   - Ensure webhook endpoints are configured

### Logs

Check Vercel function logs in the Vercel dashboard for debugging.

## Local Testing

To test the production build locally:

```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

## Security Notes

- Never commit `.env` files to version control
- Use strong, unique secrets for JWT_SECRET
- Use HTTPS in production (Vercel handles this automatically)
- Regularly rotate your API keys and secrets
