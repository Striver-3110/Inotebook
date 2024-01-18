const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = async () => {
  return new Promise((res, rej) => {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(mongoURI)
      .then(() => {
        console.log("Mongo connected");
        res();
      })
      .catch((error) => {
        console.log(error);
        rej();
        process.exit(0);
      });
  });

  // ******************* else ******************************
  //   mongoose.set("strictQuery", false);
  //   await mongoose.connect(mongoURI);
  //   console.log("Mongo connected");

  //   console.log(error);
  //   process.exit();
  // ******************* else ******************************
};
module.exports = connectToMongo;
