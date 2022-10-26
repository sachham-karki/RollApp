const spinnerModel = require("../models/spinnerData");

const getSpinnerData = async (req, res) => {
  try {
    const spinnerData = await spinnerModel.find({});
    res.json(spinnerData);
  } catch (error) {
    console.log(error);
  }
};

const postSpinnerData = async (req, res) => {
  try {
    console.log(req.body);
    await spinnerModel.deleteOne();

    const getData = req.body.Items.map((getX) => {
      return { x: getX };
    });
    console.log(getData);
    const spinnerData = await spinnerModel.create({
      spinner: getData,
    });
    res.redirect("http://localhost:3000/pie");
  } catch (error) {
    console.log(error);
  }
};

const changeSpinnerData = async (req, res) => {
  try {
    const { id } = req.params;
    await spinnerModel.findOneAndUpdate(
      { "spinner.x": id },
      { $inc: { "spinner.$.y": 1 } }
    );
    const getUpdateSpinnerData = await spinnerModel.find({});
    res.json(getUpdateSpinnerData);
  } catch (error) {
    console.log(error);
  }
};

const addNewSpinnerData = async (req, res) => {
  try {
    const { Items } = req.body;

    let getData = [];
    //Checking if it is array.

    if (Array.isArray(Items)) {
      //If array.
      getData = Items.map((getX) => {
        return { x: getX };
      });
    } else {
      //If not array.
      getData = { x: Items };
    }
    await spinnerModel.updateMany(
      {
        _id: req.params.id,
      },
      {
        $push: {
          spinner: getData,
        },
      }
    );
    res.redirect("http://localhost:3000/pie");
  } catch (error) {
    console.log(error);
  }
};

const deleteSpinnerData = async (req, res) => {
  try {
    //Deleting the collections.
    const data = await spinnerModel.updateOne(
      {},
      {
        $pull: {
          spinner: {
            _id: req.params.id,
          },
        },
      }
    );
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSpinnerData,
  postSpinnerData,
  changeSpinnerData,
  addNewSpinnerData,
  deleteSpinnerData,
};
