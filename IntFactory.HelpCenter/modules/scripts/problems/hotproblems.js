define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        Easydialog = require("easydialog");
    require("pager");

    var ObjectJS = {};

    var pageCount = 0;

    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {
        $(".number .item-all").after("<div class='data-loading'><div>");
        Global.post("/Problems/GetClickNumberList", {}, function (data) {
            $(".data-loading").remove();
            if (data.items.length > 0) {
                for (var i = 0; i < data.items.length; i++) {
                    $(".number .item-all").after("<li class='item'><a href='/Problems/ProblemsDetail/" + data.items[i].ContentID + "'>· " + data.items[i].Title + "</a></li>");
                }

            }
        })
    };

    module.exports = ObjectJS;
});