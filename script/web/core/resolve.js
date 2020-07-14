const path = require("path");
const appDirectory = path.resolve(__dirname, '../../../');

module.exports = resolve

function resolve(filepath) {
  return path.resolve(appDirectory, filepath);
}