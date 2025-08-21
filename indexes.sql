-- Additional indexes and helpers for Postgres

-- If you will perform frequent searches on nutrients (e.g., calories numeric extraction),
-- consider a functional index for calories (extract numeric part using regexp_replace)
CREATE INDEX IF NOT EXISTS idx_recipes_calories_numeric ON recipes (
  (regexp_replace(coalesce(nutrients->>'calories',''), '[^0-9.-]', '', 'g'))::float
);

-- Create an index to speed up text searches on description if needed
CREATE INDEX IF NOT EXISTS idx_recipes_description ON recipes USING gin (to_tsvector('english', coalesce(description,'')));
