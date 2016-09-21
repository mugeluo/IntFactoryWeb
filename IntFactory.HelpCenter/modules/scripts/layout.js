/*
*布局页JS
*/
define(function (require, exports, module) {
    var doT = require("dot"),
        Global = require("global")      

    var LayoutObject = {};
    //初始化数据
    LayoutObject.init = function (name) {  
        LayoutObject.bindEvent(name);
        LayoutObject.placeholderSupport();        
    }
    //绑定事件
    LayoutObject.bindEvent = function (name) {
        $(".site-header ." + name).addClass("hover");
        
        $(document).click(function (e) {
            if (!$(e.target).parents().hasClass("currentuser") && !$(e.target).hasClass("currentuser")) {
                $(".dropdown-userinfo").fadeOut("1000");
            }
        });

        //窗体滚动 置顶头部
        $(window).scroll(function () {
            if ($(document).scrollTop()>80){ 
                $(".getback-FH").fadeIn(500);
                $(".header-menu").css("background", "rgba(0,0,0,0.7)");
            }  
            else {                  
                $(".getback-FH").fadeOut(1000);
                $(".header-menu").css("background", "rgba(0,0,0,1)");
            }  
        });         
             
        //返回顶部
        $(".getback-FH").click(function () {            
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        })

        //头部双击 返回顶部
        $("header").dblclick(function () {
            $('body,html').animate({ scrollTop: 0 }, 300);
            return false;
        });  
        
        //搜索
        $(".head-search .iconfont").click(function () {
            window.location = "/Home/Search?" + $(".search-txt").val();
        });

        $(".head-search").keydown(function (e) {
            if (e.keyCode == 13) {
                $(".head-search .iconfont").click();
                $(this).blur();
            }
        });

        $("#currentUser").click(function () {
            $(".dropdown-userinfo").fadeIn("1000");
        });

    }

    // 判断浏览器是否支持 placeholder
    LayoutObject.placeholderSupport = function () {
        if (! ('placeholder' in document.createElement('input')) ) {   
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

    module.exports = LayoutObject;
})