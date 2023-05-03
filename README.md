# textile-shop
Deployed App url: https://tame-gray-fly-ring.cyclic.app/

user
user: mirage101@abv.bg
pass: 123456

admin
user: admin@example.com
pass: 123456

Textile Shop
Introduction
Textile Shop is an e-commerce platform for buying and selling textiles. The platform allows users to create an account, browse products, add products to a cart, checkout, and view their order history.
Features
User Authentication
Users can create an account and log in to the platform using their email and password. The authentication process uses JWT tokens for secure access to the site's resources.
Product Browsing
Users can browse products on the platform by category, brand, or search. Products are displayed in a paginated format, with details such as product name, price, and an image.
Cart Management
Users can add products to a cart, view the cart's contents, and remove items from the cart. The cart is saved to the user's session and persists across multiple visits to the site.
Checkout
Users can checkout their cart, which requires them to enter their shipping and billing details. After completing the checkout process, users receive an email confirmation of their order.
Order History
Users can view their order history, which includes details such as the order date, order total, and status.
Technologies Used
Textile Shop is built using the following technologies:
•	Backend: Node.js, Express.js, MongoDB
•	Frontend: React, Redux
•	Authentication: JSON Web Tokens (JWT)
•	Payment Processing: Stripe API
Getting Started
Prerequisites
To run Textile Shop, you'll need:
•	Node.js installed on your machine
•	MongoDB installed and running on your machine
•	A Stripe account to process payments (you can use their test API)
Installation
1.	Clone the repository: git clone https://github.com/mirage101/textile-shop.git
2.	Change into the project directory: cd textile-shop
3.	Install dependencies: npm install
4.	Create a .env file in the project directory and add your environment variables (e.g. MongoDB connection string, Stripe API keys, etc.)
5.	Start the server: npm run start
6.	Start the client: cd client && npm run start
API Reference
The API endpoints for the Textile Shop backend are:
Authentication
•	POST /auth/register: Register a new user account.
•	POST /auth/login: Log in to an existing user account.
Products
•	GET /api/products: Retrieve all products.
•	GET /api/products/:id: Retrieve a specific product by ID.
Cart
•	GET /api/cart: Retrieve the cart contents.
•	POST /api/cart: Add a product to the cart.
•	DELETE /api/cart/:productId: Remove a product from the cart.
Orders
•	GET /api/orders: Retrieve all orders for the logged-in user.
•	POST /api/orders: Create a new order.
Deployment
Textile Shop can be deployed to a variety of cloud platforms, such as Heroku or AWS. You'll need to configure the environment variables for your chosen platform to match the ones used in the .env file.
Conclusion
Textile Shop is a fully-featured e-commerce platform built using Node.js, React, and MongoDB. It allows users to browse products, add them to a cart, and checkout securely using Stripe. It's a great starting point for building your own custom e-commerce site!

