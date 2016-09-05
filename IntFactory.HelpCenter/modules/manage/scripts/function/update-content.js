define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot");

    var ObjectJS = {};

    ObjectJS.init = function (model) {
        var _self = this;        
        model = JSON.parse(model.replace(/&quot;/g, '"'));
        ObjectJS.bindEvent(model);
    };

    ObjectJS.bindEvent = function (model) {        
        $(".table-add option[data-id=" + model.TypeID + "]").attr("selected", "true");
        $(".title").html(model.Title);
        $(".keywords").html(model.KeyWords);
        $("#remark").html(decodeURI(model.Content));
        

        $(".update-details").click(function () {
            ObjectJS.updateContent(model.HelpID);
        });
    };

    ObjectJS.updateContent = function (id) {
        var typeid = $(".table-add option:selected").data("id");
        var title = $(".title").val();
        var keywords = $(".keywords").val();
        var content = encodeURI(editor.getContent());
        Global.post("/Manage/Function/UpdateContent", { id:id,title: title,keyWords:keywords, content: content, typeID: typeid }, function (e) {
            if (e.status) {                                            
                alert("修改成功");
            } else {
                alert("修改失败");
            }
        });
    }

    module.exports = ObjectJS;
});