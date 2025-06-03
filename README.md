# 💳 Payments Microservice - NestJS

This is the **Payments** microservice built with [NestJS](https://nestjs.com/).  
It is part of a microservices architecture and handles payment session creation and webhook handling from payment providers.

---

> ⚠️ **Important Note:**  
> This microservice communicates using **NATS** and also exposes specific **HTTPS routes** for webhooks and redirects.  
> Only HTTPS endpoints are listed below. Internal NATS handlers are excluded from this documentation.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running with Docker](#-running-with-docker)
- [HTTPS Endpoints](#-https-endpoints)
- [Additional Notes](#-additional-notes)
- [License](#-license)

---

## 🚀 Features

- Create payment sessions via HTTPS
- Handle webhooks from external payment platforms
- NATS-based communication with other microservices
- Built for secure and scalable architecture

---

## 🛠️ Tech Stack

| Technology | Description                                |
|------------|--------------------------------------------|
| NestJS     | Backend framework for Node.js              |
| TypeScript | Main language of the project               |
| NATS       | Message broker for microservice messaging  |
| HTTPS      | Secure endpoints for webhooks and redirects|

---

## 📁 Project Structure

```
src/
├── payments/            # Core logic for payments and webhooks
├── common/              # Shared utilities and constants
├── config/              # Environment config and validation
├── main.ts              # Entry point of the application
```

---

## 📦 Installation

To run the microservice locally:

1. **Clone the repository**

```bash
git clone https://github.com/nest-microservices-nel/payments-s.git
cd payments-s
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
STRIPE_SECRET=your_stripe_secret
STRIPE_SUCCESS_URL=http://localhost:3003/payments/success
STRIPE_CANCEL_URL=http://localhost:3003/payments/cancel
STRIPE_SIGNING_WEBHOOK_ENDPOINT=your_stripe_webhook_signing_secret
NATS_SERVERS=nats://nats-server:4222
```

4. **Run in development mode**

```bash
npm run start:dev
```

---

## 🔐 Environment Variables

| Variable                     | Description                                     |
|------------------------------|------------------------------------------------|
| `PORT`                      | Port where the service will run                 |
| `STRIPE_SECRET`             | Stripe secret key for API authentication        |
| `STRIPE_SUCCESS_URL`        | URL to redirect after a successful payment      |
| `STRIPE_CANCEL_URL`         | URL to redirect after a canceled payment        |
| `STRIPE_SIGNING_WEBHOOK_ENDPOINT` | Stripe webhook signing secret to validate webhooks |
| `NATS_SERVERS`              | NATS server URL                                 |

---

## 🐳 Running with Docker

### Step 1: Build the Docker image

```bash
docker build -t payments-ms .
```

### Step 2: Run the container

```bash
docker run -p 3000:3000   -e PORT=3000   -e STRIPE_SECRET=your_stripe_secret   -e STRIPE_SUCCESS_URL=http://localhost:3003/payments/success   -e STRIPE_CANCEL_URL=http://localhost:3003/payments/cancel   -e STRIPE_SIGNING_WEBHOOK_ENDPOINT=your_stripe_webhook_signing_secret   -e NATS_SERVERS=nats://nats-server:4222   payments-ms
```

---

## 🔗 HTTPS Endpoints

These are the **public HTTP endpoints** exposed by the microservice:

| Method | Path                       | Description                        |
|--------|----------------------------|------------------------------------|
| POST   | `/payments/session/create`| Creates a payment session          |
| GET    | `/payments/success`       | Redirect after successful payment  |
| GET    | `/payments/cancel`        | Redirect after canceled payment    |
| ALL    | `/payments/webhook`       | Handles payment webhook callbacks  |

> 🔐 Webhooks are validated using the `STRIPE_SIGNING_WEBHOOK_ENDPOINT` secret.

---

## 📌 Additional Notes

- Internal routes using `@MessagePattern` via **NATS** are **not listed here**.
- Exposed HTTP routes are limited to payment redirections and webhook handling.
- Make sure this service is reachable over HTTPS in production environments.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Author

**Nelson G.**  
[GitHub](https://github.com/nelsin-06)  
[LinkedIn](https://www.linkedin.com/in/nelson-gallego-tec-dev)
