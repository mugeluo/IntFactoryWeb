define(function (require, exports, module) {
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
    ObjectJS.init = function (list) {
        list = JSON.parse(list.replace(/&quot;/g, '"'));
        ObjectJS.bindEvent(list);
    };

    ObjectJS.bindEvent = function (list) {
        console.log(list);
        Dot.exec("/template/newbieguide/newbieguide.html", function (template) {
            var innerHtml = template(list);
            innerHtml = $(innerHtml);
            $(".smallPicUlBox ul").append(innerHtml);
            $(".smallPicUlBox ul li:first").addClass("current");

            $(document).ready(function () {
                //定义好变量
                //大图片uL
                var
                ulMove = $('.bigPicBox ul').eq(0),
                ulSMove = $('.smallPicUlBox ul').eq(0),
                bigImgLi = $('.bigPicBox ul li'),
                liNum = bigImgLi.length,
                liWidth = 1000,
                smallLiWidth = ulSMove.find("li").width(),
                imgTitle = $('.imgTitle');

                //设置大图片ul的宽度
                $('.bigPicBox ul').css({ width: $('.smallPicUlBox ul li').length + '00%' });
                imgTitle.html($('.smallPicUlBox ul li:first').find('.desc').html());

                var
                nextBtn = $('.nextABox'),//大图片下一张按钮
                prevBtn = $('.prevABox'),//大图片上一张按钮
                nextSBtn = $('.smallNextBtn'),//小图片下一张按钮
                prevSBtn = $('.smallPrevBtn'),//小图片上一张按钮
                initCount = 0,//设置一个初始化数字    
                offsetDiv = $('.smallPicUlBox').offset().left,//得到小图片ul盒子的offset值
                liLength = $('.smallPicUlBox ul li').length;//得到小图片li的个数

                $(".prevBtn,.nextBtn").hover(function () {
                    $(this).find("i").show();
                }, function () {
                    $(this).find("i").hide();
                });

                $(".prevBtn i,.nextBtn i").mouseleave(function () {
                    $(this).hide();
                })


                //小图片ul盒子移动函数
                var moveSmallPic = function () {
                    
                    //删除所有小图片选中样式
                    $('.smallPicUlBox ul li').removeClass("current")
                    //当前被点击的小图片添加选中样式
                    $('.smallPicUlBox ul li').eq(initCount).addClass("current");
                    //得到当前被选中小图片li的offset值
                    var currentOffsetLiB = $('.smallPicUlBox ul li.current').offset().left;
                    //被选中的小图片是可见box中的最后一张也就是小图片第六张
                    if (currentOffsetLiB - offsetDiv == 856) {
                        if (liLength - initCount > 3) {
                            ulSMove.stop().animate({ left: ulSMove.position().left - 399 }, 300);
                        } else {
                            ulSMove.stop().animate({ left: ('-' + smallLiWidth * (liLength - 6)) }, 300);
                        }
                    }
                    else if (initCount == 0) {
                        ulSMove.find("li:first").addClass("current");
                        ulSMove.stop().animate({ left: 0 }, 300);
                    }
                    else if (currentOffsetLiB - offsetDiv == 0) {
                        if (liLength - initCount < 8) {//$('.smallPicUlBox ul li.current').index()
                            ulSMove.stop().animate({ left: ulSMove.position().left + 399 }, 300);
                        } else {
                            ulSMove.stop().animate({ left: 0 }, 300);
                        }
                    }
                    else if (initCount == liLength - 1) {
                        ulSMove.find("li:last").addClass("current");
                        ulSMove.stop().animate({ left: ('-' + smallLiWidth * (liLength - 6)) }, 300);
                    }
                }

                //查看下一张图片函数
                var nextPicShow = function () {
                    initCount++;
                    if (initCount <= liNum - 1) {
                        ulMove.stop().animate({ left: ('-' + liWidth * initCount) }, 300);
                        moveSmallPic();
                    } else {
                        ulMove.stop().animate({ left: 0 }, 300);
                        initCount = 0;
                        moveSmallPic();
                    }
                    imgTitle.html($('.smallPicUlBox ul li').eq(initCount).find('.desc').html());
                }

                //点击大图片下一张按钮执行函数
                nextBtn.click(function (event) {
                    event.preventDefault();
                    nextPicShow();
                });

                //点击小图片下一张按钮执行函数
                nextSBtn.click(function (event) {
                    event.preventDefault();
                    nextPicShow();
                });

                //查看上一张图片函数
                var prevPicShow = function () {                    
                    if (initCount == 0) {
                        ulMove.stop().animate({ left: '-' + liWidth * (liNum - 1) }, 300);
                        initCount = liNum - 1;
                        moveSmallPic();
                    } else {
                        ulMove.stop().animate({ left: '-' + liWidth * (initCount - 1) }, 300);
                        initCount--;
                        moveSmallPic();
                    }
                    imgTitle.html($('.smallPicUlBox ul li').eq(initCount).find('.desc').html());
                };

                //点击大图片上一张按钮执行函数
                prevBtn.click(function (event) {
                    event.preventDefault();
                    prevPicShow();
                });

                //点击小图片上一张按钮执行函数
                prevSBtn.click(function (event) {
                    event.preventDefault();
                    prevPicShow();
                });


                //键盘左右方向键事件
                document.onkeydown = function (ev) {
                    var
                    oEvent = ev || event,
                    oDiv = document.getElementById('div1');
                    //左 37
                    //右 39
                    if (oEvent.keyCode == 37) {
                        prevPicShow();
                    }
                    else if (oEvent.keyCode == 39) {
                        nextPicShow();
                    }
                };

                //遍历每一张小图片
                ulSMove.find("li").each(function (i) {
                    $(this).attr('index', i);
                    $(this).click(function () {                        
                        imgTitle.html($(this).find('.desc').html());
                        ulSMove.find("li").removeClass("current");
                        $(this).addClass("current");
                        ulMove.stop().animate({ left: ('-' + liWidth * $(this).index()) }, 300);
                        initCount = $(this).index();
                        var currentOffsetLi = $(this).offset().left;
                        //计算点击的是否为最后一张或者可视box的最后一张图片
                        if (currentOffsetLi - offsetDiv == 399) {
                            if ($(this).index() == liLength - 1) {
                                alert('亲，这是最后一张了哦!');
                                //window.location.href='URL'; 此处用来跳转到下一组图片集
                            } else {
                                ulSMove.stop().animate({ left: ulSMove.position().left - 399 }, 300);
                            }
                        }
                            //计算点击的是否为第一张或者当前可视box的第一张图片
                        else if (currentOffsetLi - offsetDiv == 0) {
                            if ($(this).index() == 0) {
                                alert('亲，这是第一张了哦!');
                                //window.location.href='URL'; 此处用来跳转到上一组图片集
                            } else {
                                ulSMove.stop().animate({ left: ulSMove.position().left + 399 }, 300);
                            }
                        }
                    });
                });
            });
        });
    };

    module.exports = ObjectJS;
});