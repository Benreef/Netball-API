const pg = require("pg");

const localDbName = 'netball_stats';

let db;
if (process.env.DATABASE_URL) {
  db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else {
  if (process.env.DEV_DB_PASSWORD) {
    db = new pg.Pool({
      database: localDbName,
      password: process.env.DEV_DB_PASSWORD
    })
  } else {
    db = new pg.Pool({
      database: localDbName
    })
  }
};

module.exports = db;