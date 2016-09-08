﻿define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"), editor

    var ObjectJS = {};

    ObjectJS.moduleTypes = "";

    ObjectJS.init = function (Editor, model,list) {
        var _self = this;
        editor = Editor;
        model = JSON.parse(model.replace(/&quot;/g, '"'));
        list = JSON.parse(list.replace(/&quot;/g, '"'));

        ObjectJS.bindEvent(model,list);
    };

    ObjectJS.bindEvent = function (model,list) {        
        $("#selector .item .check-lump[data-id=" + model.Types.ModuleType + "]").addClass("hover");
        
        $(".title").val(model.Title);
        $(".sort").val(model.Sort);
        $(".keywords").val(model.KeyWords);
        editor.ready(function () {
            editor.setContent(decodeURI(model.Detail));
        });
                
        $(".update-details").click(function () {
            ObjectJS.updateContent(model.ContentID);
        });

        $("#selector .item .check-lump").click(function () {            
            var _this = $(this), id = _this.data("id");
            if (!_this.hasClass("hover")) {
                $("#selector .item .check-lump").removeClass("hover");
                _this.addClass("hover");
            };
            Global.post("/Manage/HelpCenter/GetTypesByModuleType", { type: id }, function (data) {
                if (data.items.length > 0) {
                    ObjectJS.cateGoryDropDown(data.items, model,false);
                } else {
                    alert("网络波动，请重试");
                }
            });
        });

        ObjectJS.cateGoryDropDown(list, model,true);
    };

    ObjectJS.updateContent = function (id) {   
        var title = $(".title").val();
        var sort = $(".sort").val();
        var keywords = $(".keywords").val();
        var content = encodeURI(editor.getContent());
        Global.post("/Manage/HelpCenter/UpdateContent", {
            id: id,
            title: title,
            sort: sort,
            keyWords: keywords,
            content: content,
            typeID: ObjectJS.moduleTypes
        }, function (e) {
            if (e.status) {                                            
                alert("修改成功");
                window.location = "/Manage/HelpCenter/DetailList";
            } else {
                alert("修改失败");
            }
        });
    }
    
    ObjectJS.cateGoryDropDown = function (item,model,bl) {
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
                       ObjectJS.moduleTypes = data.value;
                    }
                }
            });
            if (bl) {
                $("#category_Down .dropdown-text").html("分类-" + model.Types.Name);
            }
        });

    }
        
    module.exports = ObjectJS;
});