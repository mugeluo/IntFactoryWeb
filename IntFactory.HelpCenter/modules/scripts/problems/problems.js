define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        Easydialog = require("easydialog");
    require("pager");

    var ObjectJS = {};

    ObjectJS.isLoading = true;

    var pageCount = 0;

    var Params = {
        ModuleType: -1,
        TypeID: "",
        Keywords: "",
        BeginTime: "",
        EndTime: "",
        PageIndex: 1,
        PageSize: 10,
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
            if (!ObjectJS.isLoading) {
                alert("数据正在加载中");
                return;
            }
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
        ObjectJS.isLoading = false;
        $(".problems-details").append("<div class='data-loading'><div>");
        Global.post("/Problems/GetContents", { filter: JSON.stringify(Params) }, function (data) {
            $(".problems-details").empty();
            ObjectJS.isLoading = true;
            if (data.items.length > 0) {
                Dot.exec("/template/problems/contentslist.html", function (template) {
                    var innerHtml = template(data.items);
                    innerHtml = $(innerHtml);
                    $(".problems-details").append(innerHtml);
                    $(".problems-desc").find("img").remove();
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

    module.exports = ObjectJS;
});