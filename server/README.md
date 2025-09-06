# E-commerce Server - MVC Architecture

This server has been restructured to follow the MVC (Model-View-Controller) pattern with MongoDB/Mongoose integration.

## Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── adminController.js   # Admin-related endpoints
│   ├── authController.js    # Authentication endpoints
│   ├── categoryController.js # Category endpoints
│   ├── orderController.js   # Order management endpoints
│   ├── paymentController.js # Payment processing endpoints
│   ├── productController.js # Product management endpoints
│   └── reviewController.js  # Review management endpoints
├── middleware/
│   └── auth.js              # Authentication and authorization middleware
├── models/
│   ├── Category.js          # Category model
│   ├── Order.js             # Order model
│   ├── Product.js           # Product model
│   ├── Review.js            # Review model
│   └── User.js              # User model
├── routes/
│   ├── adminRoutes.js       # Admin routes
│   ├── authRoutes.js        # Authentication routes
│   ├── categoryRoutes.js    # Category routes
│   ├── orderRoutes.js       # Order routes
│   ├── paymentRoutes.js     # Payment routes
│   ├── productRoutes.js     # Product routes
│   └── reviewRoutes.js      # Review routes
├── services/
│   ├── adminService.js      # Admin business logic
│   ├── authService.js       # Authentication business logic
│   ├── orderService.js      # Order business logic
│   ├── productService.js    # Product business logic
│   └── reviewService.js     # Review business logic
├── utils/
│   └── initData.js          # Database initialization utilities
├── app.js                   # Express app configuration
├── index.js                 # Server entry point
└── index_old.js            # Backup of original server file
```

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=3001

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce-store

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

## Features

### Models
- **User**: Customer, seller, and admin user management
- **Product**: Product catalog with categories and seller relationships
- **Order**: Order management with items and payment tracking
- **Category**: Product categorization
- **Review**: Product reviews and ratings

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (customer, seller, admin)
- User approval system for sellers
- Account banning functionality

### API Endpoints

#### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

#### Products (`/api/products`)
- `GET /` - Get all products (with filtering and pagination)
- `GET /:id` - Get product by ID
- `POST /` - Create product (seller only)
- `PUT /:id` - Update product (seller only)
- `DELETE /:id` - Delete product
- `GET /seller/products` - Get seller's products

#### Orders (`/api/orders`)
- `POST /` - Create order
- `GET /` - Get user orders
- `GET /:id` - Get order by ID
- `GET /seller/orders` - Get seller orders

#### Reviews (`/api/reviews`)
- `GET /products/:id` - Get product reviews
- `POST /products/:id` - Create review
- `PUT /:id` - Update review
- `DELETE /:id` - Delete review
- `GET /` - Get user reviews

#### Admin (`/api/admin`)
- `GET /stats` - Get admin statistics
- `GET /users` - Get all users
- `PUT /users/:id/approve` - Approve user
- `PUT /users/:id/ban` - Ban/unban user
- `DELETE /users/:id` - Delete user
- `GET /products` - Get all products
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order details
- `GET /categories` - Get all categories
- `POST /categories` - Create category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

#### Categories (`/api/categories`)
- `GET /` - Get all categories

#### Payments (`/api/payments`)
- `POST /create-payment-intent` - Create Stripe payment intent

## Database Initialization

The server automatically initializes with:
- Default admin user (admin@ecommerce.com / admin123)
- Default product categories
- MongoDB connection setup

## Running the Server

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env` file

3. Start MongoDB service

4. Run the server:
   ```bash
   npm run server
   ```

## Migration from JSON to MongoDB

The original server used JSON files for data storage. The new structure uses MongoDB with Mongoose ODM. All existing functionality has been preserved while adding:

- Better data validation
- Relationships between entities
- Improved query performance
- Data consistency
- Scalability

The old JSON-based server file has been backed up as `index_old.js` for reference.
