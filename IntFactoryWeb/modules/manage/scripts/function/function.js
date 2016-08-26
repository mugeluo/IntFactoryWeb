define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot");

    var ObjectJS = {};
    ObjectJS.type = 0;
    ObjectJS.init = function (navName) {
        ObjectJS.bindEvent(navName);
        ObjectJS.getTypeList();
    };

    ObjectJS.bindEvent = function (navName) {
        
        $(".controller .action-box .action").removeClass("select");
        $(".controller .action-box ." + navName).addClass("select")

        $(".selector li i").click(function () {
            var _this = $(this), id = _this.data("id");
            if (!_this.hasClass("hover")) {
                $(".selector li i").removeClass("hover")
                _this.addClass("hover");
                ObjectJS.type = id;
            }
        });

        $(".add-category").click(function () {
            var txt = $(".name").val();
            if (txt=="") {
                alert("分类不能为空");
                return;
            }
            Global.post("/Manage/Function/InsertType", { Name: txt, Types: ObjectJS.type}, function (data) {
                if (data.status) {
                    alert("添加成功");
                } else {
                    alert("添加失败");
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
                if (data.status) {
                    alert("添加成功");
                } else {
                    alert("添加失败");
                }
            })
        });
        
        
    };

    ObjectJS.getTypeList = function () {
        Global.post("/Manage/Function/GetTypes", {}, function (data) {
            if (data.items.length > 0) {
                Dot.exec("/manage/template/type/type-list.html", function (template) {
                    var innerHtml = template(data.items);
                    $(".category").append(innerHtml);
                })
            }
        })
    }

    module.exports = ObjectJS;
})