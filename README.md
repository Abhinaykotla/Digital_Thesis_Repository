# Digital Thesis Repository

Welcome to the **Digital Thesis Repository**, a platform designed to provide centralized storage and retrieval of academic theses. This repository aims to streamline access to research work and support students, faculty, and researchers in their academic endeavors.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Development](#development)
  - [Frontend (Next.js)](#frontend-nextjs)
  - [Backend (Express.js)](#backend-expressjs)
  - [Chat Server (Socket.io)](#chat-server-socketio)
- [Starting the Servers](#starting-the-servers)
- [Database Setup](#database-setup)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies**:
    Run the following command to install the necessary dependencies:
    ```bash
    npm install
    ```

3. **Set up the database**:
    - Ensure you have MySQL installed and running.
    - Create a database named `wdm`.
    - Import the SQL schema and data from `wdm.sql` into your MySQL database.

## Usage

Once the project is hosted, you can access the repository through the provided cloud hosting URL. Users can browse, search, and download theses as needed.

## Features

- **Search functionality**: Find specific theses with ease.
- **User-friendly interface**: Navigate the platform easily.
- **Secure access**: Access academic research securely.
- **Thesis management**: Upload and manage theses for faculty and students.

## Development

### Starting the Development Environment

#### Frontend (Next.js)

Start the frontend development server:
```bash
npm run dev
```

#### Backend (Express.js)

Start the backend server:
```bash
npm run backend
```

#### Chat Server (Socket.io)

Start the chat server:
```bash
npm run chat
```

## Starting the Servers

1. **Frontend Development Server**: Runs the user interface.
2. **Backend Server**: Manages the backend API and interactions.
3. **Chat Server**: Powers real-time messaging and notifications.

## Database Setup

1. **Start MySQL Server**: 
   - Use XAMPP or any other MySQL service to start the MySQL service.

2. **Import Database Schema**:
   - Open phpMyAdmin or any MySQL client.
   - Create a new database named `wdm`.
   - Import the `wdm.sql` file into the `wdm` database.

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
