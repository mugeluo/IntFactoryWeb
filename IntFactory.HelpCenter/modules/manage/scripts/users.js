define(function (require, exports, module) {
    var Global = require("global"),
        Dot = require("dot"),
        moment = require("moment"),
        Easydialog = require("easydialog");
    require("pager");
    require("daterangepicker");

    var ObjectJS = {};
    ObjectJS.init = function (navName) {
        ObjectJS.bindEvent(navName);        
    };

    ObjectJS.bindEvent = function (navName) {
        $(".controller .action-box .action").removeClass("select");
        $(".controller .action-box ." + navName).addClass("select");        
        if (navName == "userlist") {
            ObjectJS.getUsers();
        }

        $("#btnSave").click(function () {
            ObjectJS.saveUser();
        });
    };

    ObjectJS.getUsers = function () {
        Global.post("/Manage/System/GetUsers", {}, function (data) {
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
                                   $("#loginname").val(item.Account);
                                   $("#loginpass").val(item.Passwords);
                                   $("#name").val(item.UserName);
                                   $("#remark").val(item.Remark);
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