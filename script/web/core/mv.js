const core_mv = require('mv');

module.exports = mv

function mv(path1, path2, callback = (e)=>{}) {
  core_mv(path1, path2, {mkdirp: true}, callback);
}