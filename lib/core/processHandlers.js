const pid = process.pid;

const applyTo = (server) => {
  process
    .on("SIGINT", () => {
      console.log(__filename, `Process ${pid} stopped manually`);

      try {
        server.close(() => {
          process.exit(0);
        });
      } catch (ex) {
        console.error(__filename, "Error", ex);
        process.exit(1);
      }
    })
    .on("SIGTERM", () => {
      console.log(__filename, `Process ${pid} stopped`);

      try {
        server.close(() => {
          process.exit(0);
        });
      } catch (ex) {
        console.error(__filename, "Error", ex);
        process.exit(1);
      }
    })
    .on("unhandledRejection", (reason) => {
      console.error(
        __line,
        __filename,
        `Error: Unhandled rejection: ${reason}. Pid: ${pid}`
      );
      process.exit(1);
    })
    .on("uncaughtException", (ex) => {
      console.error(
        __line,
        __filename,
        `Error: Unhandled exception: ${ex}. Pid: ${pid}`
      );
      process.exit(1);
    });
};

module.exports = {
  applyTo,
};
