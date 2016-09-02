define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot");

    var ObjectJS = {};

    ObjectJS.init = function (name, navName) {
        ObjectJS.bindEvent(name);
        $(".action-box .action").removeClass("select");
        $(".action-box #" + navName).addClass("select")
    };

    ObjectJS.bindEvent = function (name) {
        var _self = this;
        $(".menu ." + name).addClass("hover").find("a").css("color", "#fff");
        if (name == "Index") {
            $(".nav-list").hide();
        } else if (name == "Function") {
            $(".controller").hide();
            $(".functions").show();
        } else {
            $(".controller").hide();
            $(".setting").show();
        }

        $(".controller-box").click(function () {
            var _this = $(this).parent();
            if (!_this.hasClass("select")) {
                _self.setRotateR(_this.find(".open"), 0, 90);
                _this.addClass("select");
                _this.find(".action-box").slideDown(200);
            } else {
                _self.setRotateL(_this.find(".open"), 90, 0);
                _this.removeClass("select");
                _this.find(".action-box").slideUp(200);
            }
        });      
    };

    //旋转按钮（顺时针）
    ObjectJS.setRotateR = function (obj, i, v) {
        var _self = this;
        if (i < v) {
            i += 3;
            setTimeout(function () {
                obj.css("transform", "rotate(" + i + "deg)");
                _self.setRotateR(obj, i, v);
            }, 5)
        }
    };

    //旋转按钮(逆时针)
    ObjectJS.setRotateL = function (obj, i, v) {
        var _self = this;
        if (i > v) {
            i -= 3;
            setTimeout(function () {
                obj.css("transform", "rotate(" + i + "deg)");
                _self.setRotateL(obj, i, v);
            }, 5)
        }
    };

    module.exports = ObjectJS;
})