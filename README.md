# AEDE - Autonomous Execution + Distribution Engine

End-to-end content automation: **CREATE → SCORE → VARIANT → DISTRIBUTE → REPOST → ENGAGE → MEASURE → LEARN**

Daily, without manual input.

## Features

- **MACE**: AI-powered content generation using GPT-4
- **Smart Scoring**: Automated content quality assessment
- **Variant Engine**: Multiplies approved content into 4 variations
- **Publisher**: X (Twitter) API integration ready
- **Repost Engine**: Automatic scheduled distribution (6h & 24h delays)
- **Engagement Engine**: Follower engagement and metrics collection

## Tech Stack

- Node.js + TypeScript
- BullMQ + Redis (job queue)
- PostgreSQL (data)
- OpenAI (AI content generation)

## Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your credentials:
# - OPENAI_API_KEY
# - REDIS_URL
# - DATABASE_URL
# - X API credentials

# Run database migrations
psql $DATABASE_URL -f src/db/schema.sql

# Start the engine
npm run dev
```

## Usage

```bash
# Start normally (waits for scheduled jobs)
npm start

# Start and run pipeline immediately
npm run dev -- --run
```

## Project Structure

```
aede/
  src/
    config/env.ts      # Environment configuration
    db/client.ts       # PostgreSQL client
    db/schema.sql      # Database schema
    queue/queue.ts     # BullMQ queue setup
    queue/workers.ts   # Job processors
    scheduler/cron.ts  # Daily scheduling
    agents/
      mace.ts          # Content generation
      scorer.ts        # Quality scoring
      variants.ts      # Content variants
    services/
      publisher.ts     # X posting
      reposter.ts      # Scheduled reposts
      engager.ts       # Engagement actions
      metrics.ts       # Performance tracking
    index.ts           # Entry point
```

## Pipeline Flow

1. **7:00 AM Daily** - Pipeline triggers automatically
2. **MACE** - Generates 3 new content pieces
3. **Scorer** - Evaluates and filters (score > 6 = approved)
4. **Variants** - Creates 4 versions of each approved piece
5. **Publisher** - Posts to X (or simulates if no API key)
6. **Reposter** - Schedules reposts at 6h and 24h
7. **Engager** - Performs engagement actions
8. **Metrics** - Collects performance data

## License

MIT
