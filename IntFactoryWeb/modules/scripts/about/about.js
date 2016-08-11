define(function (require,exports,module) {
    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {

        var arr = [{ phone: "合作：<a>18221077623</a>", email: "邮箱：<a>customer@yunxiaokeji.com</a>", address: "地址：上海市长宁区中山西路<a>1279</a>弄<a>6</a>号国峰科技大厦6楼", code: "邮编：<a>200050</a>" }, { phone: "合作：<a>18221077624</a>", email: "邮箱：<a>customer@yunxiaokeji.com</a>", address: "地址：北京市长宁区中山西路<a>1279</a>弄<a>6</a>号国峰科技大厦6楼", code: "邮编：<a>200030</a>" }, { phone: "合作：<a>18221077625</a>", email: "邮箱：<a>customer@yunxiaokeji.com</a>", address: "地址：杭州市长宁区中山西路<a>1279</a>弄<a>6</a>号国峰科技大厦6楼", code: "邮编：<a>200010</a>" }]

        $(".company").hover(function () {
            var _this = $(this), id = _this.data("id");
            if (!_this.hasClass("hover")) {
                _this.addClass("hover").siblings().removeClass("hover");
            }
            $(".contant-details .phone").html(arr[id].phone);
            $(".contant-details .email").html(arr[id].email);
            $(".contant-details .address").html(arr[id].address);
            $(".contant-details .code").html(arr[id].code);
        });
    };
    module.exports = ObjectJS;
})