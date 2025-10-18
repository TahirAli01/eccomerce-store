# E-commerce Platform

A modern e-commerce platform built with React (frontend) and Node.js/Express (backend), featuring Stripe payment integration, user authentication, and comprehensive product management.

## Project Structure

This project has been separated into two independent applications:

```
ecommerce-store/
├── src/                    # React frontend application
├── server/                 # Node.js backend API
├── package.json           # Frontend dependencies
├── server/package.json     # Backend dependencies
├── vite.config.ts        # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # This file
```

## Quick Start

### Option 1: Automated Setup (Recommended)

Run the setup script to install dependencies for both projects:

**Windows:**

```bash
setup-dev.bat
```

**Linux/Mac:**

```bash
chmod +x setup-dev.sh
./setup-dev.sh
```

### Option 2: Manual Setup

1. **Install Frontend Dependencies:**

   ```bash
   npm install
   ```

2. **Install Backend Dependencies:**

   ```bash
   cd server
   npm install
   cd ..
   ```

3. **Configure Environment Variables:**

   **Backend:** Copy `server/env.example` to `server/.env` and configure:

   ```bash
   cp server/env.example server/.env
   ```

   **Frontend:** Copy `client.env.example` to `.env.local` and configure:

   ```bash
   cp client.env.example .env.local
   ```

4. **Start MongoDB** (if running locally)

5. **Run Both Applications:**

   **Terminal 1 - Backend:**

   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend:**

   ```bash
   npm run dev
   ```

## Applications

### Frontend (React + Vite)

- **URL:** http://localhost:5173
- **Tech Stack:** React, TypeScript, Tailwind CSS, Vite
- **Features:** Product catalog, shopping cart, user authentication, Stripe checkout

### Backend (Node.js + Express)

- **URL:** http://localhost:3001
- **Tech Stack:** Node.js, Express, MongoDB, JWT, Stripe
- **Features:** REST API, user management, product CRUD, order processing, payment handling

## Development

### Frontend Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development

```bash
cd server
npm run dev          # Start with nodemon (auto-restart)
npm start            # Start production server
```

## Environment Configuration

### Frontend (.env.local)

```bash
VITE_API_URL=http://localhost:3001
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### Backend (server/.env)

```bash
MONGODB_URI=mongodb://localhost:27017/ecommerce-store
PORT=3001
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

## Features

### User Features

- User registration and authentication
- Product browsing and search
- Shopping cart management
- Secure checkout with Stripe
- Order tracking
- Product reviews and ratings

### Admin Features

- Product management (CRUD)
- Order management
- User management
- Category management
- Dashboard analytics

### Seller Features

- Product listing management
- Order fulfillment
- Sales analytics
- Inventory tracking

## API Documentation

The backend provides a comprehensive REST API. See `server/README.md` for detailed API documentation.

### Key Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/products` - Get products
- `POST /api/orders` - Create order
- `POST /api/create-payment-intent` - Stripe payment intent

## Payment Integration

This platform uses Stripe for secure payment processing. See `STRIPE_SETUP.md` for detailed setup instructions.

### Test Cards

- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Expiry:** Any future date

## Database Schema

The application uses MongoDB with the following main collections:

- **Users:** User accounts and profiles
- **Products:** Product catalog
- **Orders:** Order management
- **Reviews:** Product reviews
- **Categories:** Product categories

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Helmet security headers
- Input validation
- Secure file uploads

## Deployment

### Frontend Deployment

Build the frontend and deploy to any static hosting service:

```bash
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment

Deploy the server to any Node.js hosting service:

```bash
cd server
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For issues and questions:

1. Check the individual README files in `server/README.md`
2. Review the setup guides in `STRIPE_SETUP.md`
3. Check the implementation summary in `IMPLEMENTATION_SUMMARY.md`

