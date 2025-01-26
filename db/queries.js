const { getAdapter } = require("axios");
const pool = require("./pool");

// we get the data, with which we build then the forms
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

// get the id of each data, so we can point to it when we create a new device
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

async function getDevicesAddedToday() {
  const data = await pool.query(`
  SELECT devices.name, brands.name AS brand_name
  FROM devices
  JOIN brands ON devices.brand_id = brands.id
  WHERE devices.created_at::date = CURRENT_DATE;
`);

  console.log("newdata", data.rows);
  return data.rows;
}

async function getAllDevices() {
  const data = await pool.query(
    "SELECT devices.id, devices.name, brands.name AS brand_name, device_types.type_name AS device_type_name, ram_sizes.size AS ram_size, storage_sizes.size AS storage_size,screen_sizes.size AS screen_size,devices.count, devices.created_at FROM devices LEFT JOIN brands ON devices.brand_id = brands.id LEFT JOIN device_types ON devices.type_id = device_types.id LEFT JOIN ram_sizes ON devices.ram_id = ram_sizes.id LEFT JOIN storage_sizes ON devices.storage_id = storage_sizes.id LEFT JOIN screen_sizes ON devices.screen_size_id = screen_sizes.id;"
  );
  console.log("alllllllllllllllll:", data);
  return data;
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
    // First, check if the device already exists
    const checkQuery = `
      SELECT * FROM devices
      WHERE name = $1
      AND brand_id = $2
      AND type_id = $3
      AND ram_id = $4
      AND storage_id = $5
      AND screen_size_id = $6;
    `;

    const checkValues = [
      name,
      brandId,
      deviceTypeId,
      ramSizeId,
      storageSizeId,
      screenSizeId,
    ];

    // Check if the device exists in the database
    const existingDevice = await pool.query(checkQuery, checkValues);

    // Print the existing device query result for debugging
    console.log("Existing device:", existingDevice.rows);

    if (existingDevice.rows.length > 0) {
      // If the device exists, update the count
      const updateQuery = `
        UPDATE devices
        SET count = count + 1
        WHERE name = $1
        AND brand_id = $2
        AND type_id = $3
        AND ram_id = $4
        AND storage_id = $5
        AND screen_size_id = $6
        RETURNING *;
      `;
      const updateValues = [
        name,
        brandId,
        deviceTypeId,
        ramSizeId,
        storageSizeId,
        screenSizeId,
      ];

      const updatedDevice = await pool.query(updateQuery, updateValues);

      // Print the updated device to ensure count is updated
      console.log("Device count after update:", updatedDevice.rows);

      return updatedDevice.rows[0]; // Return the updated device record
    } else {
      // If the device does not exist, insert it into the database
      const insertQuery = `
        INSERT INTO devices (name, brand_id, type_id, ram_id, storage_id, screen_size_id, count, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, 1, NOW())
        RETURNING *;
      `;
      const insertValues = [
        name,
        brandId,
        deviceTypeId,
        ramSizeId,
        storageSizeId,
        screenSizeId,
      ];

      const result = await pool.query(insertQuery, insertValues);
      console.log("Device added:", result.rows[0]);
      return result.rows[0]; // Return the newly added device record
    }
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
  getDevicesAddedToday,
  getAllDevices,
  getTablets,
  getLaptops,
  addDevice,
  updateDevices,
  deleteDevice,
};
