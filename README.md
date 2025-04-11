# Health Goals Project

This project is built using the **MACH** architecture principles.

It consists of two main services:

- `user-profile`: Manages user data.
- `health-goal`: Manages health goals.

## Service Communication

Services communicate using RESTful APIs. Reasons: Loose Coupling, REST Compatibility, and Flexibility (Can be replaced or extended in the future with technologies like gRPC)

## Database

Currently, each service uses an in-memory databases for development and testing purposes.

## API Gateway (Nginx)

I use Nginx as a reverse proxy/API gateway. Reasons:

- Routing: Directs traffic to appropriate services.
- Load Balancing: Can be easily configured to scale traffic across multiple instances.
- Security: Enables HTTPS, rate limiting, and request filtering.
- Decoupling: Keeps backend logic clean by handling routing externally.

## Containerization with Docker & Compose

All services are containerized using Docker, with Docker Compose used for local development.

## Cloud Deployment

- AWS ECS (Fargate) for container orchestration.
- S3 bucket to host headless frontend

Infrastructure managed using Terraform.

Why AWS ECS?

- Cloud-Native: Fully supports containerized microservices.
- Auto-Scaling: Seamlessly scales services based on load.
- Pay-as-you-go: Efficient cost management.
- Infrastructure as Code: Terraform allows repeatable, version-controlled deployments.

## Frontend (React)

The frontend of this application is built using React with Vite as the build tool.

### Headless Architecture

Compatible with Headless\*\* concept of MACH:

### Deployment to S3

The frontend app will be deployed as a static site to Amazon S3.

## Run the project locally

> services > docker-compose up --build
> frontend > npm run dev
> frontend > npm run test

### How to Run Terraform

```bash
terraform init
terraform plan
terraform apply
```

### Environment Variables

```bash
export AWS_ACCESS_KEY_ID=key_id
export AWS_SECRET_ACCESS_KEY=secret_key
export AWS_REGION=eu-central-1
```
