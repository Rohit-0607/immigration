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

## 🚀 Firebase & Admin Panel Setup

To enable the secure Admin Panel and lead capture (Contact Form & Eligibility Checker), you must configure Firebase.

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and follow the prompts.
3. Once created, click the **Web** icon (</>) on the project overview page to register an app.
4. Copy the `firebaseConfig` object provided.

### 2. Configure Environment Variables
1. In the `client/` folder, create a `.env` file (you can copy `.env.example` if it exists).
2. Paste your config keys using the `VITE_FIREBASE_` prefix:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Enable Authentication (Admin Login)
1. In the Firebase Console, go to **Build** > **Authentication**.
2. Click **Get Started** and enable the **Email/Password** sign-in provider.
3. Go to the **Users** tab and click **Add User**.
4. Create your single admin account (e.g., `admin@futurepoint.com` with a secure password). This will be used to log into `/admin/login`.

### 4. Set Up Firestore Database
1. In the Firebase Console, go to **Build** > **Firestore Database**.
2. Click **Create database** (start in production mode).
3. Go to the **Rules** tab and paste the contents of `firestore.rules` provided in the root of this repository. This ensures public users can only write to the database, but only your authenticated admin account can read the leads.

---

## 🎨 Customization Guide

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
