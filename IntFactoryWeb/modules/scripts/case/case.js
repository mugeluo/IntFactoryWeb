define(function (require, exports, module) {
    var $ = require("jquery");
    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();        
        var url = window.location.href.split("?")[1];
        $("." + url).click();
    };

    ObjectJS.bindEvent = function () {  
        $(".industry li").click(function () {
            var _this = $(this);
            if (!_this.hasClass("hover")) {
                _this.addClass("hover").siblings().removeClass("hover");
            }
            var id = _this.data("industry");
            $("#" + id).show().siblings().hide();           
        });   
    };

    module.exports = ObjectJS;
})