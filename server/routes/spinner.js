const express = require("express");

const router = express.Router();

const {
  getSpinnerData,
  postSpinnerData,
  changeSpinnerData,
} = require("../controllers/spinner");

router.route("/spinner").get(getSpinnerData).post(postSpinnerData);

router.route("/spinner/:id").patch(changeSpinnerData);

module.exports = router;
