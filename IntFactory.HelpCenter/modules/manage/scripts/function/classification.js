﻿define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        moment = require("moment"),
        Easydialog = require("easydialog");
    require("pager");
    require("daterangepicker");

    var ObjectJS = {};
    var Params = {
        Types:"-1",
        Keywords: "",
        BeginTime:"",
        EndTime: "",
        PageIndex: 1,
        PageSize: 5,
        OrderBy: "Type.CreateTime desc",
    }
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
        ObjectJS.getTypeList();
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
            ObjectJS.getTypeList();
        });

        //选择模块
        $(".customer-source .item").click(function () {
            var _this = $(this), type = _this.data("idsource");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");                
               
                Params.Types = type;
                ObjectJS.getTypeList();
                
            }
        });

        //关键字搜索
        require.async("search", function () {
            $(".searth-module").searchKeys(function (keyWords) {
                Params.PageIndex = 1;
                Params.Keywords = keyWords;
                ObjectJS.getTypeList();                
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
            ObjectJS.getTypeList();
        });

        $(".add-category").click(function () {
            var types = $("#select .item .hover").data("id");
            var txt = $(".type").val();
            if (txt == "") {
                alert("分类不能为空");
                return;
            }
            Global.post("/Manage/Function/InsertType", { Name: txt, Types: types }, function (data) {
                if (data.status == 1) {
                    alert("添加成功");
                } else if (data.status == 0) {
                    alert("添加失败");
                } else {
                    alert("分类名称已存在");
                }
            })
        });

        $("#select .item .check-lump").click(function () {
            var _this = $(this);
            if (!_this.hasClass("hover")) {
                $("#select .item .check-lump").removeClass("hover");
                _this.addClass("hover");
            };
        });


    };

    ObjectJS.getTypeList = function () {
        Global.post("/Manage/Function/GetTypes", { filter: JSON.stringify(Params) }, function (data) {
            if (data.items.length > 0) {
                $(".lists").remove();
                Dot.exec("/manage/template/type/type-list.html", function (template) {
                    var innerHtml = template(data.items);
                    innerHtml = $(innerHtml);
                    $(".category").append(innerHtml);

                    innerHtml.find(".update").click(function () {
                        var _this = $(this), typeID = _this.data("id");
                        Dot.exec("/manage/template/content/updata-type.html", function (template) {
                            var innerText = template(data.items);
                            Easydialog.open({
                                container: {
                                    id: "show-model-detail",
                                    header: "编辑模块",
                                    content: innerText,
                                    yesFn: function () {
                                        var type = $(".type").val();
                                        var types = $(".table-add select option:selected").data("id");
                                        Global.post("/Manage/Function/UpdateType", { TypeID: typeID, Name: type, Types: types }, function (e) {
                                            if (e.status) {
                                                ObjectJS.getTypeList();
                                            } else {
                                                alert("修改失败");
                                            }
                                        });
                                    },
                                    callback: function () {

                                    }
                                }
                            });

                            for (var i = 0; i < data.items.length; i++) {
                                var item = data.items[i];
                                if (item.TypeID == typeID) {
                                    $(".type").val(item.Name);
                                    $("#show-model-detail .table-add select option[data-id=" + item.Types + "]").attr("selected", "true");
                                }
                            }                            
                        });
                    });

                    innerHtml.find(".delete").click(function () {
                        var confirmMsg = "确定删除此分类?";
                        confirm(confirmMsg, function () {
                            var _this = $(this);
                            var typeID = _this.data("id");
                            Global.post("/Manage/Function/DeleteType", { TypeID: typeID }, function (data) {
                                if (data.status == 1) {
                                    _this.parent().parent().fadeOut(400, function () {
                                        _this.remove();
                                    });
                                } else if (data.status == 0) {
                                    alert("删除失败");
                                } else {
                                    alert("请先删除分类下数据");
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
                        ObjectJS.getTypeList();
                    }
                });
            }
        })
    }

    module.exports = ObjectJS;
})