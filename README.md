# Mahin.dev portfolio

React/Vite frontend and Express/MongoDB API for MD Mahin Uddin's developer portfolio.

## Run locally

```bash
cd client
npm run dev
```

The portfolio UI runs without the API, but the contact form requires the backend and MongoDB:

```bash
cd server
Copy-Item .env.example .env
# add a real MONGODB_URI and Gmail EMAIL_PASS (App Password)
npm run dev
```

The API exposes `GET /api/health`, `GET /api/projects`, `GET /api/testimonials`, and `POST /api/messages`.
