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
        
        $(".title").val(model.Title);
        $(".keywords").val(model.KeyWords);
        editor.ready(function () {
            editor.setContent(decodeURI(model.Content));
        });        
    };

    module.exports = ObjectJS;
});