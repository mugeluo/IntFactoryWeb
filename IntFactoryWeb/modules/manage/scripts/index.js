define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot");

    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {
        $(".btn-ok").click(function () {
            var acc = $(".account").val();
            var pwd = $(".password").val();
            Global.post("/Manage/Home/InsertUsers", {Account:acc,Password:pwd}, function (data) {
                if (data.status) {
                    alert("添加成功");
                } else {
                    alert("添加失败");
                }
            })
        });
    };

    module.exports = ObjectJS;
})