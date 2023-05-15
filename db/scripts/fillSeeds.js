const runCliCommand = require("./runCliCommand");

runCliCommand("db:seed:all").catch((ex) =>
  console.error(__line, __filename, ex)
);
