const express = require("express");

const app = express();

const cors = require("cors");

//Importing pageNotFound function from middlewares folder.
const pageNotFound = require("./middlewares/not-found");

//Importing error handler function from middleware folder.
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(cors());
//To convert request body to Json.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

//
const spinner = require("./routes/spinner");

app.use("/", spinner);

//Used to display page not found.
app.use(pageNotFound);

//Used to display internal server error or error on Http methods.
app.use(errorHandlerMiddleware);

require("dotenv").config();

//
const { createServer } = require("http");

const { Server } = require("socket.io");

const httpServer = createServer(app);

const io = new Server(httpServer, { cors: { origin: "*" } });
const spinnerModel = require("./models/spinnerData");

//Listening to connection.
io.sockets.on("connection", (socket) => {
  //Printing all the user that are connected to our server
  // console.log("User connected: " + socket.id);
  // //Checking if user is disconnected.
  // socket.on("disconnect", () => {
  //   console.log("user disconnected with " + socket.id);
  // });

  socket.on("voteCountUpdate", async (id) => {
    try {
      //Matching the id with
      await spinnerModel.findOneAndUpdate(
        { "spinner.x": id },
        { $inc: { "spinner.$.y": 1 } }
      );
      //Getting updated value.
      const getUpdatedValue = await spinnerModel.find({});
      //Sending data to fornt-end.
      io.sockets.emit("message", getUpdatedValue);
    } catch (error) {
      console.log(error);
    }
  });
});

//Importing connectDB function to connect in cloud mongoDB.
const connectDB = require("./db/connect");

//Defining the port.
const port = process.env.PORT || 8000;

const start = async () => {
  try {
    //Connecting to cloud mongo.
    await connectDB(process.env.MONGO_URL);
    httpServer.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

//Starting the server.
start();
