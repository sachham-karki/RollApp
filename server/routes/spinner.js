const express = require("express");

const router = express.Router();

const {
  getSpinnerData,
  postSpinnerData,
  changeSpinnerData,
  deleteSpinnerData,
  postCandiateForm,
} = require("../controllers/spinner");

router
  .route("/spinner")
  .get(getSpinnerData)
  .post(postSpinnerData)
  .delete(deleteSpinnerData);

router.route("/api/spinner/:id").patch(changeSpinnerData);

//sk...
router.route("/api/candiateForm/:id").post(postCandiateForm);

module.exports = router;
