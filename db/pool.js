const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "bogda",
  database: "invapp",
  password: "1537919",
  port: 5432,
});
