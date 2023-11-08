# E-Commerce Auction System

This repository contains the backend services for an e-commerce auction platform implemented using a microservice architecture with Spring Boot. The frontend application is built using Next.js and is bundled with Bun.

Project is developed for the EECS4413 Class at York University.

## Services

- `catalogueService`: Manages the catalogue of auction items.
- `auctionService`: Handles the auction process, including bidding and auction closures.
- `userService`: Manages user accounts, authentication, and authorization.
- `paymentService`: Processes payments and transactional operations.

Each service is designed to run independently, communicating over well-defined APIs.

## Getting Started

### Prerequisites

- Java JDK 17
- Maven 3.6 or later
- Access to the hosted MySQL database (credentials required from developers)

### Installation

Clone the repository and navigate to each service directory:

```bash
git clone https://github.com/your-username/auction-system.git
cd auction-system/<service_name>
