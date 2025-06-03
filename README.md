# 💳 Payments Microservice - NestJS

> ⚙️ **This service runs in two modes:**
> - 🧩 **Microservice via NATS** for internal communication
> - 🔒 **HTTPS server** to receive **Stripe Webhooks**

This is a microservice for handling payments using **Stripe**, built with [NestJS](https://nestjs.com/).  
It is part of a microservices architecture and manages the creation of Stripe sessions, payment confirmations, and webhook validation.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Running with Docker](#-running-with-docker)
- [Additional Notes](#-additional-notes)
- [License](#-license)

---

## 🚀 Features

- Stripe integration for handling payments
- Create payment sessions with success and cancel URLs
- Secure webhook verification using Stripe’s signing secret
- Microservice communication using NATS
- HTTPS support for Stripe webhook verification

---

## 🛠️ Tech Stack

| Technology | Description                                |
|------------|--------------------------------------------|
| NestJS     | Backend framework for Node.js              |
| TypeScript | Main language of the project               |
| Stripe     | Payment processing                         |
| NATS       | Event-based microservice communication     |

---

## 📁 Project Structure

```
src/
├── payments/            # Payments module (controllers, services, webhooks)
├── config/              # Global config and environment validation
├── main.ts              # Entry point of the application
```

---

## 📦 Installation

To run the payments microservice locally:

1. **Clone the repository**

```bash
git clone https://github.com/nest-microservices-nel/payments-s.git
cd payments-s
```

2. **Install dependencies**

```bash
npm install
```

3. **Create the .env file**

```env
PORT=3000
STRIPE_SECRET=your_stripe_secret
STRIPE_SUCCESS_URL=http://localhost:3003/payments/success
STRIPE_CANCEL_URL=http://localhost:3003/payments/cancel
STRIPE_SIGNING_WEBHOOK_ENDPOINT=your_webhook_signing_secret
NATS_SERVERS=nats://nats-server:4222
```

4. **Run the service**

```bash
npm run start:dev
```

---

## 🔐 Environment Variables

| Variable                         | Description                                 |
|----------------------------------|---------------------------------------------|
| `PORT`                           | Port for the service                        |
| `STRIPE_SECRET`                  | Stripe private secret key                   |
| `STRIPE_SUCCESS_URL`             | URL redirected after successful payment     |
| `STRIPE_CANCEL_URL`              | URL redirected after canceled payment       |
| `STRIPE_SIGNING_WEBHOOK_ENDPOINT` | Stripe webhook signing secret               |
| `NATS_SERVERS`                   | NATS connection URL                         |

---

## 📬 API Endpoints

### 💳 Create Checkout Session

**POST** `/payments/create`

- Body: `{ amount: number, currency: string, metadata?: any }`
- Returns a Stripe checkout session URL.

### 🔁 Webhook Listener

**POST** `/payments/webhook`

- Listens for Stripe events (e.g., `checkout.session.completed`).
- Validates request using `STRIPE_SIGNING_WEBHOOK_ENDPOINT`.
- Must be exposed as an **HTTPS endpoint** for Stripe to deliver events.

### ✅ Success URL

**GET** `/payments/success`

- Placeholder route after successful Stripe payment.

### ❌ Cancel URL

**GET** `/payments/cancel`

- Placeholder route if the payment is canceled.

---

## 🐳 Running with Docker

### Step 1: Build the Docker image

```bash
docker build -t payments-s .
```

### Step 2: Run the container

```bash
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e STRIPE_SECRET=your_stripe_secret \
  -e STRIPE_SUCCESS_URL=http://localhost:3003/payments/success \
  -e STRIPE_CANCEL_URL=http://localhost:3003/payments/cancel \
  -e STRIPE_SIGNING_WEBHOOK_ENDPOINT=your_webhook_signing_secret \
  -e NATS_SERVERS=nats://nats-server:4222 \
  payments-s
```

---

## 📌 Additional Notes

- Requires a valid Stripe account and API keys.
- The webhook listener (`/payments/webhook`) must be accessible over **HTTPS**.
- In development, you can use [ngrok](https://ngrok.com/) to expose local HTTPS URLs for Stripe.
- This microservice is intended to work as part of a larger architecture using NATS for internal communication.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Author

**Nelson G.**  
[GitHub](https://github.com/nelsin-06)

[LinkedIn](https://www.linkedin.com/in/nelson-gallego-tec-dev)

---
