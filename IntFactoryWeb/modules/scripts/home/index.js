define(function (require,exports,module) {
    var ObjectJS = {};
    ObjectJS.init = function () {
        ObjectJS.bindEvent();
        ObjectJS.getWidthSize();
    }

    ObjectJS.bindEvent = function () {        

        $(window).resize(function(){
            ObjectJS.getWidthSize();
        });        

        var array = [{ ask: "问：数据安全性和平台稳定性如何保障？<div class='ask-line'></div>", answer: "<div>第一，我们尽最大努力从技术角度保障客户数据的安全，定期对客户数据进行安全备份。</div><div>第二，我们购买的是阿里巴巴聚石塔服务器，阿里巴巴会为我们的服务器提供坚固的网络防护层。</div><div>第三，用户所有附件都上传至第三方服务器（七牛云存储），由第三方保障我们的附件安全。</div>" }, { ask: "问：智能工厂解决了企业哪些问题？<div class='ask-line'></div>", answer: "<div>答：第一，智能工厂提供CRM（客户管理）</div><div>第二，智能工厂还提供进销存管理</div><div>第三，智能工厂同时也提供了会员管理</div><div>一个应用解决了企业运营管理需求，实现企业多元化发展战略</div>" }, { ask: "问：使用智能工厂有哪些好处？<div class='ask-line'></div>", answer: "<div>答：第一，企业无需花费高额的研发费用定制软件，只需支出少量成本即可享受功能全面的智能工厂</div><div>第二，无需安装客户端，任何能网络良好的环境下都可登录智能工厂，实时查看和使用</div><div>第三，智能工厂还提供移动app，手机也能使用智能工厂</div>" }, { ask: "问：客户管理不便捷，用五当家怎么处理？<div class='ask-line'></div>", answer: "<div>答：可以使用五当家的CRM模块来管理客户信息，自定义客户阶段，随时随地处理跟进</div>" }];

        $(".sove-img div").click(function () {
            var _this = $(this), id = _this.data("id");
            if (!_this.hasClass("hover")) {
                $(".sove-img div").removeClass("hover");
                _this.addClass("hover");
            };
            var txt = array[id];
            $(".ask").html(txt.ask);
            $(".answer").html(txt.answer);
        });

        $(".dg-wrapper .outbound").click(function () {
            var _this = $(this);
            ObjectJS.clickBind($(".customer-details li").eq(_this.data("index")));
        });

        $(".customer-details li").hover(function () {
            var _self = $(this);
            $(".dg-wrapper .outbound").eq(_self.data("index")).click();
            ObjectJS.clickBind(this);
        });

        $(".repertory-details li").hover(function () {            
            var _this = $(this), url = _this.data("url");
            if ($(".jxc-img img").attr("src") != url) {
                $(".jxc-img img").fadeOut(500,function () {
                    $(this).fadeIn().attr("src", url);
                })
            }           
            ObjectJS.clickBind(this);
        });

        $(".agent-details li").hover(function () {
            var _this = $(this), url = _this.data("url");
            if ($(".agent-img img").attr("src")!=url) {
                $(".agent-img img").fadeOut(500,function () {
                    $(this).fadeIn().attr("src", url);
                })
            }            
            ObjectJS.clickBind(this);
        });
        
        $(".applicable-industry img").hover(function () {
            var _this = $(this).parent();            
            _this.find("div:first").hide();
            _this.find("div:last").parent().fadeIn();                          
        });

        $(".education-floating,.garment-floating").mouseleave(function () {
            $(".education,.garment").show();
            $(".education-floating,.garment-floating").fadeOut();
        });

        $(".sove-img div:first").click();
    }

    ObjectJS.clickBind = function (thisclick) {        
        if (!$(thisclick).hasClass("hover")) {
            $(thisclick).addClass("hover").siblings().removeClass("hover");
        }                
    }

    ObjectJS.getWidthSize = function () {        
        $("#playBox").height($(window).height());
        $(".imm img").height($(window).height());
        $("#playBox .oUlplay li img").height($(window).height());
        $("#playBox .oUlplay li").width($(window).width());       
        
        $(".customer-bevel").css("border-left", ""+$(window).width()+"px solid #008DDD");
        $(".repertory-bevel-down").css("border-right", "" + $(window).width() + "px solid #F0EFEE");
    }

    module.exports = ObjectJS;
})