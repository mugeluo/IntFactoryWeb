function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name]
    }
    else {
        return getComputedStyle(obj, false)[name]
    }
}

function getByClass(oParent, nClass) {
    var eLe = oParent.getElementsByTagName('*');
    var aRrent = [];
    for (var i = 0; i < eLe.length; i++) {
        if (eLe[i].className == nClass) {
            aRrent.push(eLe[i]);
        }
    }
    return aRrent;
}

function startMove(obj, att, add) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
        var cutt = 0;
        if (att == 'opacity') {
            cutt = Math.round(parseFloat(getStyle(obj, att)));
        }
        else {
            cutt = Math.round(parseInt(getStyle(obj, att)));
        }
        var speed = (add - cutt) / 4;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (cutt == add) {
            clearInterval(obj.timer)
        }
        else {
            if (att == 'opacity') {
                obj.style.opacity = (cutt + speed) / 100;
                obj.style.filter = 'alpha(opacity:' + (cutt + speed) + ')';
            }
            else {
                obj.style[att] = cutt + speed + 'px';
            }
        }

    }, 30)
}

window.onload = function () {
    var oDiv = document.getElementById('playBox');
    var oPre = getByClass(oDiv, 'pre')[0];
    var oNext = getByClass(oDiv, 'next')[0];
    var oUlBig = getByClass(oDiv, 'oUlplay')[0];
    var aBigLi = oUlBig.getElementsByTagName('li');
    var oDivSmall = getByClass(oDiv, 'smalltitle')[0]
    var aLiSmall = oDivSmall.getElementsByTagName('li');

    function tab() {        
        for (var i = 0; i < aLiSmall.length; i++) {
            aLiSmall[i].className = '';
        }
        //if (now == 3) {
        //    now = 2;
        //}
        var _self = $(".smalltitle li").eq(now);
        var title = _self.data("title"),
            txt = _self.data("txt");            
        $(".title1").html(title);
        $(".txt").html(txt);
        
        var width = $(window).width();
        $(window).resize(function () {           
            startMove(oUlBig, 'left', -(now * $(window).width()))
        });

        aLiSmall[now].className = 'thistitle'
        startMove(oUlBig, 'left', -(now * width))
    }

    var now = 0;
    for (var i = 0; i < aLiSmall.length; i++) {        
        aLiSmall[i].index = i;
        aLiSmall[i].onclick = function () {
            now = this.index;          
            tab();
        }
    }
    oPre.onclick = function () {
        now--
        if (now == -1) {
            now = aBigLi.length-1;
        }
        tab();
    }
    oNext.onclick = function () {
        now++
        if (now == aBigLi.length) {
            now = 0;
        }
        tab();
    }
    var timer = setInterval(oNext.onclick, 500000) //滚动间隔时间设置
    oDiv.onmouseover = function () {
        clearInterval(timer)
    }
    oDiv.onmouseout = function () {
        timer = setInterval(oNext.onclick, 500000) //滚动间隔时间设置
    }
}


