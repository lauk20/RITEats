const fs = require('fs');
var obj;
fs.readFile('data/data.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});

module.exports = {
    name: "messageCreate",
    execute({content}) {
        if (content.startsWith("!rit")) {
            console.log(obj);
        }
    }
}