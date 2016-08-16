define(function (require,exports,module) {
    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };
    ObjectJS.num = 1;
    ObjectJS.bindEvent = function () {
       
        $(".switch-right").click(function () {            
            ObjectJS.bindClick();
            console.log($(".team-one").attr("left"));
        });

        $(".switch-left").click(function () {            
            ObjectJS.bindClick();
        });

        setInterval(function () {            
            ObjectJS.bindClick();
        }, 5000000);

        var arr = [{ phone: "合作：<a>18221077623</a>", email: "邮箱：<a>customer@yunxiaokeji.com</a>", address: '地址：<a href="http://j.map.baidu.com/FvBYv">上海市长宁区中山西路1279弄6号国峰科技大厦6楼</a></div>', code: "邮编：<a>200050</a>" },  { phone: "合作：<a>18221077625</a>", email: "邮箱：<a>customer@yunxiaokeji.com</a>", address: '地址：<a href="http://j.map.baidu.com/FvBYv">杭州市长宁区中山西路1279弄6号国峰科技大厦6楼</a></div>', code: "邮编：<a>200010</a>" }]

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

    ObjectJS.bindClick = function () {        
        if (ObjectJS.num == 1) {
            $(".team-one").animate({ left: "1000px" });
            $(".team-two").animate({ left: "0px" });  
            ObjectJS.num = 2;
        } else {
            $(".team-one").animate({ left: "0px" });
            $(".team-two").animate({ left: "1000px" });
            ObjectJS.num = 1;
        }
    }
    module.exports = ObjectJS;
})