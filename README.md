Relational SQL schema files (Postgres & MySQL)

Files included:
- postgres/schema.sql        -> Main Postgres schema (recipes table with JSONB nutrients)
- postgres/indexes.sql      -> Additional indexes and suggestions for Postgres
- postgres/sample_seed.sql  -> Two sample INSERTs to seed the DB
- mysql/schema_mysql.sql    -> MySQL-compatible schema (uses JSON type and FULLTEXT)

How to use (Postgres):
1. Start Postgres (locally or via docker-compose).
2. Create DB: createdb recipesdb
3. Apply schema:
   psql -U <user> -d recipesdb -f postgres/schema.sql
4. (optional) Add indexes:
   psql -U <user> -d recipesdb -f postgres/indexes.sql
5. (optional) Seed sample data:
   psql -U <user> -d recipesdb -f postgres/sample_seed.sql

How to use (MySQL):
1. Start MySQL and create a user/db as needed.
2. Apply schema:
   mysql -u <user> -p < mysql/schema_mysql.sql

Notes:
- Postgres JSONB is recommended for nutrients since it supports indexing and efficient JSON queries.
- For calorie-range numeric queries in Postgres, use regexp_replace to extract digits (see backend SQL examples).
