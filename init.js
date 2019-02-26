const path = require("path");
const admzip = require("adm-zip");
const fs = require("fs");
const unzip = require("unzip");
const request = require("request");
const cmd = require("node-cmd");

function init() {
    console.log('Init')
    const file = fs.createWriteStream("master.zip");
    request('http://github.com/LovelandHighRobotics1977/robotics-web/archive/master.zip').pipe(fs.createWriteStream('master.zip').on("finish", () => {
        extract();
    }))
    function extract() {
        console.log("Extract")
        
        fs.createReadStream('master.zip').pipe(unzip.Extract({
            path: 'site'
        }).on('close', function () {
            console.log("Move")
            cmd.get("rm -rf ./foo.bar && mv -v ./site/robotics-web-master/* ./site/ && rm -rf ./site/robotics-web-master",
                function (err, data, stderr) {
                    build()
                }
            );
        }))
    }

    function build() {
        console.log('Beginning Build...')
        cmd.get("cd site && npm install && npm run build", () => {
            console.log("Build Done")
        })
    }
}

module.exports = {
    init
}