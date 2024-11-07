const db = require("../db/queries");

exports.displayIndex = (req, res) => {
  res.render("index", { action: undefined });
};

exports.getDataForUINewDevice = async (req, res) => {
  const data = await db.getDataForLists();

  const recievedData = data || {};

  res.render("index", {
    action: "popup-menu",
    dataType: "brand-list",
    data: recievedData,
  });
};

exports.addNewDataToDB = async (req, res) => {
  try {
    const { name, brand, deviceType, ramSize, storageSize, screenSize } =
      req.body;

    // Get the IDs for the selected options
    const { brandId, deviceTypeId, ramSizeId, storageSizeId, screenSizeId } =
      await db.getIdsForDevice(
        brand,
        deviceType,
        ramSize,
        storageSize,
        screenSize
      );

    // Call the addDevice function with the retrieved IDs
    await db.addDevice(
      name,
      brandId,
      deviceTypeId,
      ramSizeId,
      storageSizeId,
      screenSizeId
    );

    res.redirect("/");
  } catch (error) {
    console.error("Error adding new device to DB:", error);
    res.status(500).send("An error occurred while adding the device.");
  }
};
