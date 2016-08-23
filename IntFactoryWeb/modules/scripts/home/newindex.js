define(function (require, exports, module) {
    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();      
    };

    ObjectJS.bindEvent = function () {    
        setTimeout(function () {
            $(".img-load").each(function () {
                $(this).attr("src",$(this).data("src"));
            })
        }, 1000);
    };

    module.exports = ObjectJS;
});