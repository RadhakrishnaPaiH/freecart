
# FreeCart – E-Commerce Product Store

FreeCart is a React-based e-commerce web application developed as a portfolio project. It provides a shopping experience for customers and product, order, and user management features for administrators.

## Features

### Customer Features

- Browse products across multiple categories.
- Search, filter, and sort products.
- View product details, prices, descriptions, and stock availability.
- Add products to the shopping cart and update quantities.
- Add and remove products from the wishlist.
- User registration, login, and logout.
- View order history and cancel eligible orders.
- Switch between dark and light themes.
- Access customer-facing pages with route-based access control.

### Admin Features

- Admin dashboard with product, category, order, user, revenue, and low-stock summaries.
- Add, edit, delete, and view product details.
- Search and filter products by category and stock status.
- Manage orders and update their statuses.
- View registered user information without displaying passwords.
- Activate or deactivate user accounts.
- Restrict admin pages through frontend route protection.
- Monitor product stock availability.

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- React Hooks and Context API
- Browser Local Storage
- Fake Store API

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm before running the project.

### Admin Creation

Use the following mail with any password of you choice while registering, then login to enter admin dashboard.
email: admin@productstore.com

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RadhakrishnaPaiH/freecart.git
   ```

2. Navigate to the cloned project directory:

   ```bash
   cd productmanagement
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Highlights

- Component-based React architecture.
- Shared state management using the Context API.
- Persistent cart, wishlist, and product data using browser Local Storage.
- Product data retrieved from the Fake Store API.
- Separate customer-facing and admin product management interfaces.
- Protected routes for customer and admin views.
- Responsive styling and dark/light theme support.
- Client-side product, cart, wishlist, and order workflows.

## Data and Security Limitations

FreeCart is currently a frontend portfolio project and does not have a dedicated backend.

- Fake Store API provides sample product data.
- Products created in the application are stored in the browser's Local Storage and are not automatically shared across different users or devices.
- Local Storage data is specific to the browser and website origin being used.
- Authentication, role checks, and route protection are implemented on the frontend and are not a substitute for secure server-side authentication and authorization.
- The project does not currently include a production payment system or backend database.

## Future Improvements

- Build a backend using Node.js and Express.
- Store application data in MongoDB.
- Implement secure server-side authentication and authorization.
- Synchronize products, users, carts, and orders through a backend API.
- Integrate a payment gateway.

## Author

**Radhakrishna Pai H**

Developed as a learning and portfolio project to practice React, JavaScript, component design, state management, routing, and e-commerce workflows.
