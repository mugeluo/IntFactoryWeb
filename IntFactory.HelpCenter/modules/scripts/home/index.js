﻿define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),    
        Easydialog = require("easydialog");
    require("pager");
    
    var Params = {
        ModuleType: -1,
        TypeID: "",
        Keywords: "",
        BeginTime: "",
        EndTime: "",
        PageIndex: 1,
        PageSize: 5,
        OrderBy: "c.CreateTime desc",
    }
    var ObjectJS = {};

    ObjectJS.isLoading = true;
    ObjectJS.typesID=[];

    ObjectJS.init = function () {
        ObjectJS.bindEvent();
        ObjectJS.getTypes();
    };

    ObjectJS.bindEvent = function () {
        $(".table-switch li").click(function () {
            if (!ObjectJS.isLoading) {
                alert("数据正在加载中");
                return;
            }
            var _this = $(this),id=_this.data("id");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
                $(".problem-detail .problem-content").hide();
                var target = $(".problem-detail .problem-content").eq(id);
                target.show();
                var isget = target.data("isget");
                
                Params.OrderBy = "c.CreateTime desc";               

                if (id == 1) {
                    if (!isget) {
                        target.data("isget", 1);
                        $("#normal-problems ul").each(function () {                            
                            var _self = $(this);
                            ObjectJS.typesID.push({
                                typeid: _self.data("id"),
                                targetObject:_self
                            });                            
                        });
                        ObjectJS.getContents("", "", id);
                    }
                }
            };
        });                
        $("#hot-problems").find("ul").each(function () {
            $(this).find("li").eq(7).nextAll().remove();
        });
    };

    ObjectJS.getTypes = function () {
        ObjectJS.isLoading = false;
        Global.post("/Home/GetTypes", null, function (data) {
            ObjectJS.isLoading = true;
            var functionTypes=data.functionTypes;
            if (functionTypes.length > 0) {               

                var functionArray = [
                   { id: "1fba4255-8eaa-4823-baae-134add3dc05b", iconfont: "&#xe621;"},
                   { id: "42c0bb53-07f1-43e7-857b-6ed589ec093f", iconfont: "&#xe61e;"},
                   { id: "cfa08906-0b09-44e0-978d-b0abb48c6735", iconfont: "&#xe623;"},
                   { id: "95088962-ec5d-4a3f-ae96-85827bee02e9", iconfont: "&#xe619;"},
                   { id: "08673e32-d738-4730-8580-d17d49855f8e", iconfont: "&#xe626;"},
                   { id: "e83b8979-4244-4f8a-bdfd-14bbe168b175", iconfont: "&#xe616;"},
                   { id: "e7a834a0-405f-4c30-8a5e-ab600af1c07c", iconfont: "&#xe622;"},
                   { id: "45daf2fc-3ffa-4fdf-8649-2128aa4ba333", iconfont: "&#xe61d;"}
                ];

                for (var i = 0; i < 8; i++) {                    
                    var item = functionArray[i];
                    for (var j = 0; j < functionTypes.length; j++) {
                        var functionTypesItem = functionTypes[j];
                        if (item.id == functionTypesItem.TypeID) {
                            $(".function").append('<li ><a href="/Contents/Contents/' + item.id + '"><i class="iconfont">' + item.iconfont + '</i><div class="desc">' + functionTypesItem.Name + '</div><div class="detail hide"><div class="txt mTop40">' + functionTypesItem.Name + '</div><div class="txt">' + functionTypesItem.Remark + '</div></div></a></li>');
                        }
                    }                                      
                }             

                $(".function li").mouseenter(function () {
                    var _this = $(this);
                    _this.find(".detail").show();
                });
                $(".function li .detail").mouseleave(function () {
                    $(this).hide();
                });

                for (var i = 0; i < functionTypes.length; i++) {
                    var item = functionTypes[i];
                    $("#zngc-functions ul").eq(i).data("id", item.TypeID).append("<li>" + item.Name + "</li>");
                }
            }

            var qaTypes=data.qaTypes;
            if (qaTypes.length > 0) {
                for (var i = 0; i < qaTypes.length; i++) {
                    var item=qaTypes[i];
                    $("#normal-problems ul").eq(i).data("id", item.TypeID).append("<li class='long'>" + item.Name + "</li>");
                }
            }

            var guidTypes = data.guidTypes;
            if (guidTypes.length > 0) {                
                for (var i = 0; i < guidTypes.length; i++) {
                    if (i>5) {
                        return;
                    }                    
                    var item = guidTypes[i];
                    if (item.Icon == "" || item.Icon==null) {
                        item.Icon = "/modules/images/img-noimg.png";
                    }
                    $(".new-guide ul").append('<li><a href="/NewbieGuide/NewbieGuide/'+item.TypeID+'"><img src="' + item.Icon + '" /><div class="bg-jianbian"></div><span class="txt">' + (i + 1) + '.' + item.Name + '</span></li></a>');
                }
            }
        });
    };

    ObjectJS.getContents = function (typeid, targetObject, id) {
        Params.TypeID = typeid;
        if (id==1) {            
            Params.ModuleType = 2;
            Params.PageSize = 7;
            ObjectJS.isLoading = false;
            $(targetObject).append("<div class='data-loading' style='margin-left:-115px;'><div>");
            Global.post("/Home/getContents", { filter: JSON.stringify(Params) }, function (data) {
                $(".data-loading").remove();
                ObjectJS.isLoading = true;
                var items = data.items;
                var len = items.length;                
                if (len > 0) {                    
                    for (var i = 0; i < ObjectJS.typesID.length; i++) {
                        var typeItem = ObjectJS.typesID[i];                    
                        for (var j = 0; j < len; j++) {
                            var item = items[j];
                            if (typeItem.typeid ==item.TypeID ) {
                                $(typeItem.targetObject).append("<li class='long'><a href='/Problems/ProblemsDetail/" + item.ContentID + "'>. " + item.Title + "</a></li>");
                            }
                        }
                    }
                }
            });
        } else {            
            ObjectJS.isLoading = false;
            $(targetObject).append("<div class='data-loading' style='margin-left:-115px;'><div>");
            Global.post("/Home/getContents", { filter: JSON.stringify(Params) }, function (data) {
                $(".data-loading").remove();
                ObjectJS.isLoading = true;
                var items = data.items;
                var len = items.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        var item = items[i];
                        $(targetObject).append("<li class='long'><a href='/Contents/Contents/" + item.TypeID + "'>. " + item.Title + "</a></li>");
                    }
                }
            });
        }        
    };

    module.exports = ObjectJS;
});