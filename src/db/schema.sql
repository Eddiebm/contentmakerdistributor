-- AEDE Database Schema

CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  variant TEXT,
  platform TEXT DEFAULT 'x',
  score INT DEFAULT 0,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS metrics (
  id SERIAL PRIMARY KEY,
  content_id INT REFERENCES content(id),
  impressions INT DEFAULT 0,
  likes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_content_status ON content(status);
CREATE INDEX IF NOT EXISTS idx_content_created ON content(created_at);
CREATE INDEX IF NOT EXISTS idx_metrics_content ON metrics(content_id);
