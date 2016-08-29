define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        Easydialog = require("easydialog");

    var ObjectJS = {};
    ObjectJS.type = 0;
    ObjectJS.init = function (navName) {
        ObjectJS.bindEvent(navName);        
    };

    ObjectJS.bindEvent = function (navName) {        
        $(".controller .action-box .action").removeClass("select");
        $(".controller .action-box ." + navName).addClass("select")

        if (navName == "list-type") {
            ObjectJS.getTypeList();
        } else if (navName == "details") {
            ObjectJS.getContentList();
        }

        $(".selector li i").click(function () {
            ObjectJS.bindSelectType(this);
        });

        $(".add-category").click(function () {
            var txt = $(".type").val();
            if (txt=="") {
                alert("分类不能为空");
                return;
            }
            Global.post("/Manage/Function/InsertType", { Name: txt, Types: ObjectJS.type}, function (data) {
                if (data.status==1) {
                    alert("添加成功");
                } else if(data.status==0) {
                    alert("添加失败");
                } else {
                    alert("分类名称已存在");
                }
            })
        });
          
        $(".add-type-details").click(function () {            
            var typeID = $("select option:selected").data("id");
            var title = $(".title").val();
            var desc = $(".desc").val();            
            if (title=="" || desc=="") {
                alert("内容不能为空");
                return;
            }            
            Global.post("/Manage/Function/InsertContent", { TypeID: typeID, Title: title, desc: desc }, function (data) {
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

    ObjectJS.getTypeList = function () {
        Global.post("/Manage/Function/GetTypes", {}, function (data) {
            if (data.items.length > 0) {
                Dot.exec("/manage/template/type/type-list.html", function (template) {
                    var innerHtml = template(data.items);
                    innerHtml = $(innerHtml);
                    $(".category").append(innerHtml);

                    innerHtml.find(".selector li i").click(function () {
                        ObjectJS.bindSelectType(this);
                    });

                    innerHtml.find(".update").click(function () {
                        var _this = $(this);
                        _this.parent().find(".update,.delete").hide();
                        _this.parent().find(".save,.cancel").show();
                        _this.parent().parent().find(".span").hide();
                        _this.parent().parent().find(".input").show();
                    });

                    innerHtml.find(".cancel").click(function () {
                        var _this = $(this);
                        _this.parent().find(".update,.delete").show();
                        _this.parent().find(".save,.cancel").hide();
                        _this.parent().parent().find(".span").show();
                        _this.parent().parent().find(".input").hide();
                    });

                    innerHtml.find(".save").click(function () {
                        var _this=$(this),typeID=_this.data("id");
                        var name = _this.parent().parent().find(".type-name").val();
                        Global.post("/Manage/Function/UpdateType", {TypeID:typeID,Name:name,Types:ObjectJS.type}, function (data) {
                            if (data.status) {
                                _this.parent().find(".update,.delete").show();
                                _this.parent().find(".save,.cancel").hide();
                                _this.parent().parent().find(".span").show();
                                _this.parent().parent().find(".span-name").html(name);
                                _this.parent().parent().find(".input").hide();
                                _this.parent().parent().find(".span-types").html(ObjectJS.type == "0" ? "功能" : ObjectJS.type == "1" ? "问题" : "指引");
                            } else {
                                alert("修改失败");
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
            }
        })
    }

    ObjectJS.getContentList = function () {        
        Global.post("/Manage/Function/GetContent", {}, function (data) {
            $(".list-item").remove();
            Dot.exec("/manage/template/type/type-details-list.html",function(temp){
                var innerHtml = temp(data.items);
                innerHtml = $(innerHtml);
                $(".category-details").append(innerHtml);

                innerHtml.find(".update").click(function () {
                    var _this = $(this), helpID = _this.data("id"),typeid=_this.data("typeid");
                    Dot.exec("/manage/template/content/updata-content.html", function (template) {
                        var innerText = template(data.items);
                        Easydialog.open({
                            container: {
                                id: "show-model-detail",
                                header: "编辑分类信息",
                                content: innerText,
                                yesFn: function () {
                                    var typeID = $(".update-select option:selected").data("id");
                                    var title = $(".title").val();
                                    var content = $(".desc").val();
                                    Global.post("/Manage/Function/UpdateContent", {HelpID:helpID,Title:title,Content:content,TypeID:typeID}, function (e) {
                                        if (e.status) {                                            
                                            ObjectJS.getContentList();
                                        } else {
                                            alert("修改失败");
                                        }
                                    });
                                },
                                callback: function () {

                                }
                            }
                        });
                        for (var i = 0; i < data.list.length; i++) {
                            var list=data.list[i];
                            $(".update-select").append('<option data-id="' + list.TypeID + '">' + list.Name + '</option>');
                        }
                        for (var i = 0; i < data.items.length; i++) {
                            var item = data.items[i];                                                     
                            if (item.HelpID==helpID) {
                                $(".title").val(item.Title);
                                $(".desc").val(item.Content);
                                $(".update-select option[data-id=" + typeid + "]").attr("selected","true");
                            }
                        }

                    });
                });

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
        });
    }

    ObjectJS.bindSelectType = function (obj){
        var _this = $(obj), id = _this.data("id");
        if (!_this.hasClass("hover")) {
            _this.parent().parent().find(".ico-radiobox").removeClass("hover")
            _this.addClass("hover");
            ObjectJS.type = id;
        }
    }

    module.exports = ObjectJS;
})