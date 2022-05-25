const { app } = require("./app");

// Init models

// utils database
const { db } = require("./utils/database");

// Authenticate db
db.authenticate()
  .then(() => console.log("Database is Authenticated"))
  .catch((err) => console.log(err));

// Sync db
db.sync()
  .then(() => console.log("Database Synced"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`eccommerce app running on Port ${PORT}`);
});
