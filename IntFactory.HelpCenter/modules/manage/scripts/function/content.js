﻿define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"), editor,
        moment = require("moment"),
        Easydialog = require("easydialog");
    require("pager");
    require("daterangepicker");

    var ObjectJS = {};

    var Params = {
        TypeID: "",
        Keywords: "",
        BeginTime: "",
        EndTime: "",
        PageIndex: 1,
        PageSize: 5,
        OrderBy: "Help.CreateTime desc",
    }

    ObjectJS.init = function (Editor) {        
        ObjectJS.bindEvent();        
        editor = Editor;
        ObjectJS.getContentList();
    };

    ObjectJS.bindEvent = function () {
        //日期插件
        $("#iptCreateTime").daterangepicker({
            showDropdowns: true,
            empty: true,
            opens: "right",
            ranges: {
                '今天': [moment(), moment()],
                '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '上周': [moment().subtract(6, 'days'), moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')]
            }
        }, function (start, end, label) {
            Params.PageIndex = 1;
            Params.BeginTime = start ? start.format("YYYY-MM-DD") : "";
            Params.EndTime = end ? end.format("YYYY-MM-DD") : "";
            ObjectJS.getContentList();
        });

        //选择模块
        $(".customer-source .item").click(function () {
            var _this = $(this), typeID = _this.data("id");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");

                Params.TypeID = typeID;
                ObjectJS.getContentList();

            }
        });

        //关键字搜索
        require.async("search", function () {
            $(".searth-module").searchKeys(function (keyWords) {
                Params.PageIndex = 1;
                Params.Keywords = keyWords;
                ObjectJS.getContentList();                
            });
        });

        //排序
        $(".sort-item").click(function () {
            var _this = $(this);
            if (_this.hasClass("hover")) {
                if (_this.find(".asc").hasClass("hover")) {
                    _this.find(".asc").removeClass("hover");
                    _this.find(".desc").addClass("hover");
                    Params.OrderBy = _this.data("column") + " desc ";
                } else {
                    _this.find(".desc").removeClass("hover");
                    _this.find(".asc").addClass("hover");
                    Params.OrderBy = _this.data("column") + " asc ";
                }
            } else {
                _this.addClass("hover").siblings().removeClass("hover");
                _this.siblings().find(".hover").removeClass("hover");
                _this.find(".desc").addClass("hover");
                Params.OrderBy = _this.data("column") + " desc ";
            }
            Params.PageIndex = 1;
            ObjectJS.getContentList();
        });

        $("#selector .item .check-lump").click(function () {
            var _this = $(this), type=_this.data("id");
            if (!_this.hasClass("hover")) {
                $("#selector .item .check-lump").removeClass("hover");
                _this.addClass("hover");
            }
            Global.post("/Manage/Function/GetTypeByTypes", { type: type }, function (data) {
                if (data.items.length>0) {
                    $("#classIfication").empty();
                    for (var i = 0; i < data.items.length; i++) {
                        var item=data.items[i];
                        $("#classIfication").append("<option data-id="+item.TypeID+">"+item.Name+"</option>");
                    }                    
                } else {
                    alert("网络波动，请重试");
                }
            });

        });

        $(".add-type-details").click(function () {            
            var typeID = $("select option:selected").data("id");
            var title = $(".title").val();
            var keywords = $(".keywords").val();
            var desc = encodeURI(editor.getContent());
            if (title=="" || desc=="") {
                alert("内容不能为空");
                return;
            }            
            Global.post("/Manage/Function/InsertContent", { typeID: typeID, title: title, keywords: keywords, desc: desc }, function (data) {
                if (data.status == 1) {
                    alert("添加成功");
                } else if (data.status == 0) {
                    alert("添加失败");
                } else {
                    alert("标题已存在");
                }
            })
        });     
    };

    ObjectJS.getContentList = function () {        
        Global.post("/Manage/Function/GetContent", { filter: JSON.stringify(Params) }, function (data) {
            $(".list-item").remove();
            if (data.items.length>0) {
                Dot.exec("/manage/template/type/type-details-list.html",function(temp){
                    var innerHtml = temp(data.items);
                    innerHtml = $(innerHtml);
                    $(".category-details").append(innerHtml);                    

                    innerHtml.find(".delete").click(function () {
                        var confirmMsg = "确定删除此分类?";            
                        confirm(confirmMsg, function () {
                            var _this = $(this);
                            var helpID = _this.data("id");
                            Global.post("/Manage/Function/DeleteContent", { HelpID: helpID }, function (data) {
                                if (data.status) {
                                    _this.parent().parent().fadeOut(400, function () {
                                        _this.remove();
                                    });
                                } else {
                                    alert("删除失败");
                                }
                            })
                        });
                    });
                })

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
                        ObjectJS.getContentList();
                    }
                });
            }            
        });
    }

    module.exports = ObjectJS;
})