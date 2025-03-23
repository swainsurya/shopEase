<img src="https://res.cloudinary.com/di53fuwst/image/upload/v1742751601/Screenshot_2025-03-23_230745_k7dpzr.png" />
# ShopEase - E-commerce Platform

## Introduction
ShopEase is a full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It provides users with a seamless shopping experience, featuring a responsive UI, secure authentication, and a powerful backend for managing products, orders, and payments.

## Features
- 🔹 User authentication (JWT-based login & signup)
- 🛍️ Product catalog with search and filtering
- 🛒 Shopping cart and checkout functionality
- 💳 Payment gateway integration (Stripe)
- 📦 Order management for users and admins
- 📊 Admin dashboard for product and order management
- 🌐 Responsive and modern UI using Tailwind CSS & ShadCN
- 🚀 Optimized performance with server-side rendering (SSR) using Next.js

## Tech Stack
- **Frontend:** React.js, Next.js, Tailwind CSS, ShadCN
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Payments:** Stripe API
- **Deployment:** Vercel (Frontend), Render/Heroku (Backend)

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- npm or yarn

### Steps to Run Locally
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/shopease.git
   cd shopease
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the backend server:**
   ```sh
   npm run server
   ```

5. **Run the frontend:**
   ```sh
   npm run dev
   ```

6. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
- **Frontend:** Deploy using Vercel
- **Backend:** Deploy on Render, Heroku, or any cloud server
- **Database:** MongoDB Atlas

## Contributing
Feel free to contribute! Fork the repo, make changes, and submit a pull request.

## License
This project is licensed under the MIT License.
