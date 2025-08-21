-- MySQL schema for recipes app
-- Run: mysql -u <user> -p < recipesdb < mysql/schema_mysql.sql
-- Note: MySQL 5.7+ supports JSON; adjust types if older versions

CREATE DATABASE IF NOT EXISTS recipesdb;
USE recipesdb;

CREATE TABLE IF NOT EXISTS recipes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  cuisine VARCHAR(255),
  title VARCHAR(1024),
  rating DOUBLE,
  prep_time INT,
  cook_time INT,
  total_time INT,
  description TEXT,
  nutrients JSON,
  serves VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_recipes_rating ON recipes (rating);
CREATE INDEX idx_recipes_cuisine ON recipes (cuisine);
-- For full-text on title (MySQL FULLTEXT)
ALTER TABLE recipes ADD FULLTEXT INDEX idx_recipes_title (title);
