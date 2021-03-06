'use strict';
const express = require("express");
const router = express.Router();
const fs = require('fs');
const fsext = require('fs-extra');
const path = require('path');

router.post("/", function (req, res) {
    // only allow for user
    if (req.user.check() !== 'GRANTALL') return;

    let {read_path, filetype, filename} = req.body;

    let CREATE_PATH = req.DIR.WORKSPACE_PATH;
    if (read_path) {
        read_path = JSON.parse(read_path);
        for (let i = 0; i < read_path.length; i++)
            CREATE_PATH = path.resolve(CREATE_PATH, read_path[i]);
    }

    if (CREATE_PATH.indexOf(req.DIR.WORKSPACE_PATH) == -1)
        return res.send({status: false});

    let allowed = ['js', 'html', 'jade', 'less', 'css', 'py'];

    if (filetype == 'folder') {
        fsext.mkdirsSync(path.resolve(CREATE_PATH, filename));
    } else {
        for (let i = 0; i < allowed.length; i++) {
            if (filetype == allowed[i]) {
                if (path.extname(filename) != `.${allowed[i]}`)
                    filename = filename + `.${allowed[i]}`;
                fs.writeFileSync(path.resolve(CREATE_PATH, filename), '');
                break;
            }
        }
    }

    res.send({status: true});
});

module.exports = router;