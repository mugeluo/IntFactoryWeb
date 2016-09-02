define(function (require, exports, module) {
    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {
        $(document).click(function (e) {            
            //隐藏下拉
            if (!$(e.target).parents().hasClass("menu-icon") && !$(e.target).hasClass("menu-icon")) {
                $(".menu-ul").slideUp();
            }
        });

        $(".menu-icon").click(function () {
            $(".menu-ul").slideToggle();
        });
    };    

    module.exports = ObjectJS;
});