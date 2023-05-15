process.env.ROOT = require("path").resolve(__dirname, "..", "..");
require("dotenv").config();

const hidePartOfString = require("../common/hidePartOfString");
const configs = require("../../config/configs");

if (configs.showConfigs || true) {
  const configsClone = JSON.parse(JSON.stringify(configs));

  // Hide insecure data from configs
  configsClone.db.password = hidePartOfString(configsClone.db.password, 0);

  // Display initialized server configs
  console.info("-- SERVER CONFIGS --------------------------------");
  console.info(JSON.stringify(configsClone, null, 2));
  console.info("--------------------------------------------------");
}

// Add special global keyword for some flexible debug
Object.defineProperty(global, "__stack", {
  get: function () {
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const err = new Error();
    Error.captureStackTrace(err, arguments.callee);
    const stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  },
});

Object.defineProperty(global, "__line", {
  get: () => __stack[1].getLineNumber(),
});

Object.defineProperty(global, "__function", {
  get: () => __stack[1].getFunctionName(),
});
