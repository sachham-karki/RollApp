const pageNotFound = async (req, res) => {
  res.status(404).send("Page not found");
};

module.exports = pageNotFound;
