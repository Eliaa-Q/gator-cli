# 🐊 Gator CLI

A **TypeScript command-line RSS aggregator** powered by **PostgreSQL** and **Drizzle ORM**.  
Follow feeds, aggregate posts in the background, and browse the latest articles — all from your terminal.

---

## 🚀 Features

* User authentication (register / login)
* Add and follow RSS feeds
* Background feed aggregation loop
* Persistent PostgreSQL storage
* Browse latest posts from followed feeds

---

## 🏗 Architecture

### Command Registry

Commands are registered dynamically through a centralized registry.

Each command:

* Accepts arguments from the CLI
* Executes an async handler
* Can use middleware (e.g., logged-in checks)

---

### Middleware

A `middlewareLoggedIn` wrapper ensures certain commands:

* Require an authenticated user
* Automatically fetch the current user

---

### Database Layer

Built with **Drizzle ORM** and PostgreSQL.

Tables:

* `users`
* `feeds`
* `feed_follows`
* `posts`

---

### Aggregator

The `agg` command:

* Runs in a long-lived loop
* Fetches RSS feeds at a configurable interval
* Stores posts in the database

---

## 📚 Commands

| Command | Description |
|----------|------------|
| `register <name>` | Create a new user |
| `login <name>` | Log in as user |
| `addfeed <name> <url>` | Add a new RSS feed |
| `follow <url>` | Follow a feed |
| `unfollow <url>` | Unfollow a feed |
| `following` | List followed feeds |
| `browse [limit]` | View latest posts (default: 2) |
| `agg <duration>` | Start feed aggregator (e.g., `30s`, `1m`) |
| `reset` | Reset database |
| `users` | List users |

---

## 🎮 Demonstration

<img width="1125" height="637" alt="image" src="https://github.com/user-attachments/assets/7e1f39af-c80f-4515-86bc-366ea6877e44" />
<img width="1105" height="642" alt="image" src="https://github.com/user-attachments/assets/2f0ab769-f9e7-4b64-8481-18c33ceac9ed" />
<img width="1123" height="664" alt="image" src="https://github.com/user-attachments/assets/bbf0c047-b5dc-4b35-ac59-32f08fa68198" />
<img width="1141" height="667" alt="image" src="https://github.com/user-attachments/assets/aebde940-aa5f-4e6f-9020-2337eee7b1e5" />

---

## 🛠 Installation

### Requirements

* Node.js 22+
* PostgreSQL
* A database named `gator`

---

### Setup

Install dependencies:

```bash
npm install
