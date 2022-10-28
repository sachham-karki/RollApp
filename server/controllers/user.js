const users = require("../models/users");
const userModel = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    const getUsers = await userModel.find({});
    res.json(getUsers);
  } catch (error) {
    console.log(error);
  }
};

const postUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const createdUser = await userModel.create({ userID: id });
    res.json(createdUser);
  } catch (error) {
    console.log(error);
  }
};

const addUserVotedItem = async (req, res) => {
  try {
    const { id, candidate } = req.params;

    //Searching if candiate exist in user data.
    const findIfCandiateExits = await userModel.find({
      userID: id,
      "votes.items": candidate,
    });

    //Check if candiate exists in user data and if no.
    if (findIfCandiateExits.length == 0) {
      const getData = { items: candidate };
      await userModel.updateOne(
        {
          userID: id,
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
      { userID: id, "votes.items": candidate },
      { $inc: { "votes.$.voteCount": 1 } }
    );

    const getUpdateSpinnerData = await userModel.find({ userID: id });
    res.json(getUpdateSpinnerData);
  } catch (error) {
    console.log(error);
  }
};

const decreaseCandidateVoteCount = async (req, res) => {
  try {
    const { id, candidate } = req.params;

    //To increase vote count.
    await userModel.findOneAndUpdate(
      { userID: id, "votes.items": candidate },
      { $inc: { "votes.$.voteCount": -1 } }
    );
    res.send("hello");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  postUserData,
  addUserVotedItem,
  decreaseCandidateVoteCount,
};
