DROP TABLE IF EXISTS favgames;

CREATE TABLE IF NOT EXISTS favgames (
    -- all names are in lowercase --
    id SERIAL PRIMARY KEY,
    thumb VARCHAR(255),
    title VARCHAR(255),
    steamratingcount VARCHAR(255),
    steamratingpercent VARCHAR(255),
    comment VARCHAR(255)
)

------------------------------
-- psql -d games -f schema.sql
