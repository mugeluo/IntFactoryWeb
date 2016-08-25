define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot");

    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
        ObjectJS.getTypeList();
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

        $(".btn-add-type").click(function () {
            var acc = $(".name").val();
            var pwd = $(".type").val();
            Global.post("/Manage/Home/InsertType", { Name: acc, Types: pwd }, function (data) {
                if (data.status) {
                    alert("添加成功");
                } else {
                    alert("添加失败");
                }
            })
        });
    };

    ObjectJS.getTypeList = function () {
        Global.post("/Manage/Home/GetTypes", {}, function (data) {
            if (data.items.length > 0) {                
                Dot.exec("/manage/template/type/type-list.html", function (template) {
                    var innerHtml = template(data.items);
                    $(".category").append(innerHtml);
                })
            }
        })
    }

    module.exports = ObjectJS;
})