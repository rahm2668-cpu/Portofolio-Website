CREATE TABLE IF NOT EXISTS sessions (
  session TEXT PRIMARY KEY CHECK(length(session) = 64),
  expires INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_expiry ON sessions(expires);
CREATE TABLE IF NOT EXISTS visits (
  visit INTEGER PRIMARY KEY AUTOINCREMENT,
  country TEXT CHECK(country IS NULL OR (length(country) = 2 AND country GLOB '[A-Z][A-Z]')),
  at TEXT NOT NULL
);
