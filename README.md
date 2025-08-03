# 📰 Today News - Fullstack News Aggregator App

A fullstack web application that fetches news articles from multiple sources, allows users to register, login, and personalize their feed with preferred categories, sources, and authors. Built with Laravel, React, Tailwind, and Docker.

---

## 🚀 Features

- User registration & authentication (Laravel Sanctum)
- News fetching via scheduled tasks
- Filter and search articles (keyword, source, category, author, date)
- Personal user preferences
- Responsive React UI with TailwindCSS
- Dark mode toggle
- Dockerized backend & frontend
- RESTful APIs (Postman collection available)

---

## 🛠 Tech Stack

- **Backend:** Laravel 10, PHP 8.3, MySQL
- **Frontend:** React + TypeScript, Tailwind CSS
- **Auth:** Sanctum
- **Scheduler:** Laravel task scheduler via `schedule:work`
- **Containerization:** Docker, Docker Compose

---

## ⚙️ Setup Instructions

### Prerequisites

- Docker
- Docker Compose

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-org/today-news.git
cd today-news

# 2. Copy environment files
cp .env.example .env
cp frontend/.env.example frontend/.env

# 3. Start Docker containers
docker-compose up --build
```

This will:

- Build backend & frontend containers
- Run database migrations
- Fetch initial news data
- Start Laravel server at `http://localhost:8000`
- Start React app at `http://localhost:3000`

---

## 🔐 Environment Variables

Set the following in `.env`:

```env
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=today_news
DB_USERNAME=root
DB_PASSWORD=secret
NEWS_API_KEYS=...
```

Frontend (`frontend/.env`):

```env
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

---

## 📮 API Documentation

- Full Postman collection available: [📥 Download Collection](./postman_collection.json)
- Base URL: `http://localhost:8000/api`

---

## 🧪 Usage

1. Visit `http://localhost:3000`
2. Register or login
3. Set your news preferences (categories, sources, authors)
4. Browse your tailored news feed
5. Use filters to explore all articles

---

## 🌗 Dark Mode

Toggle dark/light mode from the navbar.

---

## 📄 License

MIT © 2025 Today News