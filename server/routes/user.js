const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  postUserData,
  addUserVotedItem,
  decreaseCandidateVoteCount,
} = require("../controllers/user");

router.route("/api/user/:id").get(getAllUsers).post(postUserData);

router.route("/api/incUserVoteCount/:id/:candidate").patch(addUserVotedItem);

router
  .route("/api/decUserVoteCount/:id/:candidate")
  .patch(decreaseCandidateVoteCount);

module.exports = router;
