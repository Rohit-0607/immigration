# Future Point Immigration Website

This is a production-ready, fully responsive React application for the Future Point Immigration Consultancy. Built with **React**, **React Router**, and **Tailwind CSS**.

## Project Setup

1. **Install Dependencies:**
   Navigate to the `client/` folder and install:
   ```bash
   cd client
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

3. **Backend Integration:**
   The `ContactForm.jsx` is pre-wired to send POST requests to `http://localhost:5000/api/contact`. Ensure your Express/MongoDB backend is running in the `server/` folder via `npm run dev` in that directory.

## Customization Guide

### 1. Brand Colors
To modify the Navy Blue and Gold color scheme, open `client/tailwind.config.js`. 
Update the `primary` object for blues and the `gold` object for the accent colors. All buttons and backgrounds automatically use these defined tokens.

### 2. Phone Numbers & WhatsApp
- **WhatsApp Floating Button:** Open `client/src/components/WhatsAppButton.jsx` and change `const whatsappNumber = '1234567890'` to your actual number including the country code (no `+`).
- **Navbar/Footer Phones:** Search for `tel:+1234567890` in `client/src/components/Navbar.jsx` and `Footer.jsx` and replace them.

### 3. Contact Email
Open `client/src/components/Footer.jsx` and `Contact.jsx` and replace `info@futurepoint.example.com` with your actual business email.

### 4. Services Data
- The **Services Overview** (`client/src/pages/Services.jsx`) fetches data dynamically from the MongoDB backend (`/api/services`).
- The **Individual Service Details** (`client/src/pages/ServiceDetail.jsx`) currently uses a detailed mock object `serviceDetails` at the top of the file. You can edit this object directly to change the copy, benefits, and processes for each visa type.

### 5. Google Maps Embed
Open `client/src/pages/Contact.jsx`, scroll to the bottom, and replace the placeholder `div` with the `<iframe>` embed code provided by Google Maps for your specific office address.

### 6. Blog Content
Open `client/src/pages/Blog.jsx` and modify the `blogPosts` array to add, remove, or edit blog articles. The `BlogPost.jsx` file automatically renders the individual pages based on this data.
