define(function (require, exports, module) {

    var ObjectJS = {};
    ObjectJS.num = 1;
    ObjectJS.status = true;

    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {

        $(".switch-right").click(function () {            
            ObjectJS.bindClick("right");
        });

        $(".switch-left").click(function () {           
            ObjectJS.bindClick("left");
        });

        $(".company li").click(function () {
            var _this = $(this), id = _this.data("id");
            if (!_this.hasClass("hover")) {               
                _this.addClass("hover");
                _this.find(".desc").slideDown();
            } else {
                _this.removeClass("hover");
                _this.find(".desc").slideUp();
            }
        });
    };

    ObjectJS.bindClick = function (obj) {
        if (obj == "right") {
            if (ObjectJS.num != 1) {
                $("#timeline").append($("#timeline li:first"));
                $("#timeline li:last").css({ left: "1120px" }, 600)
            }
            ObjectJS.num = 2;
            ObjectJS.status = false;
            $("#timeline li").each(function () {
                var _this = $(this);
                var le = _this.position().left;
                _this.animate({ left: le - 280 + "px" });
            });
        } else {
            if (ObjectJS.status) {
                $("#timeline").prepend($("#timeline li:last"));
                $("#timeline li:first").css({ left: "-280px" }, 600)
            }
            ObjectJS.status = true;
            ObjectJS.num = 1;
            $("#timeline li").each(function () {
                var _this = $(this);
                var le = _this.position().left;
                _this.animate({ left: le + 280 + "px" });
            });
        }        
    }

    module.exports = ObjectJS;
});