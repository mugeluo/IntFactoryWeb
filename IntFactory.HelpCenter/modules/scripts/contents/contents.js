define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        Easydialog = require("easydialog");
    require("pager");

    var Params = {
        ModuleType: 1,
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

        $(".item li").click(function () {
            var _this = $(this), remark = _this.data("detail"),title=_this.data("title");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
                $("#title").html(title);
                $("#remark").html(decodeURI(remark));

                $(".content-menu").css("height", $(".content").height());
            };
        });

        $(".menu-title").click(function () {
            var _this = $(this);
            if (!_this.hasClass("tag")) {
                _this.siblings().removeClass("tag");
                $(".item").hide();
                _this.addClass("tag");
                _this.next().show();
            } else {
                _this.removeClass("tag");
                _this.next().hide();
            }
            
        });

        $(".head-content-search .iconfont").click(function () {
            var keyWords = $(".search-txt").val();
            if (Params.Keywords != keyWords) {
                Params.Keywords = keyWords;
                Params.ModuleType = 1;
                ObjectJS.getContents("", $(".menu"), true);
            }

        });

        $(".menu-title:first").click();
        $(".item li:first").click();

    };

    ObjectJS.getContents = function (typeid, targetObject,status) {
        if (status) {
            $(targetObject).empty();
            $("#title").empty();
            $("#remark").empty();
        }
        Params.TypeID = typeid;
        $(targetObject).append("<div class='data-loading'><div>");
        Global.post("/Home/getContents", { filter: JSON.stringify(Params) }, function (data) {
            $(".data-loading").remove();
            var items = data.items;
            var len = items.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    var item = items[i];
                    if (status) {
                        $(targetObject).append("<div class='items' data-title='" + item.Title + "' data-desc='" + item.Detail + "'><span>" + item.Title + "</span></div>");
                    } else {
                        $(targetObject).append("<li><a href='/Problems/ProblemsDetail/" + item.ContentID + "'>. " + item.Title + "</a></li>");
                    }                    
                }
            }

            $(targetObject).find(".items").click(function () {
                var _this = $(this), title = _this.data("title"), desc = _this.data("desc");
                if (!_this.hasClass("hover")) {
                    _this.siblings().removeClass("hover");
                    _this.addClass("hover");
                    $("#title").html(title);
                    $("#remark").html(decodeURI(desc));
                }
            });

            $(targetObject).find(".items:first").click();

            $(".content-menu").css("height", $(".content").height());

        });
    };
       
    module.exports = ObjectJS;
});