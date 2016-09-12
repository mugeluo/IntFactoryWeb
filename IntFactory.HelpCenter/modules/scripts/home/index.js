define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),    
        Easydialog = require("easydialog");
    require("pager");
    
    var ObjectJS = {};

    var Params = {        
        TypeID: "",
        Keywords: "",        
        PageIndex: 1,
        PageSize: 10,
        OrderBy: "c.CreateTime desc",
    }

    ObjectJS.init = function () {
        ObjectJS.bindEvent();      
    };

    ObjectJS.bindEvent = function () {

        $(".table-switch li").click(function () {
            var _this = $(this),id=_this.data("id");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
            };
            $(".problem-detail .problem-content").hide();
            $(".problem-detail .problem-content").eq(id).show();
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