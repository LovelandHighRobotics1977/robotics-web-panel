const path = require("path");
const unzip = require("unzip");
const fs = require("fs-extra");
const http = require("http");
const cmd = require("node-cmd");

function init() {
    http.get("http://github.com/LovelandHighRobotics1977/robotics-web/archive/master.zip", function (response) {
        response.pipe(unzip.Extract({
            path: path.join(path.dirname(fs.realpathSync(__filename)), 'site')
        }).on('close', () => {
            build()
        }))
    });

    function build() {
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