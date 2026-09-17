# Gator

Gator is a multi-user command-line RSS feed aggregator built with TypeScript, PostgreSQL, and Drizzle ORM.

It allows users to register and log in, add RSS feeds, follow feeds, continuously aggregate posts from those feeds, and browse the latest posts from the feeds they follow.

## Requirements

Before running Gator, make sure you have:

* Node.js 20+
* pnpm
* PostgreSQL
* Git

You can check your installations with:

```bash
node --version
pnpm --version
psql --version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/adm22222/gator.git
cd gator
```

Install dependencies:

```bash
pnpm install
```

## Database Setup

Gator uses PostgreSQL to store users, feeds, feed follows, and posts.

Create a PostgreSQL database for the application, then make sure you have a valid PostgreSQL connection URL.

For example:

```text
postgres://postgres:postgres@localhost:5432/gator?sslmode=disable
```

## Configuration

Gator stores its configuration in:

```text
~/.gatorconfig.json
```

Create the file with:

```json
{
  "db_url": "postgres://postgres:postgres@localhost:5432/gator"
}
```

The application will update `current_user_name` when a user logs in or registers.

After configuring the database, run the migrations:

```bash
pnpm drizzle-kit migrate
```

## Running Gator

You can run Gator using:

```bash
pnpm start <command> [arguments]
```

For example:

```bash
pnpm start register adam
```

## Available Commands

### Register

Create a new user and log in as that user:

```bash
pnpm start register adam
```

### Login

Switch to an existing user:

```bash
pnpm start login adam
```

### Users

List all registered users:

```bash
pnpm start users
```

The current user is marked with `(current)`.

### Add a Feed

Add an RSS feed:

```bash
pnpm start addfeed "Hacker News" "https://news.ycombinator.com/rss"
```

Adding a feed also automatically follows it for the current user.

### Feeds

List all feeds stored in the database:

```bash
pnpm start feeds
```

### Follow

Follow an existing feed:

```bash
pnpm start follow "https://news.ycombinator.com/rss"
```

### Following

List the feeds followed by the current user:

```bash
pnpm start following
```

### Unfollow

Stop following a feed:

```bash
pnpm start unfollow "https://news.ycombinator.com/rss"
```

### Aggregate

Continuously fetch RSS feeds and store their posts in the database:

```bash
pnpm start agg 1m
```

The argument specifies how long to wait between requests. Supported duration formats include:

```text
500ms
10s
1m
1h
```

The aggregator runs continuously until you stop it with `Ctrl+C`.

### Browse

View the latest posts from the feeds followed by the current user:

```bash
pnpm start browse
```

By default, the latest 2 posts are displayed.

You can specify a custom limit:

```bash
pnpm start browse 10
```

### Reset

Delete all users and their related data:

```bash
pnpm start reset
```

Use this command carefully because it removes the application data.

## Example Workflow

A simple workflow for getting started:

```bash
pnpm start register adam

pnpm start addfeed "Hacker News" "https://news.ycombinator.com/rss"

pnpm start following

pnpm start agg 1m
```

Leave the aggregator running, then open another terminal and run:

```bash
pnpm start browse
```

You can also add more feeds and browse a larger number of posts:

```bash
pnpm start addfeed "TechCrunch" "https://techcrunch.com/feed/"

pnpm start browse 10
```

Press `Ctrl+C` to stop the aggregator.

## Tech Stack

* TypeScript
* Node.js
* PostgreSQL
* Drizzle ORM
* fast-xml-parser
* pnpm

## Project Structure

```text
src/
├── commands/       # CLI command handlers
├── db/             # Database connection, schema, and queries
├── rss/            # RSS fetching and parsing
├── lib/            # Shared utilities
├── aggregator.ts   # Feed aggregation logic
├── config.ts       # Application configuration
└── index.ts        # CLI entry point
```
