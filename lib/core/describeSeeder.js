const path = require("path");
const fs = require("fs");

/**
 * Prepares the structure to use in seeder function
 *
 * @param {string} seederPath Full path to the seeder function
 * @returns {{up, down}} Strong structure to describe Sequelize seeder function
 */
module.exports = (seederPath) => {
  const emptySeeder = {
    up: () => Promise.resolve(),
    down: () => Promise.resolve(),
  };

  if (!fs.existsSync(seederPath)) {
    console.error(__line, __filename, `File "${seederPath}" doesn't exist`);
    return emptySeeder;
  }

  const seederName = path.basename(seederPath, ".js");

  const seedPath = path.resolve(
    __dirname,
    "..",
    "..",
    "db",
    "seeds",
    `${seederName}.json`
  );

  // console.log("11111111111111111111 seedPath", seedPath);

  if (!fs.existsSync(seedPath)) {
    console.error(__line, __filename, `File "${seedPath}" doesn't exist`);
    return emptySeeder;
  }

  const tableName = seederName.split("_")[1];
  let data = [];

  try {
    data = require(seedPath);
  } catch (ex) {
    console.error(__line, __filename, ex);
  }

  if (!Array.isArray(data)) {
    console.error(
      __line,
      __filename,
      `"${seedPath}" seeder must contain an array`
    );
    return emptySeeder;
  } else if (!data.length) {
    return emptySeeder;
  }

  return {
    up: (queryInterface) => queryInterface.bulkInsert(tableName, data, {}),
    down: (queryInterface) => queryInterface.bulkDelete(tableName, null),
  };
};
