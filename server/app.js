const express = require("express");
const userModel = require("./models/users");

const fs = require("fs");
const admin = require("firebase-admin");
//firebased credentials
const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

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

//Importing connectDB function to connect in cloud mongoDB.
const connectDB = require("./db/connect");

//Defining the port.
const port = 8000 || process.env.port;

//*******************user routes*******************
//*******************user routes*******************
//middleware

app.use(async (req, res, next) => {
  const { authtoken } = req.headers;
  console.log("----->>>" + authtoken);
  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (e) {
      return res.sendStatus(400);
    }
  }

  req.user = req.user || {};
  next();
});

const postVerifyData =
  // router.route("/api/user/:id").get(getAllUsers).post(postUserData);

  //get method  get request shound create database
  app.get("/api/user/get", async (req, res) => {
    // try {
    //   const { uid } = req.user;
    //   console.log("^^^^^^^uid:::" + uid);
    //   // const getUsers = await userModel.find({});
    //   // res.json(getUsers);
    //   const createdUser = await userModel.create({ userID: uid });
    //   res.json(createdUser);
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const { uid } = req.user;
      //Searching if candiate exist in user data.
      const findIfCandiateExits = await userModel.find({
        userID: uid,
      });
      //Check if candiate exists in user data and if no.
      if (findIfCandiateExits.length == 0) {
        const createdUser = await userModel.create({ userID: uid });
        res.json(createdUser);
      }
    } catch (error) {
      console.log(error);
    }
  });

//user post method

//middleware to prevent non login user access
app.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

// app.post("/api/user/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const createdUser = await userModel.create({ userID: id });
//     res.json(createdUser);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.patch("/api/incUserVote/patch/:candidate", async (req, res) => {
  try {
    const { uid } = req.user;

    const { candidate } = req.params;
    console.log("--++++++" + uid + candidate);
    //Searching if candiate exist in user data.
    const findIfCandiateExits = await userModel.find({
      userID: uid,
      "votes.items": candidate,
    });

    //Check if candiate exists in user data and if no.
    if (findIfCandiateExits.length == 0) {
      const getData = { items: candidate };
      await userModel.updateOne(
        {
          userID: uid,
        },
        {
          $push: {
            votes: getData,
          },
        }
      );
    }

    //To increase vote count.
    await userModel.findOneAndUpdate(
      { userID: uid, "votes.items": candidate },
      { $inc: { "votes.$.voteCount": 1 } }
    );

    const getUpdateSpinnerData = await userModel.find({ userID: uid });
    res.json(getUpdateSpinnerData);
  } catch (error) {
    console.log(error);
  }
});

//Decrease vote

app.patch("/api/decUserVote/patch/:candidate", async (req, res) => {
  try {
    const { uid } = req.user;
    const { candidate } = req.params;

    //To increase vote count.
    await userModel.findOneAndUpdate(
      { userID: uid, "votes.items": candidate },
      { $inc: { "votes.$.voteCount": -1 } }
    );
    res.send("hello");
  } catch (error) {
    console.log(error);
  }
});

//******************************************* */
//*******************user routes*******************

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

  socket.on("voteCountDecrease", async (id) => {
    try {
      //Matching the id with
      await spinnerModel.findOneAndUpdate(
        { "spinner.x": id },
        { $inc: { "spinner.$.y": -1 } }
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
