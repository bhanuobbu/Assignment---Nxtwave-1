-- Postgres schema for recipes app
-- Run: psql -U <user> -d recipesdb -f postgres/schema.sql

CREATE TABLE IF NOT EXISTS recipes (
  id SERIAL PRIMARY KEY,
  cuisine VARCHAR(255),
  title VARCHAR(1024),
  rating REAL,
  prep_time INT,
  cook_time INT,
  total_time INT,
  description TEXT,
  nutrients JSONB,
  serves VARCHAR(255),
  created_at TIMESTAMP DEFAULT now()
);

-- Optional indexes
CREATE INDEX IF NOT EXISTS idx_recipes_rating ON recipes (rating DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_recipes_cuisine ON recipes (cuisine);
CREATE INDEX IF NOT EXISTS idx_recipes_title ON recipes USING gin (to_tsvector('english', coalesce(title,'')));
