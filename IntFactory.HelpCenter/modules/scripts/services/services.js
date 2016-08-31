define(function (require, exports, module) {
    var Global = require("global");
    var ObjectJS = {};
    ObjectJS.controller = false;

    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {
        $(".secure-desc li").click(function () {
            var _this = $(this),id=_this.data("id");
            if (!_this.hasClass("hover")) {
                _this.addClass("hover").siblings().removeClass("hover");
            }
            $(".secure-desc-txt").hide();
            $("."+id).show();
        });
    };

    module.exports = ObjectJS;
})