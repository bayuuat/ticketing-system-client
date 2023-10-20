# Ticketing System KBDSI- React Vite

## Overview

Welcome to the Ticketing System repository! This project is a comprehensive solution for managing and tracking tickets, issues, or tasks in various contexts, such as customer support, software development, project management, and more.

## Features

- **Ticket Creation and Management**
  - Create, update, and delete tickets.
  - Assign tickets to team members or individuals.
  - Categorize and prioritize tickets.

- **User-Friendly Interface**
  - Intuitive and responsive web interface.
  - Filter and search functionality for easy navigation.
  - Dashboard for an overview of ticket status.

- **Notifications and Communication**
  - Real-time chat communication for ticket updates using WebSocket.
  - Email notifications for users.

- **Reporting and Analytics**
  - Generate reports on ticket performance and trends.
  - Visualize data with charts and graphs.
  - Export data for further analysis.

## Technologies Used

This project is built using a stack that includes:

- **Frontend**: React, React-router-dom, Stomp.JS, Tailwind, Shadcn UI.
- **Backend**: Java Spring Boot, Redis, Mailgun, Cloudinary.
- **Database**: MySQL.
- **Additional Technologies**: WebSocket.

## How to Run Locally

### Running directly via terminal (npm)

#### Step to Run
1. Clone the repo to your local machine
   ```
   git clone git@github.com:bayuuat/ticketing-system-client.git
   cd ticketing-system-client
   ```
2. Create a `.env` file by running 
   ```
   cp .env.example .env
   ```
3. Set the URL in .env
   ```
   VITE_API_URL=type_your_server_url
   ```
4. Install dependencies and start the development server
   ```
   npm install
   npm run dev
   ```
5. Finally, it can be accessed on `http://localhost:5173`

## Sneakpeek

![asdwdw](https://github.com/bayuuat/ticketing-system-client/assets/68576415/70e3da98-5017-4d2e-8de0-cd966dc1ffcc)

![Screenshot (141)](https://github.com/bayuuat/ticketing-system-client/assets/68576415/8ce7f1ea-61cb-4bfa-8007-66465246865a)
