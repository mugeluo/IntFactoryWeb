define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        Easydialog = require("easydialog");
    require("pager");

    var ObjectJS = {};

    var pageCount = 0;

    var Params = {
        ModuleType: -1,
        TypeID: "",
        Keywords: "",
        BeginTime: "",
        EndTime: "",
        PageIndex: 1,
        PageSize: 10,
        OrderBy: "c.UpdateTime desc",
    }

    ObjectJS.init = function () {
        ObjectJS.bindEvent();
        ObjectJS.getContents();

        Params.ModuleType = 2;
        Params.OrderBy = 'c.ClickNumber asc';
        ObjectJS.getContentHotProblems("", $(".item-all"));
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
            if (Params.PageIndex < pageCount) {
                Params.PageIndex++;
                ObjectJS.getContents(true);
            } else {
                alert("最后一页啦");
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
                $(".problems-details").append("<li class='nodata-txt'>暂无数据</li>");
            }
            
            if (data.items.length<Params.PageSize-1) {
                $(".load-more").hide();
            } else {
                $(".load-more").show();
            }
        })
    }

    ObjectJS.getContentHotProblems = function (typeid, targetObject) {
        Params.TypeID = typeid;
        $(targetObject).after("<div class='data-loading'><div>");
        Global.post("/Home/GetContents", { filter: JSON.stringify(Params) }, function (data) {
            $(".data-loading").remove();
            var items = data.items;
            var len = items.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    var item = items[i];
                    $(targetObject).after("<li><a href='/Problems/ProblemsDetail/" + item.ContentID + "'>. " + item.Title + "</a></li>");
                }
            } else {
                $(targetObject).after("<li class='nodata-txt'>暂无数据</li>");
            }
        });
    };

    module.exports = ObjectJS;
});