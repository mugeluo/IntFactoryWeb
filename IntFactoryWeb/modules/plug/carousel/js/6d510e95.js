
$(document).ready(function () {
    $(".dg-next").click(function () {
        var a = $(this).closest(".dg-container"),
            //b = a.find(".previous2"),
            c = a.find(".previous1"),
            d = a.find(".dg-center"),
            e = a.find(".next1")
            //f = a.find(".next2");
        //b.removeClass("previous2").addClass("next2"),
        c.removeClass("previous1").addClass("next1"),
        d.removeClass("dg-center").addClass("previous1"),
        e.removeClass("next1").addClass("dg-center")
        //f.removeClass("next2").addClass("next1")
    }),
    $(".dg-prev").click(function () {
        var a = $(this).closest(".dg-container"),
            //b = a.find(".previous2"),
            c = a.find(".previous1"),
            d = a.find(".dg-center"),
            e = a.find(".next1")
            //f = a.find(".next2");
        //b.removeClass("previous2").addClass("previous1"),
        c.removeClass("previous1").addClass("dg-center"),
        d.removeClass("dg-center").addClass("next1"),
        e.removeClass("next1").addClass("previous1")
        //f.removeClass("next2").addClass("previous2")
    }),
    $(window).bind("scroll", function () {
        $(window).width() >= 768 ? $(".dg-container").each(function () {
            var a = $(document).scrollTop(), b = $(this).offset().top; a > b - $(window).height() / 2 && $(this).find(".dg-wrapper").removeClass("folded")
        }) : $(".dg-wrapper").removeClass("folded")
    }),
    $(".dg-wrapper").click(function () {
        var a = $(this).closest(".dg-container"), b = $(document).width(); 992 > b && a.find(".dg-next").trigger("click")
    }),
    $(".outbound").click(function () {
        var a = $(this).closest(".dg-container");
        $(this).hasClass("previous1") && a.find(".dg-prev").trigger("click"),
        $(this).hasClass("next1") && a.find(".dg-next").trigger("click")
    })
});