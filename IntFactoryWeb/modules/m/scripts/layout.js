define(function (require, exports, module) {

    var ObjectJS = {};

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

        //头部双击 返回顶部
        //$("header").dblclick(function () {            
        //    $('body,html').animate({ scrollTop: 0 }, 300);
        //    return false;
        //});

        $(".menu-icon").click(function () {
            $(".menu").slideToggle();
        });
    };    

    module.exports = ObjectJS;
});