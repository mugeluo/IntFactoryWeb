define(function (require, exports, module) {

    var ObjectJS = {};

    ObjectJS.init = function () {
        ObjectJS.bindEvent();      
    };

    ObjectJS.bindEvent = function () {    
        $(".function li").mouseenter(function () {
            var _this = $(this);
            _this.find(".detail").show();
        });
        
        $(".function li .detail").mouseleave(function () {
            $(this).hide();
        });

        
    };

    ObjectJS.bindItemHover = function (obj, document) {        
        var url = $(obj).data("url");
        if (document.attr("src") != url) {
            document.fadeOut(500, function () {
                $(this).fadeIn().attr("src", url);
            })
        }
        if (!$(obj).hasClass("hover")) {
            $(obj).addClass("hover").siblings().removeClass("hover");
        }
    };    

    module.exports = ObjectJS;
});