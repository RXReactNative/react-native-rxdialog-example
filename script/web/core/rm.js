
const rimraf = require('rimraf');

module.exports = rm

function rm(path, callback = (e)=>{}) {
  rimraf(path, callback);
}