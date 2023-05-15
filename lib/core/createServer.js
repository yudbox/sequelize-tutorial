const http = require("http");
const processHandlers = require("./processHandlers");
const checkRequirements = require("./checkRequirements");
const {
  service: { local },
} = require("../../config/configs");

const pid = process.pid;

module.exports = (app) => {
  const server = http.createServer(app);

  // Initializing signals' handlers for run server
  processHandlers.applyTo(server);

  // Adding special method for deferred running server instance
  server.run = async () => {
    const isEverythingOK = await checkRequirements();
    if (!isEverythingOK) {
      console.error(
        __line,
        __filename,
        "Error: Not all requirements are satisfied to start the server"
      );
    }

    server.listen(local.port, local.host);
  };

  // Adding signals' handlers for run server instance
  server
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        const timeout = 5000; // ms
        console.log(
          __line,
          __filename,
          `Address in use, retrying after ${timeout / 1000} seconds...`
        );

        setTimeout(() => {
          server.close();
          server.run();
        }, timeout);
      } else {
        console.error(__filename, "Error:", err);
        process.exit(1);
      }
    })
    .on("listening", () => {
      console.log(
        `Server has started (${pid}): http://${local.host}:${local.port}`
      );
    });

  return server;
};
