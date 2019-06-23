const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const logRoutes = require("./routes/users")
const roomRoutes=require("./routes/room");

const app = express();

// mongoose
//   .connect(
//     "mongodb+srv://or:VzZVigDX6xL1yGDI@postsapp-ecxlm.mongodb.net/node-angular?retryWrites=true" //change the word after '.net/ to the name of the db thats you want to store your data
//   )
  mongoose.connect(
      "mongodb+srv://guestRoom:P4jx06W7rO8sYgJ3@cluster0-klhqd.mongodb.net/guestRoomApp?retryWrites=true", { useNewUrlParser: true }//for some console warning
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("back-end/images"))); //any request targeting with '/images' will be allowed to continue and path the file from that folder. and inside the static 'path.join('backend/images)'make sure that every req to '/images' are forward to 'backend/images'

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/users",logRoutes)
app.use("/api/room",roomRoutes)
module.exports = app;
