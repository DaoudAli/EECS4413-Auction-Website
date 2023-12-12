# E-Commerce Auction System
 
This repository contains the backend services for an e-commerce auction platform implemented using a microservice architecture with Spring Boot, and a frontend application built using Next.js and Bun. This project is developed for the EECS4413 Class at York University.

# Live Deployment
You can access the application from https://eecs-4413-auction-website.vercel.app
kend architecture.

# Services

- `catalogueService`: Manages the catalogue of auction items.
- `auctionService`: Handles the auction process, including bidding and auction closures.
- `userService`: Manages user accounts, authentication, and authorization.
- `paymentService`: Processes payments and transactional operations.

Each service is designed to run independently, communicating over well-defined APIs.

# Docker and Azure Container Deployment
We have deployed our Spring Boot microservices in Docker containers hosted on Azure Container Instances. This allows our services to be scalable and easily manageable.

Note: Currently, our backend services are deployed using HTTP instead of HTTPS. Due to this, the frontend browser needs to be configured to accept HTTP requests for the application to function correctly. We are working on enabling HTTPS to enhance security and compatibility.

### Service Links
- `Catalogue Service`: http://catalogue-service.eastus.azurecontainer.io:3100/catalogue
- `Payment Service`: http://payment-service.eastus.azurecontainer.io:3400/payment
- `Auction Service`: http://auction-service.eastus.azurecontainer.io:3200/auctions
<!-- - `User Service`: http://user-service.eastus.azurecontainer.io:3300/users -->

 Each link provides access to the respective service's functionalities and is a part of our microservice-based bac

# Getting Started

Instructions to run the system locally can be found below. There are backend services that need to be started first, a total of four microservices. Then a frontend client. 

## Prerequisites

- Java JDK 17
- Maven 3.6 or later
- Access to the hosted MySQL database (credentials required from developers)
- Bun (for running the frontend application)

## Installation

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

# App Screenshots and Use Cases

## UC1: Sign-Up and Sign-In
Users can click the sign in/sign up button at the top right of the screen to navigate to the respective screen.

<img src="https://github.com/DaoudAli/EECS4413-Auction-Website/blob/340d5228a6a05fd55d7df9f8442ba6115802820d/Screenshots/auction-zone-sign-up.png?raw=true" alt="Sign-Up Page" width="650"/>
<img src="https://github.com/DaoudAli/EECS4413-Auction-Website/blob/340d5228a6a05fd55d7df9f8442ba6115802820d/Screenshots/auction-zone-sign-in.png?raw=true" alt="Sign-In Page" width="650"/>


## UC2: Browse Catalogue of Auctioned Items
Users can click the buy an item button and browse through the list of available items, they can also search for a specific item and click on the items to view details about it and the auction.

<img src="https://github.com/DaoudAli/EECS4413-Auction-Website/blob/main/Screenshots/auction-zone-search.png?raw=true" alt="Item Search" width="700"/>
<img src="https://github.com/DaoudAli/EECS4413-Auction-Website/blob/340d5228a6a05fd55d7df9f8442ba6115802820d/Screenshots/auction-zone-explore-2.png?raw=true" alt="Display Auctioned Items" width="650"/>
<img src="https://github.com/DaoudAli/EECS4413-Auction-Website/blob/340d5228a6a05fd55d7df9f8442ba6115802820d/Screenshots/auction-zone-item.png?raw=true" alt="Item Selection" width="650"/>

## UC3: Bidding
Users can browse through items and select an item to bid on if its a forward auction item and they can buy now its its up for dutch auction.

<img src="https://github.com/DaoudAli/EECS4413-Auction-Website/blob/340d5228a6a05fd55d7df9f8442ba6115802820d/Screenshots/auction-zone-forward-item.png?raw=true" alt="Forward Auction Bidding" width="650"/>
<img src="https://github.com/DaoudAli/EECS4413-Auction-Website/blob/340d5228a6a05fd55d7df9f8442ba6115802820d/Screenshots/auction-zone-dutch-item.png?raw=true" alt="Dutch Auction Bidding" width="650"/>

## UC4: Auction Ended
When an auciton is over either by means of a buy now on dutch auction or when the time runs out on a forward auction, the winning user is shown the option to pay along with the shipping cost.

<img src="https://github.com/DaoudAli/EECS4413-Auction-Website/blob/340d5228a6a05fd55d7df9f8442ba6115802820d/Screenshots/auction-zone-dutch-item-sold.png?raw=true" alt="Auction Ended 'Pay Now' Page" width="650"/>

## UC5: Payment
Payment is processed using stripe.

<img src="https://github.com/DaoudAli/EECS4413-Auction-Website/blob/340d5228a6a05fd55d7df9f8442ba6115802820d/Screenshots/auction-zone-payment.png?raw=true" alt="Payment Page" width="650"/>

## UC6: Receipt Page and Shipment Details
Once payment is done the user gets a receipt and can navigate back to the main page.

<img src="https://github.com/DaoudAli/EECS4413-Auction-Website/blob/340d5228a6a05fd55d7df9f8442ba6115802820d/Screenshots/auciton-zone-payment-receipt.png?raw=true" alt="Receipt and Shipping Details" width="650"/>

## UC7: Sell Item
Users can click the sell an item button at the top right of the screen and then they add the item they want to sell after this they are directed to list that item up for auction.

<img src="https://github.com/DaoudAli/EECS4413-Auction-Website/blob/340d5228a6a05fd55d7df9f8442ba6115802820d/Screenshots/auction-zone-add-item.png?raw=true" alt="Add Item Page" width="650"/>
<img src="https://github.com/DaoudAli/EECS4413-Auction-Website/blob/340d5228a6a05fd55d7df9f8442ba6115802820d/Screenshots/auction-zone-sell-item.png?raw=true" alt="Sell Item Page" width="650"/>


## Swagger UI Documentation

Each service provides Swagger UI documentation for its API endpoints. While the service is running, you can access these documents at:

- Catalogue Service Swagger UI: `http://localhost:3100/swagger-ui/index.html#`
- Auction Service Swagger UI: `http://localhost:3200/swagger-ui/index.html#`
- User Service Swagger UI: `http://localhost:3300/swagger-ui/index.html#`
- Payment Service Swagger UI: `http://localhost:3400/swagger-ui/index.html#`

Through these interfaces, users can view all available routes, their specifications, and test the API endpoints directly.

## Usage

After starting the services and the frontend application, you can use the platform to browse the catalogue, participate in auctions, manage user accounts, and process payments. Each service's API can be accessed for extended functionalities or integrations.

## Database
Our MySQL database is hosted online. We will send you the necessary credential files during submission. 

## Docker

You can find the Docker images for each service hosted on dockerhub with the links below:
- Catalogue Service: https://hub.docker.com/r/daoudali/eecs4413
- Auction Service: https://hub.docker.com/r/daoudali/auctionservice
- Payment Service: https://hub.docker.com/r/daoudali/paymentservice
- User Service: https://hub.docker.com/r/daoudali/userservice

## Notes

Please ensure that all your local environment settings are properly configured to connect to the necessary services and databases.
