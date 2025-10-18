# Stripe Integration Setup Guide

This guide will help you set up Stripe payment processing for your e-commerce platform.

## Prerequisites

1. A Stripe account (sign up at [stripe.com](https://stripe.com))
2. Node.js and npm installed
3. Your e-commerce project running

## Step 1: Get Your Stripe Keys

1. Log in to your Stripe Dashboard
2. Go to Developers → API keys
3. Copy your **Publishable key** and **Secret key**
4. **Important**: Use test keys for development, live keys for production

## Step 2: Configure Environment Variables

### Backend (Server)

Create a `.env` file in the `server/` directory with:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_test_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_test_publishable_key_here

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Server Configuration
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ecommerce-store
```

### Frontend (Client)

Create a `.env.local` file in your project root with:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_publishable_key_here
```

## Step 3: Install Dependencies

### Server Dependencies

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

The server already includes the required Stripe dependency.

### Client Dependencies

In the project root, install client dependencies:

```bash
npm install
```

The client already includes the required Stripe dependencies.

## Step 4: Test the Integration

1. Start your server: `cd server && npm run dev`
2. Start your client: `npm run dev`
3. Add items to cart and proceed to checkout
4. Use Stripe test card numbers:
   - **Success**: 4242 4242 4242 4242
   - **Decline**: 4000 0000 0000 0002
   - **Expiry**: Any future date
   - **CVC**: Any 3 digits

## Step 5: Go Live (Production)

1. Switch to live keys in your environment variables
2. Update your Stripe webhook endpoints
3. Test thoroughly with small amounts
4. Ensure PCI compliance

## Security Notes

- Never expose your secret key in frontend code
- Always use HTTPS in production
- Implement proper error handling
- Validate all input data
- Use webhooks for payment confirmation

## Troubleshooting

### Common Issues

1. **"Invalid API key"**: Check your secret key is correct
2. **"No such payment_intent"**: Ensure client secret is valid
3. **CORS errors**: Verify server CORS configuration
4. **Environment variables not loading**: Restart your development server

### Testing

- Use Stripe's test mode for development
- Test with various card types and scenarios
- Verify webhook delivery
- Check payment intent status

## Support

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)
- Check your server logs for detailed error messages

## File Structure

```
project/
├── server/
│   └── index.js          # Stripe payment intent creation
├── src/
│   ├── components/
│   │   └── StripeCheckout.tsx  # Stripe.js integration
│   └── pages/
│       └── CheckoutPage.tsx    # Updated checkout flow
├── .env                   # Backend environment variables
├── .env.local            # Frontend environment variables
└── STRIPE_SETUP.md       # This file
```

## Next Steps

1. Implement webhook handling for payment confirmation
2. Add payment method saving for returning customers
3. Implement subscription billing if needed
4. Add payment analytics and reporting
5. Consider implementing Stripe Connect for marketplace functionality
