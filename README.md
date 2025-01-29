# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



User Management App
A simple React-based user management application that allows you to add, edit, and delete users. The app includes toast notifications for success and error messages using react-toastify.

Features
Add User: Allows you to add new users with details like name, email, phone, company name, and address.
Edit User: Allows you to edit existing users.
Delete User: Allows you to delete users.
Toast Notifications: Success and error messages for add, edit, and delete actions using react-toastify.
Responsive Design: The UI is responsive and works well on both desktop and mobile devices.
Technologies Used
React: JavaScript library for building user interfaces.
react-toastify: A library for adding toast notifications.
Tailwind CSS: A utility-first CSS framework for styling.
React Modal: To open forms in modals for adding and editing users.
Installation
1. Clone the repository:
bash
Copy
Edit
git clone https://github.com/yourusername/user-management-app.git
cd user-management-app
2. Install dependencies:
bash
Copy
Edit
npm install
3. Start the development server:
bash
Copy
Edit
npm start
4. Open your browser:
Go to http://localhost:3000 to view the app.

Usage
Adding a New User
Click on the "Add User" button.
Fill in the user details (Name, Email, Phone, Company, Address).
Click "Add User" to save.
Editing a User
Click on the "Edit" button on the user card you wish to update.
Modify the details in the form.
Click "Update User" to save changes.
Deleting a User
Click on the "Delete" button on the user card you wish to remove.
Confirm the deletion in the confirmation dialog.

