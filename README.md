# E-Commerce Website

Welcome to the E-Commerce Website project! This is a responsive web application built with React, featuring a product catalog, shopping cart, and checkout process (including shipping information). The design is clean and modern, utilizing the Raleway font and a green accent color (#5ECE7B).

## Features
- **Product Listing**: Browse a grid of products with images, names, and prices.
- **Product Details**: View detailed product information and select sizes before adding to cart.
- **Cart Management**: Add items to the cart, adjust quantities, and view totals.
- **Checkout Process**: Enter shipping details and review the order summary.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Technologies Used
- **React**: Frontend framework for building the user interface.
- **CSS**: Custom styles with media queries for responsiveness.
- **Font**: Raleway from Google Fonts.
- **Routing**: React Router for navigation between pages.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/xranano/scripting-final.git
   cd e-commerce-website
   ```

2. **Install Dependencies**:
   Ensure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Application**:
   Start the development server with:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage
- **Home Page**: Displays a list of products. Click a product to view details.
- **Product Detail**: Select a size and add the item to your cart.
- **Cart Page**: View and modify cart items, then click "Continue" to proceed to shipping.
- **Shipping Info**: Enter contact and shipping details, then click "Go to shipping" to proceed.
- Use the navbar to navigate between pages or return to the cart.

## File Structure
- `components/`: Contains React components (e.g., `CartPage.jsx`, `ShippingInfo.jsx`).
- `public/`: Static files like images (e.g., `image1.png`).
- `styles.css`: Global styles for the application.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m "Description of changes"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.
