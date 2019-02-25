const path = require("path");
const admzip = require("adm-zip");
const fs = require("fs");
const unzip = require("unzip");
const request = require("request");
const cmd = require("node-cmd");

function init() {
    console.log('Init')
    const file = fs.createWriteStream("master.zip");
    request('http://github.com/LovelandHighRobotics1977/robotics-web/archive/master.zip').pipe(fs.createWriteStream('master.zip'));
    function extract() {
        console.log("Extract")
        
        /*fs.createReadStream('master.zip').pipe(unzip.Extract({
            path: 'site'
        }));*/
    }

    function build() {
        console.log('Beginning Build...')
        cmd.run(`
            cd site
            npm install
            npm run build
        `)
    }
}

module.exports = {
    init
}