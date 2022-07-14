const mongoose = require("mongoose");

const username = "qudustechbro";
const password = "qudusissowavy2022";

const DB = `mongodb+srv://${username}:${password}@wavy.gi3kdmv.mongodb.net/WavyNews?retryWrites=true&w=majority`;

const DBConnection = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = DBConnection;
