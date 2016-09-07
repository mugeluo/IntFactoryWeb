define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        moment = require("moment"),
        Easydialog = require("easydialog");
    require("pager");
    require("daterangepicker");

    var ObjectJS = {};

    var Params = {  
        Keywords: "",
        BeginTime: "",
        EndTime: "",
        PageIndex: 1,
        PageSize: 5,
        OrderBy: "Users.CreateTime desc",
    }

    ObjectJS.init = function (navName) {
        ObjectJS.bindEvent(navName);        
    };

    ObjectJS.bindEvent = function (navName) {
        $(".controller .action-box .action").removeClass("select");
        $(".controller .action-box ." + navName).addClass("select");        
        if (navName == "userlist") {
            ObjectJS.getUsers();
        }

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
            ObjectJS.getUsers();
        });

        //关键字搜索
        require.async("search", function () {
            $(".searth-module").searchKeys(function (keyWords) {
                Params.PageIndex = 1;
                Params.Keywords = keyWords;
                ObjectJS.getUsers();
            });
        });

        $("#btnSave").click(function () {
            ObjectJS.saveUser();
        });
    };

    ObjectJS.getUsers = function () {
        $(".tr-header").after("<tr><td colspan='15'><div class='data-loading'><div></td></tr>");
        Global.post("/Manage/System/GetUsers", { filter: JSON.stringify(Params) }, function (data) {
            $(".tr-header").nextAll().remove();
            if (data.items.length > 0) {
                $(".list-item").remove();
                Dot.exec("/Manage/template/system/userlist.html", function (e) {
                    var innerText = e(data.items);
                    innerText = $(innerText);
                    $(".users-list").append(innerText);

                    innerText.find(".update").click(function () {
                        var _this = $(this), userID = _this.data("id");
                        Dot.exec("/manage/template/system/update-users.html", function (template) {
                            var innerHt = template(data.items);
                            Easydialog.open({
                                container: {
                                    id: "show-model-detail",
                                    header: "编辑管理员信息",
                                    content: innerHt,
                                    yesFn: function () {
                                        var acc = $("#loginname").val();
                                        var pwd = $("#loginpass").val();
                                        var confirmPwd = $("#confirmpass").val();
                                        var name = $("#name").val();
                                        var remark = $("#remark").val();
                                        Global.post("/Manage/System/UpdateUsers",{
                                                userID: userID,
                                                acc: acc,
                                                pwd: pwd,
                                                name: name,
                                                remark: remark
                                        }, function (e) {
                                            if (e.status) {
                                                ObjectJS.getUsers();
                                            } else {
                                                alert("修改失败");
                                            }
                                        });
                                    },
                                    callback: function () {

                                    }
                                }
                            });                           

                            for (var i = 0; i < data.items.length; i++) {
                                var item = data.items[i];
                                if (item.UserID == userID) {
                                   $("#loginname").val(item.AccountName);
                                   $("#loginpass").val(item.Password);
                                   $("#name").val(item.Name);
                                   $("#remark").val(item.Remaek);
                                }
                            }                            
                        });
                    });

                    innerText.find(".delete").click(function () {
                        var _this = $(this);
                        var userID = _this.data("id");
                        var confirmMsg = "确定删除此分类?";
                        confirm(confirmMsg, function () {    
                            Global.post("/Manage/System/DeleteUsers", { userID: userID }, function (data) {
                                if (data.status) {
                                    _this.parent().parent().fadeOut(400, function () {
                                        _this.remove();
                                    });
                                } else {
                                    alert("删除失败");
                                }
                            })
                        });
                    });
                });

                $("#pager").paginate({
                    total_count: data.totalCount,
                    count: data.pageCount,
                    start: Params.PageIndex,
                    display: 5,
                    border: true,
                    border_color: '#fff',
                    text_color: '#333',
                    background_color: '#fff',
                    border_hover_color: '#ccc',
                    text_hover_color: '#000',
                    background_hover_color: '#efefef',
                    rotate: true,
                    images: false,
                    mouse: 'slide',
                    onChange: function (page) {
                        Params.PageIndex = page;
                        ObjectJS.getUsers();
                    }
                });
            } else {
                $(".users-list").append("<tr class='list-item' style='height:100px;'><td class='center font16' colspan='3'>暂无数据<td></tr>");
            }
        })
    };

    ObjectJS.saveUser = function () {
        var acc = $("#loginname").val();
        var pwd = $("#loginpass").val();
        var confirmPwd = $("#confirmpass").val();
        var name = $("#name").val();
        var remark = $("#remark").val();
        if (acc==""||pwd==""||confirmPwd==""||name==""||remark=="") {
            alert("内容不能为空");
            return;
        }
        if (pwd!=confirmPwd) {
            alert("两次输入密码不同");
            return;
        }
        Global.post("/Manage/System/SaveUser", { acc: acc,pwd:pwd,name:name,remark:remark }, function (data) {
            if (data.status==1) {
                alert("添加成功");
                window.location = "/Manage/System/Users";
            } else if (data.status == 0) {
                alert("网络波动，请重试");
            } else {
                alert("姓名已存在");
            }
        });
    };

    module.exports = ObjectJS;
})