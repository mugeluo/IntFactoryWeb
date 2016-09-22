define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"), editor,
        moment = require("moment"),
        Easydialog = require("easydialog");
    require("pager");
    require("daterangepicker");
    var Upload = require("upload");

    var ObjectJS = {};

    ObjectJS.isLoading = false;

    Params = {
        pageIndex: 1,
        PageSize: 20,
        type: -1,
        status: -1,
        BeginTime: '',
        EndTime: '',
        keyWords: '',
        OrderBy: "CreateTime desc"
    };

    ObjectJS.init = function (currentUser) {        
        if (currentUser != "") {
            currentUser = JSON.parse(currentUser.replace(/&quot;/g, '"'));
        };
        ObjectJS.bindEvent(currentUser);
    };

    ObjectJS.bindEvent = function (currentUser) {
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
            Params.pageIndex = 1;
            Params.BeginTime = start ? start.format("YYYY-MM-DD") : "";
            Params.EndTime = end ? end.format("YYYY-MM-DD") : "";
            ObjectJS.getFeedBack();
        });

        //排序
        $(".search-sort .sort-item").click(function () {
            if (!ObjectJS.isLoading) {
                return;
            }
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
            Params.pageIndex = 1;            
            ObjectJS.getFeedBack();
        });

        //关键字搜索
        require.async("search", function () {
            $(".searth-module").searchKeys(function (keyWords) {
                if (!ObjectJS.isLoading) {
                    return;
                }
                if (Params.Keywords!=keyWords) {
                    Params.pageIndex = 1;
                    Params.Keywords = keyWords;
                    ObjectJS.getFeedBack();
                }                
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
                    if (!ObjectJS.isLoading) {
                        return;
                    }
                    if (Params.status != data.value) {
                        $("#procesSing .dropdown-text").html("");
                        $("#procesSing .dropdown-text").html(data.text);
                        Params.status = data.value;
                        Params.pageIndex = 1;
                        ObjectJS.getFeedBack();
                    } else {
                        $("#procesSing .dropdown-text").html("");
                        $("#procesSing .dropdown-text").html(data.text);
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
                    if (!ObjectJS.isLoading) {
                        return;
                    }
                    if (Params.type != data.value) {
                        $("#status .dropdown-text").html("");
                        $("#status .dropdown-text").html(data.text);
                        Params.type = data.value;
                        Params.pageIndex = 1;
                        ObjectJS.getFeedBack();
                    } else {
                        $("#status .dropdown-text").html("");
                        $("#status .dropdown-text").html(data.text);
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
            if (id == "content-item") {
                if (currentUser=="") {
                    var confirmMsg = "登录后，您将查看您所反馈的内容?";
                    confirm(confirmMsg, function () {
                        window.location = '/Home/Login?feedback';
                    }, "立即登录", function () {
                        $(".content-feedback,.content-item").hide();
                        $("." + id).show();
                        ObjectJS.getFeedBack();
                    });
                } else {
                    $(".content-feedback,.content-item").hide();
                    $("." + id).show();
                    ObjectJS.getFeedBack();
                }                
            } else {
                $(".content-feedback,.content-item").hide();
                $(".content-feedback").show();
            }
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
            if ($(".txt-description").val().length >= 1000) {
                alert("问题描述请在1000个字符以内", 2);
                return false;
            }

            if ($(".txt-description").val()=='') {
                alert("具体问题不能为空");
                return;
            }

            var imgs = '';
            $("#feed-images li").each(function () {
                imgs += $(this).data("server") + $(this).data("filename") + ",";
            });
            var entity = {
                Title: "",
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

        var href = window.location.href.split("?");
        tag = href[href.length - 1];

        if (tag == "feedback") {
            $(".content span:last").click();
        }

    };

    ObjectJS.getFeedBack = function () {
        $(".tr-header").nextAll().remove();
        ObjectJS.isLoading = false;
        $(".tr-header").after("<tr><td colspan='6'><div class='data-loading'><div></td></tr>");
        Global.post("/FeedBack/GetFeedBacks", { filter: JSON.stringify(Params) }, function (data) {
            $(".tr-header").nextAll().remove();
            ObjectJS.isLoading = true;
            if (data.items.length > 0) {
                Dot.exec("/template/feedback/feedback-list.html", function (template) {
                    var innerHtml = template(data.items);
                    innerHtml = $(innerHtml);
                    $(".tr-header").after(innerHtml);

                    var isStatus=true;
                    $(".item td").click(function () {     
                        if (!isStatus) {
                            isStatus = true;
                            return;
                        }
                        var _this = $(this).parent().find(".open-contents"), _parent = $(this).parent(), id = _this.data("id");
                        if (_this.hasClass("tag")) {
                            isStatus = false;
                            _this.html("关闭").removeClass("tag");
                            _parent.find(".span").hide();
                            _parent.find(".div").show();
                            if (data.items[id].Content != "") {
                                _parent.next().show();
                            }
                        }
                    });
                    $(".item .open-contents").click(function () {
                        if (!isStatus) {
                            isStatus = true;
                            return;
                        }
                        var _parent = $(this).parent(), _this = $(this), id = _this.data("id");
                        if (!_this.hasClass("tag")) {                            
                            _this.html("展开").addClass("tag");
                            _parent.find(".span").show();
                            _parent.find(".div").hide();
                            if (data.items[id].Content != "") {
                                _parent.next().hide();
                            }
                        }
                    });
                });

                $("#pager").paginate({
                    total_count: data.totalCount,
                    count: data.pageCount,
                    start: Params.pageIndex,
                    display: 5,
                    border: true,
                    rotate: true,
                    images: false,
                    mouse: 'slide',
                    onChange: function (page) {                        
                        Params.pageIndex = page;
                        ObjectJS.getFeedBack();
                    }
                });
            } else {
                $(".tr-header").after("<tr><td colspan='5'><div class='nodata-txt'>暂无数据</div></td></tr>");
                $("#pager").hide();
                $(".table-list").addClass("mBottom60");
            }
        });
    }

    module.exports = ObjectJS;
});