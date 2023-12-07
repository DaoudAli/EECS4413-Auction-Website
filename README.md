# E-Commerce Auction System

This repository contains the backend services for an e-commerce auction platform implemented using a microservice architecture with Spring Boot, and a frontend application built using Next.js and Bun. This project is developed for the EECS4413 Class at York University.

# Live Deployment
You can access the application at https://eecs-4413-auction-website.vercel.app

## Services

- `catalogueService`: Manages the catalogue of auction items.
- `auctionService`: Handles the auction process, including bidding and auction closures.
- `userService`: Manages user accounts, authentication, and authorization.
- `paymentService`: Processes payments and transactional operations.

Each service is designed to run independently, communicating over well-defined APIs.

## Getting Started

Instructions to run the system locally can be found below. There are backend services that need to be started first, a total of four microservices. Then a frontend client. 

### Prerequisites

- Java JDK 17
- Maven 3.6 or later
- Access to the hosted MySQL database (credentials required from developers)
- Bun (for running the frontend application)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/DaoudAli/EECS4413-Auction-Website.git
   ```

2. **Navigate to Each Service Directory:**
   For each service (`catalogueService`, `auctionService`, `userService`, `paymentService`), navigate to its directory and run it as a Spring Boot application.
   ```bash
   cd EECS4413-Auction-Website/<service_name>
   mvn spring-boot:run
   ```

3. **Running the Services:**
   Each service runs on a different port and can be accessed independently.
   - Catalogue Service: `http://localhost:3100`
   - Auction Service: `http://localhost:3200`
   - User Service: `http://localhost:3300`
   - Payment Service: `http://localhost:3400`

4. **Setting Up the Frontend Application:**
   - Navigate to the frontend application directory:
     ```bash
     cd EECS4413-Auction-Website/client-app
     ```
   - Install dependencies and run the development server with Bun:
     ```bash
     bun install
     bun --bun run dev
     ```
   - The frontend application will be available at `http://localhost:3000`.
   - 
### Swagger UI Documentation

Each service provides Swagger UI documentation for its API endpoints. While the service is running, you can access these documents at:

- Catalogue Service Swagger UI: `http://localhost:3100/swagger-ui/index.html#`
- Auction Service Swagger UI: `http://localhost:3200/swagger-ui/index.html#`
- User Service Swagger UI: `http://localhost:3300/swagger-ui/index.html#`
- Payment Service Swagger UI: `http://localhost:3400/swagger-ui/index.html#`

Through these interfaces, users can view all available routes, their specifications, and test the API endpoints directly.
### Usage

After starting the services and the frontend application, you can use the platform to browse the catalogue, participate in auctions, manage user accounts, and process payments. Each service's API can be accessed for extended functionalities or integrations.

## Database
Our MySQL database is hosted online. We will send you the necessary credential files during submission. 

---

Please ensure that all your local environment settings are properly configured to connect to the necessary services and databases.
