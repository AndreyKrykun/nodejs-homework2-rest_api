const app = require("./src/app");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

(async () => {
  try {
    await mongoose.connect(uriDb);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (err) {
    console.error("Failed to start server with error: ", err.message);
    process.exit(1);
  }
})();
