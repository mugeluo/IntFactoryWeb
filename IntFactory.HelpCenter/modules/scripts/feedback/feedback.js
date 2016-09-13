define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"), editor,
        moment = require("moment"),
        Easydialog = require("easydialog");
    require("pager");
    require("daterangepicker");
    var Upload = require("upload");

    var ObjectJS = {};
    Params = {
        pageIndex: 1,
        PageSize: 10,
        type: -1,
        status: -1,
        BeginTime: '',
        EndTime: '',
        keyWords: '',
        OrderBy: "c.CreateTime desc",
        id: ''
    };

    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {
        //日期插件
        $("#iptCreateTime").daterangepicker({
            showDropdowns: true,
            empty: true,
            opens: "right",
            ranges: {
                '今天': [moment(), moment()],
                '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '上周': [moment().subtract(6, 'days'), moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')]
            }
        }, function (start, end, label) {
            Params.PageIndex = 1;
            Params.BeginTime = start ? start.format("YYYY-MM-DD") : "";
            Params.EndTime = end ? end.format("YYYY-MM-DD") : "";
            
        });

        //排序
        $(".sort-item").click(function () {
            var _this = $(this);
            var asc = true;
            if (_this.hasClass("hover")) {
                if (_this.find(".asc").hasClass("hover")) {
                    _this.find(".asc").removeClass("hover");
                    _this.find(".desc").addClass("hover");
                    asc = false;

                } else {
                    _this.find(".desc").removeClass("hover");
                    _this.find(".asc").addClass("hover");
                }
            } else {
                _this.addClass("hover").siblings().removeClass("hover");
                _this.siblings().find(".hover").removeClass("hover");
                _this.find(".desc").addClass("hover");
                asc = false;
            }
            Params.OrderBy = _this.data("column") + (asc ? " asc" : " desc ");
            Params.PageIndex = 1;
            
        });

        //关键字搜索
        require.async("search", function () {
            $(".searth-module").searchKeys(function (keyWords) {
                Params.PageIndex = 1;
                Params.Keywords = keyWords;
                //ObjectJS.getContentList();
            });
        });

        require.async("dropdown", function () {
            var orderTypes = [{ ID: "1", Name: "待处理" }, { ID: "2", Name: "已处理" }, { ID: "3", Name: "驳回" }, { ID: "9", Name: "已删除" }];
            $("#procesSing").dropdown({
                prevText: "处理情况-",
                defaultText: "全部",
                defaultValue: "-1",
                data: orderTypes,
                dataValue: "ID",
                dataText: "Name",
                width: "120",
                onChange: function (data) {
                    if (Paras.orderType != data.value) {
                        if (IsLoadding && IsLoaddingTwo) {
                            Params.type = data.value;
                            Params.pageIndex = 1;
                          
                        } else {
                            alert("数据加载中，请稍等 !");
                        }
                    }
                }
            });
        });

        require.async("dropdown", function () {
            var orderTypes = [{ ID: "1", Name: "问题" }, { ID: "2", Name: "建议" }, { ID: "3", Name: "需求" }];
            $("#status").dropdown({
                prevText: "反馈类型-",
                defaultText: "全部",
                defaultValue: "-1",
                data: orderTypes,
                dataValue: "ID",
                dataText: "Name",
                width: "120",
                onChange: function (data) {
                    if (Paras.orderType != data.value) {
                        if (IsLoadding && IsLoaddingTwo) {
                            Params.status = data.value;
                            Params.pageIndex = 1;

                        } else {
                            alert("数据加载中，请稍等 !");
                        }
                    }
                }
            });
        });

        $(".content span").click(function () {
            var _this = $(this),id=_this.data("id");
            if (!_this.hasClass("hover")) {
                _this.siblings().removeClass("hover");
                _this.addClass("hover");
            };
            $(".content-body,.content-item").hide();
            $("." + id).show();
        });

        var upload = Upload.uploader({
            browse_button: 'upload',
            file_path: "/Content/UploadFiles/M_FeedBack/",
            successItems: '#feed-images li',
            picture_container: 'feed-images',
            maxSize: 5,
            fileType: 1,
            multi_selection: false,
            init: {}
        });

        $("#btn-feedback").click(function () {
            var _this = $(this);
            if ($(".txt-title").val() == "") {
                alert("标题不能为空", 2);
                return false;
            }
            if ($(".txt-description").val().length >= 1000) {
                alert("问题描述请在1000个字符以内", 2);
                return false;
            }

            var imgs = '';
            $("#feed-images li").each(function () {
                imgs += $(this).data("server") + $(this).data("filename") + ",";
            });
            var entity = {
                Title: $(".txt-title").val(),
                ContactName: $(".txt-name").val(),
                MobilePhone: $(".txt-phone").val(),
                Type: $(".dropdown-list").val(),
                FilePath: imgs,
                Remark: $(".txt-description").val()
            };
            _this.val("提交中...");
            _this.attr("disabled", true);
            Global.post("/FeedBack/InsertFeedBack", { entity: JSON.stringify(entity) }, function (data) {
                _this.val("提交");
                _this.attr("disabled", false);

                if (data.Result == 1) {
                    alert("谢谢反馈");
                    setTimeout(function () { window.opener = null; window.open('', '_self'); window.close(); }, 1000);
                } else {
                    alert("反馈失败");
                }
            });
        });

        $(".open-contents").click(function () {
            var _parent = $(this).parent(), _this = $(this);
            if (_this.hasClass("tag")) {
                _this.html("关闭").removeClass("tag");
                _parent.find(".span").hide();
                _parent.find(".div").show();
            } else {
                _this.html("展开").addClass("tag");
                _parent.find(".span").show();
                _parent.find(".div").hide();
            }
            
        });

    };

    ObjectJS.getFeedBack = function () {
        Global.post("", { fliter: JSON.stringify(Params) }, function (data) {
            if (data.items.length>0) {

            }
        });
    }

    module.exports = ObjectJS;
});