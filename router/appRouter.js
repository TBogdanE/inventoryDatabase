const { Router } = require("express");
const appController = require("../controllers/appController");
const router = Router();

router.get("/", appController.displayIndex);
router.get("/addNewData", appController.getDataForUINewDevice);
router.post("/addNewData", appController.addNewDataToDB);
router.get("/allDevices", appController.displayAllDevices);

module.exports = router;
