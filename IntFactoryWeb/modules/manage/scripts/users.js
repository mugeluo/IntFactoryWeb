define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot");

    var ObjectJS = {};
    ObjectJS.init = function (navName) {
        ObjectJS.bindEvent(navName);
        ObjectJS.getUsers();
    };

    ObjectJS.bindEvent = function (navName) {
        $(".controller .action-box .action").removeClass("select");
        $(".controller .action-box ." + navName).addClass("select");
    };

    ObjectJS.getUsers = function () {

    }

    module.exports = ObjectJS;
})