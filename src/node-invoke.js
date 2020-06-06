var spawn = require("child-process-promise").spawn;
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");

module.exports = async function ({cwd, env, requires, code}){
  //create dir;
  await mkdirp(cwd)
  
  fs.writeFileSync(path.join(cwd, "code.js"), code);
  
  if(requires && requires.length > 0){
    await spawn("npm",  ["install"].concat(requires), {cwd})
  }
  
  return await spawn("node", [path.join(cwd, "code.js")], {cwd, env})
}
