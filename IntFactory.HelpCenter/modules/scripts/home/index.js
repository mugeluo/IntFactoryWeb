﻿define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),    
        Easydialog = require("easydialog");
    require("pager");
    
    var Params = {
        Types: -1,
        TypeID: "",
        Keywords: "",
        BeginTime: "",
        EndTime: "",
        PageIndex: 1,
        PageSize: 5,
        OrderBy: "c.CreateTime desc",
    }
    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
        ObjectJS.getTypes();
        //ObjectJS.getTypesByModuleType(3);
    };

    ObjectJS.bindEvent = function () {

        $(".table-switch li").click(function () {
            var _this = $(this),id=_this.data("id");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
            };
            $(".problem-detail .problem-content").hide();
            $(".problem-detail .problem-content").eq(id).show();
        });

        
    };

    ObjectJS.getTypesByModuleType = function (moduleType) {
        Global.post("/Home/GetTypesByModuleType", { type: moduleType }, function (data) {
            if (data.items.length > 0) {
                //if (moduleType == 1) {
                //    Dot.exec("/template/home/function-types.html", function (template) {
                //        var innerHtml = template(data.items);
                //        innerHtml = $(innerHtml);
                //        $(".function").append(innerHtml);

                //        $(".function li").mouseenter(function () {
                //            var _this = $(this);
                //            _this.find(".detail").show();
                //        });

                //        $(".function li .detail").mouseleave(function () {
                //            $(this).hide();
                //        });
                //    });
                //} else if (moduleType == 2) {

                //}
            }
        });
    };

    ObjectJS.getTypes = function () {
        Global.post("/Home/GetTypes", null, function (data) {
            var functionTypes=data.functionTypes;
            if (functionTypes.length > 0) {
                Dot.exec("/template/home/function-types.html", function (template) {
                    var innerHtml = template(functionTypes);
                    innerHtml = $(innerHtml);
                    $(".function").append(innerHtml);

                    $(".function li").mouseenter(function () {
                        var _this = $(this);
                        _this.find(".detail").show();
                    });
                    $(".function li .detail").mouseleave(function () {
                        $(this).hide();
                    });
                });
            }

            var qaTypes=data.qaTypes;
            if (qaTypes.length > 0) {
                for (var i = 0; i < qaTypes.length; i++) {
                    var item=qaTypes[i];
                    $(".problem-content ul").eq(i).append("<li>" + item.Name + "</li>");

                    ObjectJS.getContents(item.TypeID, $(".problem-content ul").eq(i) );
                }
            }

            var guidTypes = data.guidTypes;
            if(guidTypes.length>0){
                for (var i = 0; i < guidTypes.length; i++) {
                    var item = guidTypes[i];
                    $(".new-guide ul").append('<li><img src="/modules/images/home/1.png" /><div class="bg-jianbian"></div><span class="txt">'+(i+1)+'.'+item.Name+'</span></li>');
                }
            }
        });
    };

    ObjectJS.getContents = function (typeid, targetObject) {
        Params.TypeID = typeid;
        Global.post("/Home/getContents", { filter: JSON.stringify(Params) }, function (data) {
            var items=data.items;
            var len=items.length;
            if (len > 0) {
                for(var i=0;i<len;i++){
                    var item=items[i];
                    $(targetObject).append("<li><a href='#'>. "+item.Title+"</a></li>");
                }
                
            }
        });
    };

    module.exports = ObjectJS;
});