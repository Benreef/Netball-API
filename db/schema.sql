CREATE DATABASE netball_stats;
\c netball_stats

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    email TEXT,
    password_digest varchar(255)
);

CREATE TABLE teams (
  team_id SERIAL PRIMARY KEY,
  team_name VARCHAR(255),
  coach_name VARCHAR(255)
);

CREATE TABLE players (
  player_id SERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES teams(team_id),
  player_name VARCHAR(255),
  preferred_position VARCHAR(255)
);
CREATE TABLE games (
  game_id SERIAL PRIMARY KEY,
  team_id INT REFERENCES teams(team_id),
  result VARCHAR(255),
  score INT
);

CREATE TABLE intercepts (
  intercept_id SERIAL PRIMARY KEY,
  game_id INT REFERENCES games(game_id),
  player_id INT REFERENCES teams(team_id),
  quarter INT,
  position VARCHAR(255)
);

CREATE TABLE center_pass (
  center_pass_id SERIAL PRIMARY KEY,
  game_id INT REFERENCES games(game_id),
  player_id INT REFERENCES teams(team_id),
  quarter INT,
  position VARCHAR(255)
);

CREATE TABLE shooting_stats (
  shooting_id SERIAL PRIMARY KEY,
  game_id INT REFERENCES games(game_id),
  player_id INT REFERENCES teams(team_id),
  quarter INT,
  goals INT,
  missed INT
);