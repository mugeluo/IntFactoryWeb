define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        Easydialog = require("easydialog");
    require("pager");

    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {
        $(".content-title li").click(function () {
            var _this = $(this);
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
            };
        });

        $(".item li").click(function () {
            var _this = $(this);
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
            };
        });

        $(".menu-title").click(function () {
            var _this = $(this);
            if (!_this.hasClass("tag")) {
                _this.next().show();
                _this.addClass("tag");
            } else {
                _this.removeClass("tag");
                _this.next().hide();
            }
            
        });

    };
       
    module.exports = ObjectJS;
});