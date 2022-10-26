const express = require("express");

const router = express.Router();

const {
  getSpinnerData,
  postSpinnerData,
  changeSpinnerData,
  addNewSpinnerData,
  deleteSpinnerData,
  postCandiateForm,
} = require("../controllers/spinner");

router.route("/spinner").get(getSpinnerData).post(postSpinnerData);

router.route("/api/spinner/:id").patch(changeSpinnerData);
router.route("/api/spinnerDelete/:id").delete(deleteSpinnerData);

router.route("/api/addSpinner/:id").post(addNewSpinnerData);

//sk...
router.route("/candiateForm");

//sk...
router.route("/api/candiateForm/:id").post(postCandiateForm);

module.exports = router;
