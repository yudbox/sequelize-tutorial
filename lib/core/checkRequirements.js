const { checkDbConnection } = require("../../db");
// const { checkConnection } = require("../operational/dashboard");

module.exports = async () => {
  let resultsArray = [];

  try {
    resultsArray = await Promise.all([
      checkDbConnection(),
      //   checkConnection(),
    ]);
  } catch (ex) {
    console.error(__filename, "Error:", ex);
    return false;
  }

  const [
    dbConnectionResult,

    // dashboardConnectionResult,
  ] = resultsArray;

  if (!dbConnectionResult) {
    console.error(
      __line,
      __filename,
      `Error: DB connection hasn't been established`
    );
    return false;
  }

  //   if (!dashboardConnectionResult) {
  //     console.error(
  //       __line,
  //       __filename,
  //       `Error: Dashboard service is not reachable`
  //     );
  //     return false;
  //   }

  return true;
};
