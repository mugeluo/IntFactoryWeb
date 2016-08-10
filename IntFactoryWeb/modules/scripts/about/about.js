define(function (require,exports,module) {
    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {

        var arr = [{ phone: "合作：18221077623", email: "邮箱：customer@yunxiaokeji.com", address: "地址：上海市长宁区中山西路1279弄6号国峰科技大厦6楼", code: "邮编：200050" }, { phone: "合作：2", email: "邮箱：customer@yunxiaokeji.com", address: "地址：北京市长宁区中山西路1279弄6号国峰科技大厦6楼", code: "邮编：200020" }, { phone: "合作：3", email: "邮箱：customer@yunxiaokeji.com", address: "地址：杭州市长宁区中山西路1279弄6号国峰科技大厦6楼", code: "邮编：200010" }]

        $(".company").click(function () {
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