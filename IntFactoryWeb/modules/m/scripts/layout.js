define(function (require, exports, module) {

    var ObjectJS = {};
    ObjectJS.num = 1;
    ObjectJS.status = true;

    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {

        $(document).click(function (e) {
            //隐藏下拉
            if (!$(e.target).parents().hasClass("menu-icon") && !$(e.target).hasClass("menu-icon")) {
                $(".menu").slideUp();
            }
        });

        $(".menu-icon").click(function () {
            $(".menu").slideToggle();
        });
    };    

    module.exports = ObjectJS;
});