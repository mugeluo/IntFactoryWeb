define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot");

    var ObjectJS = {};

    ObjectJS.init = function (name, navName) {
        ObjectJS.bindEvent(name);
        ObjectJS.placeholderSupport();
        $(".action-box .action").removeClass("select");
        if (navName!="") {
            $(".action-box #" + navName).addClass("select");
        }
        
    };

    ObjectJS.bindEvent = function (name) {
        var _self = this;
        $(".menu ." + name).find("a").addClass("select");
        if (name == "Index") {
            $(".nav-list").hide();
        } else if (name == "Function") {
            $(".controller").hide();
            $(".functions").show();
        } else {
            $(".controller").hide();
            $(".setting").show();
        }

        $(document).click(function (e) {
            if (!$(e.target).parents().hasClass("currentuser") && !$(e.target).hasClass("currentuser")) {
                $(".dropdown-userinfo").fadeOut("1000");
            }            
        });

        //一级菜单图标事件处理
        $("#modulesMenu a").mouseenter(function () {
            var _this = $(this).find("img");
            _this.attr("src", _this.data("hover"));
        });

        $("#modulesMenu a").mouseleave(function () {
            if (!$(this).hasClass("select")) {
                var _this = $(this).find("img");
                _this.attr("src", _this.data("ico"));
            }
        });

        $("#modulesMenu .select img").attr("src", $("#modulesMenu .select img").data("hover"));
                
        $(".controller-box").click(function () {
            var _this = $(this).parent();
            if (!_this.hasClass("select")) {
                _self.setRotateR(_this.find(".open"), 0, 90);
                _this.addClass("select");
                _this.find(".action-box").slideDown(200);
            } else {
                _self.setRotateL(_this.find(".open"), 90, 0);
                _this.removeClass("select");
                _this.find(".action-box").slideUp(200);
            }
        });

        $("#currentUser").click(function () {            
            $(".dropdown-userinfo").fadeIn("1000");
        });
    };

    //旋转按钮（顺时针）
    ObjectJS.setRotateR = function (obj, i, v) {
        var _self = this;
        if (i < v) {
            i += 3;
            setTimeout(function () {
                obj.css("transform", "rotate(" + i + "deg)");
                _self.setRotateR(obj, i, v);
            }, 5)
        }
    };

    //旋转按钮(逆时针)
    ObjectJS.setRotateL = function (obj, i, v) {
        var _self = this;
        if (i > v) {
            i -= 3;
            setTimeout(function () {
                obj.css("transform", "rotate(" + i + "deg)");
                _self.setRotateL(obj, i, v);
            }, 5)
        }
    };

    // 判断浏览器是否支持 placeholder
    ObjectJS.placeholderSupport = function () {
        if (!('placeholder' in document.createElement('input'))) {
            $('[placeholder]').focus(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function () {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur();
        };
    }

    module.exports = ObjectJS;
})