define(function (require, exports, module) {
    var ObjectJS = {};

    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {
        $(".category ul li").click(function () {
            var _this = $(this), id = _this.data("id");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
            };           
        });
    };
    module.exports = ObjectJS;
});