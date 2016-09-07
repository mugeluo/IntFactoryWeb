define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"), editor

    var ObjectJS = {};

    ObjectJS.init = function (Editor, model) {
        var _self = this;
        editor = Editor;
        model = JSON.parse(model.replace(/&quot;/g, '"'));
        ObjectJS.bindEvent(model);
    };

    ObjectJS.bindEvent = function (model) {
        $(".table-add option[data-id=" + model.TypeID + "]").attr("selected", "true");
        $(".title").val(model.Title);
        $(".sort").val(model.Sort);
        $(".keywords").val(model.KeyWords);
        editor.ready(function () {
            editor.setContent(decodeURI(model.Detail));
        });
        

        $(".update-details").click(function () {
            ObjectJS.updateContent(model.ContentID);
        });
    };

    ObjectJS.updateContent = function (id) {        
        var typeid = $(".table-add option:selected").data("id");
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
            typeID: typeid
        }, function (e) {
            if (e.status) {                                            
                alert("修改成功");
                window.location = "/Manage/HelpCenter/DetailList";
            } else {
                alert("修改失败");
            }
        });
    }

    module.exports = ObjectJS;
});