define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot");

    var ObjectJS = {};

    ObjectJS.init = function () {
        ObjectJS.bindEvent();
        ObjectJS.GetData(0);
    };

    ObjectJS.bindEvent = function () {
        $(".menu li").click(function () {            
            var _this = $(this),id=_this.data("id");
            if (!_this.hasClass("hvoer")) {
                _this.addClass("hover").siblings().removeClass("hover");
                ObjectJS.GetData(id);
            }
            
        });
    };

    ObjectJS.GetData = function (id) {        
        Global.post("/Manage/Home/GetTypes", {}, function (data) {
            if (data.items.length > 0) {
                $(".list").empty();
                Dot.exec("/manage/template/nav-list.html", function (template) {
                    var innerHtml = template(data.items);
                    $(".list").append(innerHtml);
                })
            }
        })
    };

    module.exports = ObjectJS;
})