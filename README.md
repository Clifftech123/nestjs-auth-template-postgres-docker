
# Spring Boot Docker CRUD Application

This project demonstrates a simple CRUD (Create, Read, Update, Delete) application using Spring Boot,
packaged and run using Docker. It utilizes Lombok for reducing boilerplate code in Java applications, 
Spring Data JPA for database interactions, and Docker for containerization.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Java 17 or newer
- Maven
- Docker

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

1. Clone the repository to your local machine.
2. Navigate to the project directory.



3. Build the project using Maven.

```bash
mvn clean install
```

4. Build the Docker image.

```bash
docker build -t springboot-docker-crud .
```

5. Run the application using Docker Compose.

```bash
docker-compose up
```

The application should now be running and accessible at `http://localhost:8080/`.

## Using the Application

The application supports basic CRUD operations for a `Product` entity.

- **Create a Product**: `POST /products`
- **Read all Products**: `GET /products`
- **Read a Product by ID**: `GET /products/{id}`
- **Update a Product**: `PUT /products/{id}`
- **Delete a Product**: `DELETE /products/{id}`

## Built With

- [Spring Boot](https://spring.io/projects/spring-boot) - The web framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [Docker](https://www.docker.com/) - Containerization

