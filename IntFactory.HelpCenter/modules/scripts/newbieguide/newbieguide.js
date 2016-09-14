define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        Easydialog = require("easydialog");
    require("pager");

    var Params = {
        Types: -1,
        TypeID: "",
        Keywords: "",
        BeginTime: "",
        EndTime: "",
        PageIndex: 1,
        PageSize: 5,
        OrderBy: "c.CreateTime desc",
    }
    var ObjectJS = {};
    ObjectJS.init = function (list) {
        list = JSON.parse(list.replace(/&quot;/g, '"'));
        ObjectJS.bindEvent(list);
    };

    ObjectJS.bindEvent = function (list) {
        
        Dot.exec("/template/newbieguide/newbieguide.html", function (template) {
            var innerHtml = template(list);
            innerHtml = $(innerHtml);
            $(".smallPicUlBox ul").append(innerHtml);
            $(".smallPicUlBox ul li:first").addClass("current");
        });
    };

    module.exports = ObjectJS;
});