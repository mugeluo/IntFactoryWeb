define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot");
    var ObjectJS = {};

    ObjectJS.init = function (Editor, model) {
        var _self = this;        
        model = JSON.parse(model.replace(/&quot;/g, '"'));
        ObjectJS.bindEvent(model);
    };

    ObjectJS.bindEvent = function (model) {
        console.log(model)
        $(".title").html(model.Title);
        $(".sort").html(model.Sort==""?"--":model.Sort);
        $(".keywords").html(model.KeyWords);
        $("#remark").html(decodeURI(model.Detail));
    };

    module.exports = ObjectJS;
});