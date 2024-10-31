const { getAdapter } = require("axios");
const pool = require("./pool");

async function getDataForLists() {
  const brands = await pool.query("SELECT * FROM brands");
  const deviceType = await pool.query("SELECT * FROM device_type");
  const ramSize = await pool.query("SELECT * FROM ram_size");
  const storageSize = await pool.query("SELECT * FROM storage_sizes");
  const screenSize = await pool.query("SELECT * FROM screen_size");

  console.log("ttt", storageSize.rows);

  return {
    brands: brands.rows,
    deviceType: deviceType.rows,
    ramSize: ramSize.rows,
    storageSize: storageSize.rows,
    screenSize: screenSize.rows,
  };
}

async function getAllDevices() {
  console.log("Get all devices");
}

async function getTablets() {
  console.log("Get tablets");
}

async function getLaptops() {
  console.log("Get laptops");
}

async function addDevice() {
  console.log("Add new devices");
}

async function updateDevices() {
  console.log("Update devices");
}

async function deleteDevice() {
  console.log("Delete devices");
}

module.exports = {
  getDataForLists,
  getAllDevices,
  getTablets,
  getLaptops,
  addDevice,
  updateDevices,
  deleteDevice,
};
