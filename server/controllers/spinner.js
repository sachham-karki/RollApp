const spinnerModel = require("../models/spinnerData");

const getSpinnerData = async (req, res) => {
  try {
    const spinnerData = await spinnerModel.find({});
    res.json(spinnerData);
  } catch (error) {
    console.log(error);
  }
};

const body = [
  { x: "labour", y: 18, text: "18%" },
  { x: "legal", y: 8, text: "8%" },
  { x: "Production", y: 15, text: "15%" },
  { x: "License", y: 11, text: "11%" },
];

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
    // res.json({ sucess: true, data: spinnerData });
    // console.log(spinnerData);
  } catch (error) {
    console.log(error);
  }
};

const changeSpinnerData = async (req, res) => {
  try {
    const { id } = req.params;
    const spinnerData = await spinnerModel.findOneAndUpdate(
      { "spinner.x": id },
      // { $set: { "spinner.$.y": req.body.y, "spinner.$.text": req.body.text } },
      { $inc: { "spinner.$.y": 1 } }
    );
    const getUpdateSpinnerData = await spinnerModel.find({});
    console.log(getUpdateSpinnerData[0].spinner);
    res.json(getUpdateSpinnerData);
    // res.json(spinnerData);
  } catch (error) {
    console.log(error);
  }
};

const deleteSpinnerData = async (req, res) => {
  try {
    //Deleting the collections.
    await spinnerModel.deleteOne();
    res.send("Deleted");
  } catch (error) {
    console.log(error);
  }
};

// {
//   _id: new ObjectId("61da0ab855483312e8f4483b"),
//   products: [
//     {
//       createdAt: 2022-01-08T22:05:44.635Z,
//       _id: new ObjectId("61da0ab8554833const spinnerData = await spinnerModel.findOneAndUpdate(
//   { _id: req.params.id, "spinner.x": req.body.x },
//   { $set: { "spinner.$.y": req.body.y, "spinner.$.text": req.body.text } },
//   {
//     new: true,
//     runValidators: true,
//   }
// );
// 12e8f4483c"),
//       productCode: 'otf',
//       productName: 'facebookmeta',
//       claims: [Array],
//       permissions: []
//     },
//     {
//       createdAt: 2022-01-08T22:05:44.635Z,
//       _id: new ObjectId("61da0ab855483312e8f4483f"),
//       productCode: '4pf',
//       productName: 'twitteroauth',
//       claims: [Array],
//       permissions: [Array]
//     }
//   ],
//   __v: 0
// }

// const spinnerData = await spinnerModel.findOneAndUpdate(
//   { _id: req.params.id, "spinner.x": req.body.x },
//   { $set: { "spinner.$.y": req.body.y, "spinner.$.text": req.body.text } },
//   {
//     new: true,
//     runValidators: true,
//   }
// );

module.exports = {
  getSpinnerData,
  postSpinnerData,
  changeSpinnerData,
  deleteSpinnerData,
};
