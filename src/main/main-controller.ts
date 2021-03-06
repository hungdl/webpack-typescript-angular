/// <reference path="../lib.d.ts" />

require("./main-controller.styl");
import dir = require('./main-directive');


export function register(_module) {
    dir.register(_module);
    _module.controller('MainController', function () {
        console.log("Main controller loaded");
    });
}
