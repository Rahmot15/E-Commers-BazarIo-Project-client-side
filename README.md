# BazarIo 🛒

BazarIo is a full-featured web application designed to streamline local market price tracking, product management, user interaction, and advertisement. It supports multiple roles (Admin, Vendor, User) and delivers a responsive, modern UI for all devices.

## 🔗 Live URL

👉 [Visit the live site](https://bazario-auth-23e7d.web.app/)

---

## 🚀 Key Features

- 🔎 **Live Local Market Price Tracking:** View and compare daily prices of essential items from multiple markets.
- 📈 **Historical Price Charts:** Track price trends over time for better decision-making.
- 🛒 **Product Purchase:** Buy essential items directly from trusted vendors.
- 🏪 **Vendor Dashboard:** Vendors can update prices and manage their products.
- 📢 **Sponsor Advertisements:** Monetization through product ads and sponsor placements.
- 🔐 **Authentication & Authorization:** Secure login and role-based access for users and vendors.
- 📱 **Responsive Design:** Fully optimized for mobile and desktop devices.
- ⚡ **Fast & Modern UI:** Built with React, Tailwind CSS, and modern UI libraries.
- 🔔 **Real-time Notifications:** Get notified about price drops and special offers.

---

## 📦 NPM Packages Used

- **@headlessui/react**
- **@stripe/react-stripe-js**
- **@stripe/stripe-js**
- **@tailwindcss/vite**
- **@tanstack/react-query**
- **@tanstack/react-query-devtools**
- **aos**
- **axios**
- **firebase**
- **framer-motion**
- **lucide-react**
- **react**
- **react-countup**
- **react-dom**
- **react-hook-form**
- **react-icons**
- **react-router**
- **react-spinners**
- **react-toastify**
- **recharts**
- **sweetalert2**
- **swiper**
- **tailwindcss**

---


🧩 Tech Stack
Frontend: React, Tailwind CSS, React Router

Backend: Express.js + MongoDB (via REST API)

Auth: Firebase Auth

State Management: React Query

Payments: Stripe

Hosting: Firebase


📁 Project Structure (Overview)

```txt
src/
│
├── api/
│   └── utils.js
├── assets/
│   ├── banner.jpg
│   └── react.svg
├── Components/
│   ├── Dashboard/
│   ├── Sidebar/
│   │   ├── AdminMenu.jsx
│   │   ├── CustomerMenu.jsx
│   │   ├── SellerMenu.jsx
│   │   └── Sidebar.jsx
│   ├── TableRows/
│   │   └── DashboardRedirect.jsx
│   ├── Modal/
│   │   ├── PurchaseModal.jsx
│   │   └── RejectModal.jsx
│   ├── Shared/
│   │   ├── Button/
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── Gradient/
│   │   │   ├── GradientAll.jsx
│   │   │   └── GradientWrapper.jsx
│   │   ├── Logo/
│   │   │   └── Logo.jsx
│   │   └── Navbar/
│   │       └── Navbar.jsx
│   ├── LoadingSpinner.jsx
│   ├── Advertisement.jsx
│   ├── Banner.jsx
│   ├── Container.jsx
│   ├── EmptyState.jsx
│   └── StatsSection.jsx
├── firebase/
│   └── firebase.config.js
├── hooks/
│   ├── useApproveProduct.jsx
│   ├── useAuth.jsx
│   ├── useAxiosSecure.jsx
│   ├── useRejectProduct.jsx
│   └── useRole.js
├── layouts/
│   ├── DashboardLayout.jsx
│   └── MainLayout.jsx
├── pages/
│   ├── Dashboard/
│   │   ├── Admin/
│   │   │   ├── AllAds.jsx
│   │   │   ├── AllOrders.jsx
│   │   │   ├── AllProductAdmin.jsx
│   │   │   └── AllUsers.jsx
│   │   ├── Common/
│   │   │   └── Profile.jsx
│   │   ├── Payment/
│   │   │   └── PaymentForm.jsx
│   │   ├── User/
│   │   │   ├── MyOrders.jsx
│   │   │   ├── PriceTrend.jsx
│   │   │   └── WatchList.jsx
│   │   └── Vendor/
│   │       ├── AddAdvertisement.jsx
│   │       ├── AddProduct.jsx
│   │       ├── MyAdvertisements.jsx
│   │       ├── MyProducts.jsx
│   │       ├── UpdateAdvertisements.jsx
│   │       └── UpdateProduct.jsx
│   └── Home/
│       └── Home.jsx
├── Home/
│   └── Home.jsx
├── Login/
│   └── LoginForm.jsx
├── Register/
│   ├── RegisterForm.jsx
│   ├── AllProducts.jsx
│   ├── ErrorPage.jsx
│   └── ProductDetails.jsx
├── providers/
│   ├── AuthContext.jsx
│   └── AuthProvider.jsx
├── routes/
│   ├── AdminRoute.jsx
│   ├── PrivateRoute.jsx
│   ├── Routes.jsx
│   └── SellerRoute.jsx
├── App.css
├── App.jsx
├── index.css
└── main.jsx


🙌 Credits
Designed & developed by Md Rahmatulla

📜 License
This project is licensed for personal and educational use.


---

Let me know if you want a **backend README**, API documentation, or to include screenshots and GIFs!








# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
