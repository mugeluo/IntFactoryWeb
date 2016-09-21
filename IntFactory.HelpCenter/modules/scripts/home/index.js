define(function (require, exports, module) {
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
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
        ObjectJS.getTypes();
    };

    ObjectJS.bindEvent = function () {
        $(".table-switch li").click(function () {
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
                            Params.ModuleType = 2;
                            ObjectJS.getContents(_self.data("id"), _self,id);
                        });
                    }
                }
                if (id==2) {
                    if (!isget) {
                        target.data("isget", 1);
                        $("#zngc-functions ul").each(function () {
                            var _self = $(this);
                            Params.ModuleType = 1;
                            ObjectJS.getContents(_self.data("id"), _self,id);
                        });
                    }
                }
            };
        }); 
    };

    ObjectJS.getTypes = function () {
        Global.post("/Home/GetTypes", null, function (data) {
            var functionTypes=data.functionTypes;
            if (functionTypes.length > 0) {               

                var functionArray = [
                   { id: "3caf07ed-5de1-4829-869a-3c47c7b420a7", iconfont: "&#xe621;", name: "工作台", remark: "工作台功能及其特点描述" },
                   { id: "42c0bb53-07f1-43e7-857b-6ed589ec093f", iconfont: "&#xe61e;", name: "客户", remark: "客户功能及其特点描述" },
                   { id: "cfa08906-0b09-44e0-978d-b0abb48c6735", iconfont: "&#xe623;", name: "订单", remark: "订单功能及其特点描述" },
                   { id: "95088962-ec5d-4a3f-ae96-85827bee02e9", iconfont: "&#xe619;", name: "任务设置", remark: "任务设置功能及其特点描述" },
                   { id: "08673e32-d738-4730-8580-d17d49855f8e", iconfont: "&#xe626;", name: "材料", remark: "材料功能及其特点描述" },
                   { id: "e83b8979-4244-4f8a-bdfd-14bbe168b175", iconfont: "&#xe616;", name: "系统设置", remark: "系统设置功能及其特点描述" },
                   { id: "e7a834a0-405f-4c30-8a5e-ab600af1c07c", iconfont: "&#xe622;", name: "绑定账号", remark: "绑定账号功能及其特点描述" },
                   { id: "45daf2fc-3ffa-4fdf-8649-2128aa4ba333", iconfont: "&#xe61d;", name: "客户端", remark: "客户端功能及其特点描述" }
                ];

                for (var i = 0; i < 8; i++) {
                    var item = functionArray[i];
                    $(".function").append('<li ><a href="/Contents/Contents/' + item.id + '"><i class="iconfont">' + item.iconfont + '</i><div class="desc">' + item.name + '</div><div class="detail hide"><div class="txt mTop40">' + item.name + '</div><div class="txt">' + item.remark + '</div></div></a></li>');
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
                    $("#normal-problems ul").eq(i).data("id", item.TypeID).append("<li>" + item.Name + "</li>");
                }
            }

            var guidTypes = data.guidTypes;
            if (guidTypes.length > 0) {                
                for (var i = 0; i < guidTypes.length; i++) {
                    if (i>5) {
                        return;
                    }
                    var item = guidTypes[i];
                    $(".new-guide ul").append('<li><a href="/NewbieGuide/NewbieGuide?'+i+'"><img src="' + item.Icon + '" /><div class="bg-jianbian"></div><span class="txt">' + (i + 1) + '.' + item.Name + '</span></li></a>');
                }
            }
        });
    };

    ObjectJS.getContents = function (typeid, targetObject,id) {
        Params.TypeID = typeid;
        $(targetObject).append("<div class='data-loading' style='margin-left:-145px;'><div>");
        Global.post("/Home/getContents", { filter: JSON.stringify(Params) }, function (data) {
            $(".data-loading").remove();
            var items=data.items;
            var len=items.length;
            if (len > 0) {
                for(var i=0;i<len;i++){
                    var item = items[i];
                    if (id==1) {
                        $(targetObject).append("<li><a href='/Problems/ProblemsDetail/" + item.ContentID + "'>. " + item.Title + "</a></li>");
                    } else {
                        $(targetObject).append("<li><a href='/Contents/Contents/" + item.TypeID + "'>. " + item.Title + "</a></li>");
                    }                    
                }                
            }
        });
    };

    module.exports = ObjectJS;
});