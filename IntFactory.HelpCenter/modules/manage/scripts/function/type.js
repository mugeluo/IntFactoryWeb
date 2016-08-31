define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        Easydialog = require("easydialog");
    require("pager");

    var ObjectJS = {};
    var Params = {
        PageIndex: 1,
        PageSize: 5
    }
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
        ObjectJS.getTypeList();
    };

    ObjectJS.bindEvent = function () {
        
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