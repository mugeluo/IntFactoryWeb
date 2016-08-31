define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"), editor,
        Easydialog = require("easydialog");
    require("pager");
    var ObjectJS = {};
    var Params = {
        PageIndex: 1,
        PageSize: 5
    }

    ObjectJS.init = function (Editor, navName) {
        ObjectJS.bindEvent(navName);
        editor = Editor;
        ObjectJS.getContentList();
    };

    ObjectJS.bindEvent = function (navName) {
        console.log(navName);
        $(".controller .action-box .action").removeClass("select");
        $(".controller .action-box ." + navName).addClass("select")

        if (navName == "details") {
            ObjectJS.getContentList();
        }

        $(".add-category").click(function () {
            var types = $(".table-add select option:selected").data("id");
            var txt = $(".type").val();
            if (txt=="") {
                alert("分类不能为空");
                return;
            }
            Global.post("/Manage/Function/InsertType", { Name: txt, Types: types }, function (data) {
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
            var desc = encodeURI(editor.getContent());
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

    ObjectJS.getContentList = function () {        
        Global.post("/Manage/Function/GetContent", { filter: JSON.stringify(Params) }, function (data) {
            $(".list-item").remove();
            if (data.items.length>0) {
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
                                        var content = encodeURI($(".desc").val());
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
                                    $(".desc").val(decodeURI(item.Content));
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