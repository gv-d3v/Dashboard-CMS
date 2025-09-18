Dashboard CMS 🖥️

Dashboard CMS is a modern, full-stack, multi-site Content Management System designed for collaborative environments. It provides a secure, intuitive dashboard for managing users, websites, content, and media files. The project is built with the Next.js App Router, featuring a robust backend powered by Node.js and MongoDB, a highly interactive frontend, and a synchronized, role-based authentication system.

🚀 Live Demo

The application is live and can be tested at the following URL:
https://dashboard-mocha-six.vercel.app/

⚖️ License & Usage

© 2024 [Your Name / Your Username]. All Rights Reserved.

This project is for demonstration purposes only. You are not permitted to copy, distribute, or use this code for commercial or non-commercial purposes without prior written permission from the author.

✨ Features

    👥 Team Management & Role-Based Access Control (RBAC):

        Full CRUD functionality for user management within the dashboard.

        Distinct user roles (Administrator & Employee) with different permissions.

        Administrators have full control over users, content, and settings, while other roles have restricted access.

    🔐 Full User Authentication:

        Secure user registration and login system using NextAuth.js with a credentials provider.

        Passwords are encrypted using bcrypt.js before being stored in the database.

        Authentication state is synchronized between the application's database (MongoDB) and Firebase Authentication.

    📝 Multi-Site Content Management:

        A central dashboard to manage content for multiple different websites.

        Complete CRUD (Create, Read, Update, Delete) functionality for content types (e.g., accommodations), handled through dynamic, multi-step modals.

        Efficiently displays large content lists using infinite scrolling.

    📂 Integrated File Manager & Media Gallery:

        A powerful file manager connected to Firebase Cloud Storage to browse, preview, and delete uploaded assets.

        A dedicated media gallery to view all images associated with a website's content in one place.

        Robust multi-image uploader with client-side validation for file size and count.

    💻 Advanced UI/UX:

        A clean and intuitive user interface built with Tailwind CSS and Headless UI.

        Performant user experience with client-side search, dynamic component loading (code-splitting), and smooth transitions.

        Responsive Design: A mobile-first approach ensures a seamless experience on all devices, from desktops to smartphones.

🛠️ Tech Stack

    Framework: Next.js 14 (App Router)

    Language: JavaScript

    Database: MongoDB with Mongoose

    Authentication: NextAuth.js, Firebase Authentication

    Storage: Firebase Cloud Storage

    Backend: Node.js, Firebase Admin SDK

    Frontend: React 18

    UI/UX Libraries:

        Headless UI: For accessible UI components (Modals, Menus).

        Heroicons: For SVG icons.

    Styling: Tailwind CSS

    Utilities:

        bcrypt.js: For password hashing.

        lodash: For utility functions like debouncing.

        uuid: For generating unique IDs.

🚀 Future Enhancements

Here are some of the planned features to further enhance the application:

    🖼️ Enhanced Media Gallery: Add options for cropping, rotating, and organizing images directly within the media gallery.

    💬 Live Chat Support: Implement a real-time chat feature for users to communicate directly with the support team.

    📅 Reservations Section: Build a new module for managing bookings and reservations associated with content items.

    🌐 Multi-Language Support: Internationalize the dashboard to support multiple languages for a global user base.

    🌙 Dark Mode: Implement a theme-switcher to allow users to toggle between light and dark modes.
