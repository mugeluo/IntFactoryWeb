﻿define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"), editor,
        moment = require("moment"),
        Easydialog = require("easydialog");
    require("pager");
    require("daterangepicker");

    var ObjectJS = {};

    ObjectJS.isLoading = true;
    ObjectJS.moduleTypes = "";

    var Params = {
        Types: 0,
        TypeID:"",
        Keywords: "",
        BeginTime: "",
        EndTime: "",
        PageIndex: 1,
        PageSize: 5,
        OrderBy: "c.CreateTime desc",
    }

    ObjectJS.init = function (Editor, list) {
        if (list!=null) {
            list = JSON.parse(list.replace(/&quot;/g, '"'));
        }
        ObjectJS.bindEvent(list);
        editor = Editor;
        ObjectJS.getContentList();
    };

    ObjectJS.bindEvent = function (list) {
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

        ObjectJS.bindCateGory();
        if (list != null) {
            ObjectJS.cateGoryDropDown(list);
        }
        //模块选择
        $(".module-source .item").click(function () {
            if (!ObjectJS.isLoading) {
                return;
            }
            var _this = $(this), type = _this.data("idsource");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
            };
            Params.Types = type;
            $(".category-source .item").removeClass("hover");
            $(".category-source .item:first").addClass("hover");
            Params.TypeID = "";
            ObjectJS.isLoading = false;
            Global.post("/Manage/HelpCenter/GetTypesByModuleType", { type: type }, function (data) {
                ObjectJS.isLoading = true;
                if (data.items.length > 0) {
                    $(".category-source .item:gt(0)").remove();                    
                    for (var i = 0; i < data.items.length; i++) {
                        var item = data.items[i];
                        $(".category-source").append("<li class='item' data-id=" + item.TypeID + ">" + item.Name + "</li>");
                    } 
                    ObjectJS.bindCateGory();
                    ObjectJS.getContentList();
                } else {
                    alert("网络波动，请重试");
                }
            });
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

        //添加内容--模块选择
        $("#selector .item .check-lump").click(function () {
            if (!ObjectJS.isLoading) {
                return;
            }
            var _this = $(this), type=_this.data("id");
            if (!_this.hasClass("hover")) {
                $("#selector .item .check-lump").removeClass("hover");
                _this.addClass("hover");
            }
            ObjectJS.isLoading = false;
            Global.post("/Manage/HelpCenter/GetTypesByModuleType", { type: type }, function (data) {
                ObjectJS.isLoading = true;
                if (data.items.length>0) {
                    ObjectJS.cateGoryDropDown(data.items);
                } else {
                    alert("网络波动，请重试");
                }
            });
        });

        //添加内容
        $(".add-type-details").click(function () { 
            var sort = $(".sort").val();
            var title = $(".title").val();
            var keywords = $(".keywords").val();
            var desc = encodeURI(editor.getContent());            
            if (title=="" || desc==""||sort=="") {
                alert("内容不能为空");
                return;
            }            
            Global.post("/Manage/HelpCenter/InsertContent", { typeID: ObjectJS.moduleTypes, sort: sort, title: title, keywords: keywords, desc: desc }, function (data) {
                if (data.status == 1) {
                    alert("添加成功");
                    window.location = "/Manage/HelpCenter/DetailList";
                } else if (data.status == 0) {
                    alert("添加失败");
                } else {
                    alert("标题已存在");
                }
            })
        });
    };

    ObjectJS.getContentList = function () {
        ObjectJS.isLoading = false;
        $(".tr-header").nextAll().remove();
        $(".tr-header").after("<tr><td colspan='15'><div class='data-loading'><div></td></tr>");
        Global.post("/Manage/HelpCenter/GetContent", { filter: JSON.stringify(Params) }, function (data) {
            $(".tr-header").nextAll().remove();
            ObjectJS.isLoading = true;
            if (data.items.length>0) {
                Dot.exec("/manage/template/type/type-details-list.html",function(temp){
                    var innerHtml = temp(data.items);
                    innerHtml = $(innerHtml);
                    $(".category-details").append(innerHtml);

                    innerHtml.find(".delete").click(function () {
                        var _this = $(this);
                        var contentID = _this.data("id");
                        var confirmMsg = "确定删除此分类?";            
                        confirm(confirmMsg, function () {                            
                            Global.post("/Manage/HelpCenter/DeleteContent", { contentID: contentID }, function (data) {
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
            } else {
                $(".category-details").append("<tr class='list-item' style='height:100px;'><td class='center font16' colspan='6'>暂无数据<td></tr>");
            }
        });
    }

    ObjectJS.bindCateGory = function () {
        //选择分类
        $(".category-source .item").click(function () {
            if (!ObjectJS.isLoading) {
                return;
            }
            var _this = $(this), typeID = _this.data("id");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");

                Params.TypeID = typeID;
                ObjectJS.getContentList();
            }
        });
    };

    ObjectJS.cateGoryDropDown = function (item) {
        $("#category_Down").empty();        
        require.async("dropdown", function () {
            var types = [];
            for (var i = 0; i < item.length; i++) {
                types.push({
                    ID: item[i].TypeID,
                    Name: item[i].Name
                })
            }
            ObjectJS.moduleTypes = item[0].TypeID;
            $("#category_Down").dropdown({
                prevText: "分类-",
                defaultText: item[0].Name,
                defaultValue: item[0].TypeID,
                data: types,
                dataValue: "ID",
                dataText: "Name",
                width: "110",
                onChange: function (data) {
                    if (ObjectJS.moduleTypes != data.value) {
                        if (ObjectJS.isLoading) {
                            ObjectJS.moduleTypes = data.value;                            
                        } else {
                            alert("数据加载中，请稍等 !");
                        }
                    }
                }
            });
        });

    }

    module.exports = ObjectJS;
})