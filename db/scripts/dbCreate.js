require("../../lib/core/additionalInit");

const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { dbHost, dbPort, dbUser, dbPassword, dbName } =
  require("../../config/configs").db;

console.log("44444444444444444444444444444444444444", typeof dbPassword);

const passwordString = dbPassword ? `-p${dbPassword}` : "";

exec(
  `psql -h${dbHost} --port=${dbPort} -u${dbUser} ${passwordString} -e 'CREATE DATABASE ${dbName}'`
)
  .then(() => console.log("Done!"))
  .catch((ex) => console.error(__line, __filename, "Error:", ex));
