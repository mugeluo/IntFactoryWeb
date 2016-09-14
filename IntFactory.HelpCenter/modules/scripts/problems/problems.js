define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        Easydialog = require("easydialog");
    require("pager");

    var ObjectJS = {};

    var pageCount = 0;

    var Params = {
        TypeID: "",
        Keywords: "",
        BeginTime: "",
        EndTime: "",
        PageIndex: 1,
        PageSize: 5,
        OrderBy: "c.CreateTime desc",
    }
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
        ObjectJS.getContents();
    };

    ObjectJS.bindEvent = function () {
        $(".category-menu li:first").addClass("hover");
        Params.TypeID = $(".category-menu li:first").data("id");

        $(".category ul li").click(function () {
            var _this = $(this), id = _this.data("id");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");

                Params.TypeID = id;
                Params.PageIndex = 1;
                ObjectJS.getContents();
            }; 
        });

        $(".load-more").click(function () {
            if (Params.PageIndex != pageCount) {
                Params.PageIndex++;
                ObjectJS.getContents(true);
            } else {
                alert("最后一页啦");
            }            
        });

        Global.post("/Problems/GetClickNumberList", {}, function (data) {
            if (data.items.length > 0) {
                for (var i = 0; i < data.items.length; i++) {
                    $(".example ul .item-all").after("<li class='item'><a href='/Problems/ProblemsDetail/" + data.items[i].ContentID + "'>· " + data.items[i].Title + "</a></li>");
                }
            }
        });
    };

    ObjectJS.getContents = function () {
        if (Params.PageIndex==1) {
            $(".problems-details").empty();
        }
        $(".problems-details").append("<div class='data-loading'><div>");
        Global.post("/Problems/GetContents", { filter: JSON.stringify(Params) }, function (data) {
            $(".problems-details").empty();

            if (data.items.length > 0) {
                Dot.exec("/template/problems/contentslist.html", function (template) {
                    var innerHtml = template(data.items);
                    innerHtml = $(innerHtml);
                    $(".problems-details").append(innerHtml);
                    pageCount = data.pageCount;
                });
            } else {
                $(".problems-details").append("<li class='center mTop20 font16'>暂无数据</li>");
            }
        })
    }

    module.exports = ObjectJS;
});