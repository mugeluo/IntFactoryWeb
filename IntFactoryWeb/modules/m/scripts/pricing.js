define(function (require, exports, module) {

    var ObjectJS = {};

    ObjectJS.init = function () {
        ObjectJS.bindEvent();
    };

    ObjectJS.bindEvent = function () {

        var money = [{ money1: "￥2,400", money2: "￥4,800", money3: "￥9,200", money4: "￥21,600", money5: "￥39,600" }, { money1: "￥4,800", money2: "￥8,400", money3: "￥16,400", money4: "￥38,400", money5: "￥71,200" }, { money1: "￥7,200", money2: "￥10,200", money3: "￥21,600", money4: "￥51,200", money5: "￥93,600" }]

        $(".price-list .time-selected li").click(function () {
            var _this = $(this), id = _this.data("type");
            if (!_this.hasClass("hover")) {
                $(".price-list .time-selected li").removeClass("hover");
                _this.addClass("hover");
            }
            $(".price-list table .money1").html(money[id].money1);
            $(".price-list table .money2").html(money[id].money2);
            $(".price-list table .money3").html(money[id].money3);
            $(".price-list table .money4").html(money[id].money4);
            $(".price-list table .money5").html(money[id].money5);
        });
        
    };

    module.exports = ObjectJS;
});