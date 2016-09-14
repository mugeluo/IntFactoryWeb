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

        Params.ModuleType = 3;
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
            var _this = $(this);
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
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



    };

    ObjectJS.getContents = function (typeid, targetObject) {
        Params.TypeID = typeid;
        Global.post("/Home/getContents", { filter: JSON.stringify(Params) }, function (data) {
            debugger
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