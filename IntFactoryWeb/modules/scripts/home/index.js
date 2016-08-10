define(function (require, exports, module) {

    var ObjectJS = {};

    ObjectJS.init = function () {
        ObjectJS.bindEvent();      
    };

    ObjectJS.bindEvent = function () {    

        $(".visualization .content-ul li").hover(function () {            
            ObjectJS.bindItemHover(this, $(".visualization .img-content img"));
        });

        $(".team .content-ul li").hover(function () {                    
            ObjectJS.bindItemHover(this, $(".team .img-content img"));
        });

        $(".share .content-ul li").hover(function () {           
            ObjectJS.bindItemHover(this, $(".share .img-content img"));
        });

        $(".case-company li .bg").hover(
            function () {
                var _this = $(this);
                _this.find(".company").hide();
                _this.find(".case-desc").show();
            },
            function () {
                var _this = $(this);
                _this.find(".company").show();
                _this.find(".case-desc").hide();
            }
        );
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