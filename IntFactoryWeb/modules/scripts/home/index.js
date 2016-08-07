define(function (require, exports, module) {
    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
        ObjectJS.getWidthSize();
    };

    ObjectJS.bindEvent = function () {
        $(window).resize(function () {
            ObjectJS.getWidthSize();
        });

        //
        $(".dg-wrapper .outbound").click(function () {
            var _this = $(this);
            ObjectJS.bindItemHover($(".customer-details li").eq(_this.data("index")));
        });

        $(".customer-details li").hover(function () {
            var _self = $(this);
            $(".dg-wrapper [data-index=" + _self.data("index") + "] ").click();
            ObjectJS.bindItemHover(_self);
        });

        $(".repertory-details li").hover(function () {
            var _this = $(this), url = _this.data("url");
            if ($(".jxc-img img").attr("src") != url) {
                $(".jxc-img img").fadeOut(500, function () {
                    $(this).fadeIn().attr("src", url);
                })
            }
            ObjectJS.bindItemHover(this);
        });

        /*会员*/
        //$(".member-details li").hover(function () {
        //    var _this = $(this), url = _this.data("url");
        //    if ($(".member-img img").attr("src")!=url) {
        //        $(".member-img img").fadeOut(500,function () {
        //            $(this).fadeIn().attr("src", url);
        //        })
        //    }            
        //    ObjectJS.bindItemHover(this);
        //});

        $(".applicable-industry img").hover(function () {
            var _parent = $(this).parent();
            _parent.find("div:first").hide();
            _parent.find("div:last").parent().fadeIn();
        });

        $(".education-floating,.garment-floating").mouseleave(function () {
            $(".education,.garment").show();
            $(".education-floating,.garment-floating").fadeOut();
        });
    };

    ObjectJS.bindItemHover = function (obj) {
        if (!$(obj).hasClass("hover")) {
            $(obj).addClass("hover").siblings().removeClass("hover");
        }
    };

    ObjectJS.getWidthSize = function () {
        var width = $(window).width();
        $(".customer-bevel").css("border-left", "" + width + "px solid #4a91e3");
        $(".repertory-bevel-down").css("border-right", "" + width + "px solid #F0EFEE");
    };

    module.exports = ObjectJS;
});