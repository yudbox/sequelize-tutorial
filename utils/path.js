const path = require("path");

// найдет корневую директорию для любой OS
module.exports = path.dirname(require.main.filename);
