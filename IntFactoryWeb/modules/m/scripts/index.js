define(function (require, exports, module) {

    var ObjectJS = {};

    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {

        var arrInfomation = [{ text: "客户、订单、材料、供应商等数据直接录入平台，安全存储，随时随地查看" }, { text: "按照品类自定义生产流程和排期，所有订单生产流程进度和状态一目了然" }, { text: "根据订单以及任务的交付日期，系统提前自动做出预警提醒，确保订单和任务按时按质按量完成" }];

        var arrTask = [{ text: "订单开始后任务自动派发，任务负责人可灵活选择参与人员，自由讨论，降低沟通成本，提高生产效率" }, { text: " 通过平台进行跨工厂协作，订单一键委托，实时查看生产进度" }];

        var arrResource = [{ text: "平台入驻优质材料供应商，解决找材料费时费力等难题，降低材料采购成本" }, { text: "工厂之间共享客户资源，让淡季不再淡，旺季不再忙，实现利润最大化" }, { text: "为有自主研发能力的工厂提供样衣中心，方便客户选款拼单" }];

        $(".infomation .list ul li").click(function () {
            ObjectJS.bindItemClick(this, $(".infomation .img img"), arrInfomation, ".infomation .des");
        });

        $(".task .list ul li").click(function () {
            ObjectJS.bindItemClick(this, $(".task .img img"), arrTask, ".task .des");
        });

        $(".resource .list ul li").click(function () {
            ObjectJS.bindItemClick(this, $(".resource .img img"), arrResource, ".resource .des");
        });

        setTimeout(function () {
            $(".img-load").each(function () {
                $(this).attr("src", $(this).data("src"));
            })
        }, 1000);
    };

    ObjectJS.bindItemClick = function (obj, document, arr, txtDocument) {        
        var url = $(obj).data("img"),id=$(obj).data("id");
        if (document.attr("src") != url) {
            document.fadeOut(function () {
                $(this).fadeIn().attr("src", url);
            })
        }
        if (!$(obj).hasClass("hover")) {
            $(obj).addClass("hover").siblings().removeClass("hover");
        }        
        $(obj).parent().parent().parent().find(".des").fadeOut(function () {
            $(txtDocument).fadeIn().html(arr[id].text);
        });        
    };

    module.exports = ObjectJS;
});