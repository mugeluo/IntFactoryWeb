define(function (require, exports, module) {
    require("jquery");
    var Global = require("global")

    var Home = {};
    //登陆初始化
    Home.initLogin = function (returnUrl, bindAccountType) {
        Home.returnUrl = returnUrl;
        Home.bindAccountType = bindAccountType;
        Home.bindLoginEvent();
    }

    //绑定事件
    Home.bindLoginEvent = function () {
        $(document).on("keypress", function (e) {
            if (e.keyCode == 13) {
                $("#btnLogin").click();
            }
        });

        //登录
        $("#btnLogin").click(function () {
            if (!$("#iptUserName").val()) {
                $(".registerErr").html("请输入账号").slideDown();
                return;
            }
            if (!$("#iptPwd").val()) {
                $(".registerErr").html("请输入密码").slideDown();
                return;
            }
           
            $(this).html("登录中...").attr("disabled", "disabled");

            Global.post("/Home/UserLogin", {
                userName: $("#iptUserName").val(),
                pwd: $("#iptPwd").val()                
            },
            function (data) {
                $("#btnLogin").html("登录").removeAttr("disabled");
                if (data.result) {
                    location.href = "/Home/Index";
                } else{
                    $(".registerErr").html("账号或密码有误").slideDown();
                };
            });
        });

        $(".txtBoxPassword").click(function () {
            $(this).hide();
            $("#iptPwd").focus();
        });

        $("#iptPwd").blur(function () {
            if ($(this).val() == '')
                $(".txtBoxPassword").show();
        }).focus(function () {
            if ($(this).val() == '')
                $(".txtBoxPassword").hide();
        });

    }

    Home.placeholderSupport = function () {
        if (!('placeholder' in document.createElement('input'))) {   // 判断浏览器是否支持 placeholder
            $('[placeholder]').focus(function () {
                var input = $(this);
                input.css("color", "#333");
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }

            }).blur(function () {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder')).css("color", "#999");
                }
            }).blur();

        };
    }

    module.exports = Home;
});