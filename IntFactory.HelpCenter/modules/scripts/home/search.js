define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        moment = require("moment"),
        Easydialog = require("easydialog");
    require("pager");
    require("daterangepicker");

    var Params = {
        ModuleType: -1,
        TypeID: "",
        Keywords: "",
        BeginTime: "",
        EndTime: "",
        PageIndex: 1,
        PageSize: 5,
        OrderBy: "c.CreateTime desc",
    }
    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();       
    };

    ObjectJS.bindEvent = function () {
        var txt = decodeURI(window.location.href.split("?")[1]);
        if (txt != "") {
            Params.Keywords = txt;
            ObjectJS.getContents();
        } else {
            $(".search-results").append("<li class='nodata-txt'>请输入搜索内容</li>");
        }
      
        $(".time-search li").click(function () {
            var _this = $(this), beginTime = _this.data("begintime"), endTime = _this.data("endtime");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
            };
            Params.BeginTime = beginTime;
            Params.EndTime = endTime;
            Params.PageIndex = 1;
            ObjectJS.getContents();
        });

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
            ObjectJS.getContents();
        });

        $(".count-trem").find("a:first").html(Params.Keywords);
        
    };

    ObjectJS.getContents = function () {
        $(".search-results").empty();
        $(".search-results").append("<div class='data-loading'><div>");
        Global.post("/Home/GetContents", { filter: JSON.stringify(Params) }, function (data) {
            $(".search-results").empty();
            if (data.items.length > 0) {
                Dot.exec("/template/home/contents-list.html", function (template) {
                    var innerHtml = template(data.items);
                    innerHtml = $(innerHtml);
                    $(".search-results").append(innerHtml);
                    $(".search-title2").find("a").html($(".search-results .item").length);

                    $(".count-trem").find("a:last").html(data.totalCount);

                    $("#pager").paginate({
                        total_count: data.totalCount,
                        count: data.pageCount,
                        start: Params.PageIndex,
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
                            ObjectJS.getContents();
                        }
                    });
                });
            } else {
                $(".search-results").append("<li class='nodata-txt'>暂无数据</li>");
                $("#pager").hide();
                $(".search-title2").find("a").html(0);
                $(".count-trem").find("a:last").html(0);
            }
        })
    }

    module.exports = ObjectJS;
});