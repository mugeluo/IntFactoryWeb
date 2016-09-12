define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),    
        Easydialog = require("easydialog");
    require("pager");
    
    var ObjectJS = {};

    var Params = {        
        TypeID: "",
        Keywords: "",        
        PageIndex: 1,
        PageSize: 10,
        OrderBy: "c.CreateTime desc",
    }

    ObjectJS.init = function () {
        ObjectJS.bindEvent();
        ObjectJS.getTypesList();
    };

    ObjectJS.bindEvent = function () {

        $(".table-switch li").click(function () {
            var _this = $(this),id=_this.data("id");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
            };
            $(".problem-detail .problem-content").hide();
            $(".problem-detail .problem-content").eq(id).show();
        });
    };

    ObjectJS.getTypesList = function () {
        Global.post("/Home/GetTypesByModuleType", { type: 1 }, function (data) {
            if (data.items.length>0) {
                Dot.exec("/template/home/get-types-list.html", function (template) {
                    var innerHtml = template(data.items);
                    innerHtml = $(innerHtml);
                    $(".function").append(innerHtml);

                    $(".function li").mouseenter(function () {
                        var _this = $(this);
                        _this.find(".detail").show();
                    });

                    $(".function li .detail").mouseleave(function () {
                        $(this).hide();
                    });

                });
            }
        });
    };

    module.exports = ObjectJS;
});