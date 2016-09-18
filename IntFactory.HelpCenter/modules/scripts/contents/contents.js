define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        Easydialog = require("easydialog");
    require("pager");

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

    var ObjectJS = {};

    ObjectJS.init = function () {
        ObjectJS.bindEvent();

        Params.ModuleType = 2;
        ObjectJS.getContents("", $(".problems-list"));

        Params.OrderBy = "c.ClickNumber desc";
        ObjectJS.getContents("", $(".news-list"));
    };

    ObjectJS.bindEvent = function () {

        $(".content-title li").click(function () {
            var _this = $(this);
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
            };
        });

        $(".item li").click(function () {
            var _this = $(this), remark = _this.data("detail"),title=_this.data("title");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
                $("#title").html(title);
                $("#remark").html(decodeURI(remark));
            };
        });

        $(".menu-title").click(function () {
            var _this = $(this);
            if (!_this.hasClass("tag")) {
                _this.next().show();
                _this.addClass("tag");                          
            } else {
                _this.removeClass("tag");
                _this.next().hide();
            }
            
        });

        $(".head-content-search .iconfont").click(function () {
            Params.Keywords = $(".search-txt").val();
            Params.ModuleType = 1;
            ObjectJS.getContents("", $(".menu"));
        });

        $(".menu-title:first").click();
        $(".item li:first").click();

    };

    ObjectJS.getContents = function (typeid, targetObject) {
        Params.TypeID = typeid;
        $(targetObject).append("<div class='data-loading'><div>");
        Global.post("/Home/getContents", { filter: JSON.stringify(Params) }, function (data) {
            $(".data-loading").remove();
            var items = data.items;
            var len = items.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    var item = items[i];
                    $(targetObject).append("<li><a href='/Problems/ProblemsDetail/" + item.ContentID + "'>. " + item.Title + "</a></li>");
                }

            }
        });
    };
       
    module.exports = ObjectJS;
});