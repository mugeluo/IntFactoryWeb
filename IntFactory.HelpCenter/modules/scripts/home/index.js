define(function (require, exports, module) {

    var ObjectJS = {};

    ObjectJS.init = function () {
        ObjectJS.bindEvent();      
    };

    ObjectJS.bindEvent = function () {


        $(".table-switch li").click(function () {
            var _this = $(this);
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
            }
        });

        $(".function li").mouseenter(function () {
            var _this = $(this);
            _this.find(".detail").show();
        });
        
        $(".function li .detail").mouseleave(function () {
            $(this).hide();
        });        
    };
    module.exports = ObjectJS;
});