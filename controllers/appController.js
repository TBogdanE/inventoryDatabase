const db = require("../db/queries");

exports.displayIndex = (req, res) => {
  res.render("index", { action: undefined });
};

exports.addNewData = async (req, res) => {
  const data = await db.getDataForLists();

  const brandsData = data || {};
  res.render("index", {
    action: "popup-menu",
    dataType: "brand-list",
    data: brandsData,
  });
};
