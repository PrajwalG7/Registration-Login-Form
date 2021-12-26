const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/registration-login", {})
  .then(() => {
    console.log("Connection successfull: Connected with MongoDB");
  })
  .catch((e) => {
    console.log("Connection UnSuccessfull: Could not connect with MongoDB", e);
  });
