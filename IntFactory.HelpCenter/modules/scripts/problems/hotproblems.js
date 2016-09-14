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
        OrderBy: "c.CreateTime desc",
    }

    ObjectJS.init = function () {
        ObjectJS.bindEvent();

        Params.ModuleType = 2;
        Params.OrderBy = 'c.ClickNumber asc';
        ObjectJS.getContents("", $(".item-all"));
    };

    ObjectJS.bindEvent = function () {

    };

    ObjectJS.getContents = function (typeid, targetObject) {
        Params.TypeID = typeid;
        $(targetObject).after("<div class='data-loading'><div>");
        Global.post("/Home/getContents", { filter: JSON.stringify(Params) }, function (data) {
            $(".data-loading").remove();
            var items = data.items;
            var len = items.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    var item = items[i];
                    $(targetObject).after("<li><a href='/Problems/ProblemsDetail/" + item.ContentID + "'>. " + item.Title + "</a></li>");
                }

            }
        });
    };

    module.exports = ObjectJS;
});