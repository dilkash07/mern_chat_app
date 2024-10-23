const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected successfully"))
    .catch((error) => {
      console.log("Error in DB connections");
      console.log(error.message);
      process.exit(1);
    });
};
