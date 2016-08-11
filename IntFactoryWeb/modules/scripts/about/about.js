define(function (require,exports,module) {
    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {
        var num = 1;
        $(".switch-right").click(function () {
            if (num == 1) {                
                $(".team-one").slideUp();
                $(".team-two").slideDown();
                $(this).css("color", "#ccc");
                $(".switch-left").css("color", "#4a98e7");
                num = 2;                
            }            
        });
        $(".switch-left").click(function () {
            if (num==2) {
                $(".team-one").slideDown();
                $(".team-two").slideUp();
                $(this).css("color", "#ccc");
                $(".switch-right").css("color", "#4a98e7");
                num = 1;
            }            
        });
        setInterval(function () {
            if (num == 1) {
                $(".switch-right").click();
                num = 2;
            } else {
                $(".switch-left").click();
                num = 1;
            }
        }, 5000);

        var arr = [{ phone: "合作：<a>18221077623</a>", email: "邮箱：<a>customer@yunxiaokeji.com</a>", address: '地址：<a href="http://j.map.baidu.com/FvBYv">上海市长宁区中山西路1279弄6号国峰科技大厦6楼</a></div>', code: "邮编：<a>200050</a>" }, { phone: "合作：<a>18221077624</a>", email: "邮箱：<a>customer@yunxiaokeji.com</a>", address: '地址：<a href="http://j.map.baidu.com/FvBYv">北京市长宁区中山西路1279弄6号国峰科技大厦6楼</a></div>', code: "邮编：<a>200030</a>" }, { phone: "合作：<a>18221077625</a>", email: "邮箱：<a>customer@yunxiaokeji.com</a>", address: '地址：<a href="http://j.map.baidu.com/FvBYv">杭州市长宁区中山西路1279弄6号国峰科技大厦6楼</a></div>', code: "邮编：<a>200010</a>" }]

        $(".company").click(function () {
            var _this = $(this), id = _this.data("id"), font = _this.data("html");
            if (!_this.hasClass("hover")) {
                _this.addClass("hover").siblings().removeClass("hover");
            };
            $(".contant-details").fadeOut(function () {
                $(".contant-details .phone").html(arr[id].phone);
                $(".contant-details .email").html(arr[id].email);
                $(".contant-details .address").html(arr[id].address);
                $(".contant-details .code").html(arr[id].code);
                $(".contant-details").fadeIn();
            });                     
            $(".company .iconfont").empty();
            _this.find(".iconfont").html(font);
        });
    };
    module.exports = ObjectJS;
})