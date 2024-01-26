# Paytm Clone

A simple Paytm clone project with user authentication (signup, signin) and the ability to send money to friends. Built using the MERN stack (MongoDB, Express.js, React with Vite, Node.js) and styled with Tailwind CSS.

## Features

- User Signup: Register for a new account.

- User Signin: Log in to your account.
- Update Details: User can update the personal details.

- Send Money: Transfer money to friends securely.

## Tech Stack

- **Frontend:** Vite, React

- **Backend:** Express.js (Node.js)

- **Database:** MongoDB

- **Authentication:** JSON Web Tokens (JWT)

- **Styling:** Tailwind CSS

## Setup Instructions

### Prerequisites

- Node.js and npm installed

- MongoDB installed and running

### Installation

1.  **Clone the repository:**

```bash

git clone https://github.com/ehconitin/simple-paytm-clone.git

cd simple-paytm-clone

```

2.  **Create .env file in simple-paytm-clone/backend**

`DB_USERNAME=<insert_username>`

`DB_PASSWORD=<insert_password>`

3.  **Install npm dependencies both in backend and frontend**

```bash
cd simple-paytm-clone/backend
npm init
```

```bash
cd simple-paytm-clone/frontend
npm init
```

4.  **Run both frontend and backend**

```bash
cd simple-paytm-clone/backend
node index.js
```

```bash
cd simple-paytm-clone/frontend
npm run dev
```

5. **Hit "/siginin" or "/signup" route on the vite hosted port to begin the application**
