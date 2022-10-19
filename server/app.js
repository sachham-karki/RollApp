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

//Importing connectDB function to connect in cloud mongoDB.
const connectDB = require("./db/connect");

//Defining the port.
const port = 8000 || process.env.port;

const start = async () => {
  try {
    //Connecting to cloud mongo.
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

//Starting the server.
start();
