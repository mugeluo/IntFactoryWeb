define(function (require, exports, module) {
    require("jquery");
    var Global = require("global")

    var Home = {};
    //登陆初始化
    Home.initLogin = function () {        
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
            var _this = $(this);
            if (!$("#iptUserName").val()) {
                $(".registerErr").html("请输入账号").slideDown();
                return;
            }
            if (!$("#iptPwd").val()) {
                $(".registerErr").html("请输入密码").slideDown();
                return;
            }            
            _this.html("登录中...").attr("disabled", "disabled");
            Global.post("/Manage/Home/UserLogin", {userName: $("#iptUserName").val(),pwd: $("#iptPwd").val()},function (data) {
                _this.html("登录").attr("disabled", "false");               
                if (data.items) {
                    window.location = "/Manage/Home/Index"
                } else {
                    alert("账号或密码不正确");
                }
            });
        });        
    }

    module.exports = Home;
});