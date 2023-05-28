DROP TABLE IF EXISTS favgames;

CREATE TABLE IF NOT EXISTS favgames (
    -- all names are in lowercase --
    id int PRIMARY KEY,
    thumb VARCHAR(255),
    title VARCHAR(255),
    steamRatingCount VARCHAR(255),
    steamRatingPercent VARCHAR(255),
    comment VARCHAR(255)
)

------------------------------
-- psql -d games -f schema.sql
