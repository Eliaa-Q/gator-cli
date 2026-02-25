# Gator

Gator is a CLI RSS reader and feed aggregator.

## Setup

1. Install dependencies  
   ```bash
   npm install```
2. Create config file
  ```bash
Create ~/.gatorconfig.json:

{
  "db_url": "postgres://postgres:postgres@localhost:5432/gator"
}
```
3. Run the CLI
  ```bash
npm run start
```
## Commands

login <username> – log in

register <username> – create user

addfeed <name> <url> – add RSS feed

follow <url> – follow feed

unfollow <url> – unfollow feed

browse [limit] – view latest posts

agg <duration> – start aggregator (e.g. 30s)
