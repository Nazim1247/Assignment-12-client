# Dream House - Client Side

Welcome to the **Dream House** client-side repository! This is the front-end application for our real estate platform, where users can explore properties, search for their dream homes, and interact with various features like reviews, wishlists, and advertisements.

---

## Features
- **Homepage**: Displays a welcoming banner, featured properties, and advertisements.
- **Property Search**: Search properties by location and price range.
- **Authentication**: Login and register functionality using Firebase.
- **Wishlist**: Save favorite properties for later.
- **Admin Dashboard**: Manage properties, agents, and advertisements.
- **Responsiveness**: Fully responsive design optimized for all screen sizes.

---

## Technologies Used
- **Frontend Framework**: React.js
- **CSS Framework**: Tailwind CSS
- **State Management**: Context API
- **API Calls**: Axios
- **Authentication**: Firebase Authentication
- **Routing**: React Router

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dream-house-client.git
   ```

2. Navigate to the project directory:
   ```bash
   cd dream-house-client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_API_URL=http://localhost:5000
   ```

5. Start the development server:
   ```bash
   npm start
   ```

The application will run at [http://localhost:3000](http://localhost:3000).

---

## Folder Structure

```plaintext
src
├── components
│   ├── Banner
│   ├── Navbar
│   ├── Footer
│   ├── PropertyCard
│   └── ...
├── pages
│   ├── Home
│   ├── Login
│   ├── Register
│   ├── Dashboard
│   └── ...
├── context
│   └── AuthContext.js
├── hooks
│   └── useAuth.js
├── utils
│   └── axiosInstance.js
├── App.js
├── index.js
└── ...
```

---

## Available Scripts

- `npm start`: Runs the app in the development mode.
- `npm run build`: Builds the app for production.
- `npm test`: Launches the test runner.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For any inquiries or support, please contact:
- **Email**: support@dreamhouse.com
- **Website**: [Dream House](https://dreamhouse.com)

---

Thank you for contributing to **Dream House**!
