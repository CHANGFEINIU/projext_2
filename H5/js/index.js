window.addEventListener('load', function() {

    //获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.querySelector('ol');
    //获取focus的宽度
    var w = focus.offsetWidth;
    //2.利用定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';

    }, 2000);
    //等过渡完成的时候，再去判断完成的事件 transitionend
    ul.addEventListener('transitionend', function() {
        if (index >= 3) {
            index = 0;
            //去掉过渡效果，这样让我们的ul快速跳到目标位置
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            //去掉过渡效果，这样让我们的ul快速跳到目标位置
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        //小圆点变化
        //先把ol里面的li带有current的类名的选出来并去掉
        ol.querySelector('.current').classList.remove('current');
        //让当前的索引号的li叫上current类名
        ol.children[index].classList.add('current');
    });
    //手指滑动轮播图
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        // 停止定时器
        clearInterval(timer);
    });
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        //移动盒子：盒子原来的位置+手指移动的距离
        var translatex = -index * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        e.preventDefault();
    });
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            //若移动距离大于50px，就播放上一张和下一张
            if (Math.abs(moveX) > 50) {
                //如果是右滑moveX为正值
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
                //如果是左滑moveX为负值
            } else {
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        // 重开定时器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';

        }, 2000);
    })

    //返回顶部模块的制作
    var goBack = document.querySelector('.goback');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (this.window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function() {
        // 跳到0，0位置
        window.scroll(0, 0);
    })
})