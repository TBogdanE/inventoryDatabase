const { Router } = require("express");
const appController = require("../controllers/appController");
const router = Router();

router.get("/", appController.displayIndex);

module.exports = router;
