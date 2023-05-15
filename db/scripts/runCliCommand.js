require("../../lib/core/additionalInit");

const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const ROOT = process.env.ROOT;

module.exports = async (command) => {
  if (typeof command !== "string" || !command.length) {
    logger.error(
      __line,
      __filename,
      `"command" parameter has wrong value: ${command}`
    );
    return;
  }

  const pathToSequelizeCli = `${path.join(
    ROOT,
    "node_modules",
    ".bin"
  )}/sequelize-cli`;
  let stdout = "";
  let stderr = "";

  try {
    const stdResult = await exec(`${pathToSequelizeCli} ${command}`, {
      maxBuffer: 1024 * 1024 * 10,
    });

    stdout = stdResult.stdout;
    stderr = stdResult.stderr;
  } catch (ex) {
    console.error(__line, __filename, ex);
    return;
  }

  if (stdout) {
    console.info(stdout);
  }
  if (stderr) {
    console.error(__line, __filename, stderr);
  }

  console.info("Done!");
};
