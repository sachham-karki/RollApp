const express = require("express");

const router = express.Router();

const {
  getSpinnerData,
  postSpinnerData,
  changeSpinnerData,
  deleteSpinnerData,
} = require("../controllers/spinner");

router
  .route("/spinner")
  .get(getSpinnerData)
  .post(postSpinnerData)
  .delete(deleteSpinnerData);

router.route("/spinner/:id").patch(changeSpinnerData);

module.exports = router;
