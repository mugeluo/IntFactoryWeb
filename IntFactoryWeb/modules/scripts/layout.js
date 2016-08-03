/*
*布局页JS
*/
define(function (require, exports, module) {
    var $ = require("jquery"),
        doT = require("dot"),
        Global = require("global")      

    var LayoutObject = {};
    //初始化数据
    LayoutObject.init = function () {  
        LayoutObject.bindEvent();
        LayoutObject.placeholderSupport();        
    }
    //绑定事件
    LayoutObject.bindEvent = function () {
        var _self = this;
        
        var arr = window.location.href.split("/");
        var name = arr[arr.length - 1];        
        if(name !="Index") {
            $("." + name).addClass("hover").find("a").css("Opacity", "1").siblings().removeClass("hover");
        }  

        //窗体滚动 置顶头部
        $(window).scroll(function () {
            if ($(window).scrollTop()>50){ 
                $(".getback-FH").fadeIn(500);
                $(".header-menu").css("background", "rgba(55,55,55,0.4)");
            }  
            else {                  
                $(".getback-FH").fadeOut(1000);
                $(".header-menu").css("background", "0");
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

        $("#wx-photo").hover(         
            function () {
                $(".wx-public").show();
            },
            function () {
                $(".wx-public").hide();
            }
        );
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