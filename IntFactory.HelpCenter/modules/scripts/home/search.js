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
    };

    ObjectJS.bindEvent = function () {

        //排序
        $(".sort-item").click(function () {
            var _this = $(this);
            var asc = true;
            if (_this.hasClass("hover")) {
                if (_this.find(".asc").hasClass("hover")) {
                    _this.find(".asc").removeClass("hover");
                    _this.find(".desc").addClass("hover");
                    asc = false;

                } else {
                    _this.find(".desc").removeClass("hover");
                    _this.find(".asc").addClass("hover");
                }
            } else {
                _this.addClass("hover").siblings().removeClass("hover");
                _this.siblings().find(".hover").removeClass("hover");
                _this.find(".desc").addClass("hover");
                asc = false;
            }
            Params.OrderBy = _this.data("column") + (asc ? " asc" : " desc ");
            Params.PageIndex = 1;
            //ObjectJS.getContentList();
        });

        $("#pager").paginate({
            //total_count: data.totalCount,
            //count: data.pageCount,
            //start: Params.PageIndex,
            total_count: 20,
            count: 10,
            start: 1,
            display: 5,
            border: true,
            border_color: '#fff',
            text_color: '#333',
            background_color: '#fff',
            border_hover_color: '#ccc',
            text_hover_color: '#000',
            background_hover_color: '#efefef',
            rotate: true,
            images: false,
            mouse: 'slide',
            onChange: function (page) {
                Params.PageIndex = page;
                //ObjectJS.getContentList();
            }
        });
    };
    module.exports = ObjectJS;
});