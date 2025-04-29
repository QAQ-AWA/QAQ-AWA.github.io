// rightMenu.js

// == 基本右键菜单显示隐藏逻辑 ==
var rm = {};
rm.showRightMenu = function (isTrue, x = 0, y = 0) {
    let $rightMenu = $('#rightMenu');
    // 注意：CSS的left对应X坐标，top对应Y坐标
    $rightMenu.css('top', y + 'px').css('left', x + 'px');

    if (isTrue) {
        stopMaskScroll();
        $rightMenu.show();
    } else {
        $rightMenu.hide();
    }
};

let rmWidth = $('#rightMenu').width();
let rmHeight = $('#rightMenu').height();
rm.reloadrmSize = function () {
    rmWidth = $("#rightMenu").width();
    rmHeight = $("#rightMenu").height();
};

// 在鼠标右键点击时显示菜单
window.oncontextmenu = function (event) {
    // 仅在桌面视图 (> 768px) 显示
    if (document.body.clientWidth > 768) {
        let pageX = event.clientX + 10;
        let pageY = event.clientY;

        // 刷新菜单尺寸
        rm.reloadrmSize();

        // 确保菜单不会超出窗口边界
        if (pageX + rmWidth > window.innerWidth) {
            pageX -= rmWidth;
        }
        if (pageY + rmHeight > window.innerHeight) {
            pageY -= rmHeight;
        }

        rm.showRightMenu(true, pageX, pageY);
        $('#rightmenu-mask').attr('style', 'display: flex'); // 显示遮罩
        return false; // 阻止默认的右键菜单
    }
};

// 隐藏右键菜单和遮罩
function removeRightMenu() {
    rm.showRightMenu(false);
    $('#rightmenu-mask').attr('style', 'display: none');
}

// 阻止在遮罩和菜单上滚动时触发隐藏
function stopMaskScroll() {
    if (document.getElementById("rightmenu-mask")) {
        document.getElementById("rightmenu-mask").addEventListener("mousewheel", function (e) {
            removeRightMenu();
        }, false);
    }
    if (document.getElementById("rightMenu")) {
        document.getElementById("rightMenu").addEventListener("mousewheel", function (e) {
            removeRightMenu();
        }, false);
    }
}


// ================================================================
// 保留不依赖主题全局变量且工作正常的事件监听器
// ================================================================

// 基础导航功能
$('#menu-backward').on('click', function () { window.history.back(); });
$('#menu-forward').on('click', function () { window.history.forward(); });
$('#menu-refresh').on('click', function () { window.location.reload(); });
$('#menu-home').on('click', function () { window.location.href = window.location.origin; });

// 关闭菜单功能 (应用于所有 .menu-link, rightmenu-mask)
$(".menu-link").on("click", function () {
    removeRightMenu();
});
$("#rightmenu-mask").on("click", function () {
    removeRightMenu();
});
$("#rightmenu-mask").contextmenu(function () {
    removeRightMenu();
    return false; // 阻止遮罩层的默认右键菜单
});

// 移除了：随机文章、繁简切换、切换模式、打印页面的相关代码和监听器
// 这些功能依赖主题全局变量或额外实现，根据你的反馈目前有问题