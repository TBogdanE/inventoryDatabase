const { getAdapter } = require("axios");
const pool = require("./pool");

async function getDataForLists() {
  const brands = await pool.query("SELECT * FROM brands");
  const deviceType = await pool.query("SELECT * FROM device_type");
  const ramSize = await pool.query("SELECT * FROM ram_size");
  const storageSize = await pool.query("SELECT * FROM storage_sizes");
  const screenSize = await pool.query("SELECT * FROM screen_size");

  return {
    brands: brands.rows,
    deviceType: deviceType.rows,
    ramSize: ramSize.rows,
    storageSize: storageSize.rows,
    screenSize: screenSize.rows,
  };
}

async function getIdsForDevice(
  brand,
  deviceType,
  ramSize,
  storageSize,
  screenSize
) {
  try {
    // Query to get the brand ID
    const brandQuery = await pool.query(
      "SELECT id FROM brands WHERE name = $1",
      [brand]
    );
    const brandId = brandQuery.rows[0]?.id;

    // Query to get the device type ID
    const deviceTypeQuery = await pool.query(
      "SELECT id FROM device_type WHERE type_name = $1",
      [deviceType]
    );
    const deviceTypeId = deviceTypeQuery.rows[0]?.id;

    // Query to get the RAM size ID
    const ramSizeQuery = await pool.query(
      "SELECT id FROM ram_size WHERE size = $1",
      [ramSize]
    );
    const ramSizeId = ramSizeQuery.rows[0]?.id;

    // Query to get the storage size ID
    const storageSizeQuery = await pool.query(
      "SELECT id FROM storage_sizes WHERE size = $1",
      [storageSize]
    );
    const storageSizeId = storageSizeQuery.rows[0]?.id;

    // Query to get the screen size ID
    const screenSizeQuery = await pool.query(
      "SELECT id FROM screen_size WHERE size = $1",
      [screenSize]
    );
    const screenSizeId = screenSizeQuery.rows[0]?.id;

    // Return all the IDs as an object
    return {
      brandId,
      deviceTypeId,
      ramSizeId,
      storageSizeId,
      screenSizeId,
    };
  } catch (error) {
    console.error("Error retrieving IDs for device:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
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

async function addDevice(
  name,
  brandId,
  deviceTypeId,
  ramSizeId,
  storageSizeId,
  screenSizeId
) {
  console.log("Adding new device to database");

  try {
    const query = `
      INSERT INTO devices (name, brand_id, type_id, ram_id, storage_id, screen_size_id, count, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, 0, NOW()) 
      RETURNING *;
    `;
    const values = [
      name,
      brandId,
      deviceTypeId,
      ramSizeId,
      storageSizeId,
      screenSizeId,
    ];

    const result = await pool.query(query, values);
    console.log("Device added:", result.rows[0]);
    return result.rows[0]; // Return the newly added device record
  } catch (error) {
    console.error("Error adding device:", error);
    throw error;
  }
}

async function updateDevices() {
  console.log("Update devices");
}

async function deleteDevice() {
  console.log("Delete devices");
}

module.exports = {
  getDataForLists,
  getIdsForDevice,
  getAllDevices,
  getTablets,
  getLaptops,
  addDevice,
  updateDevices,
  deleteDevice,
};
