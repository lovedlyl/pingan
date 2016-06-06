//     Zepto.js dropdown.js plugin
//     (c) 2016-05-31 (c) 2016-05-31 claudio lovedllyl@gmail.com
//     Zepto.js may be freely distributed under the MIT license.
// 实现：点击按钮，弹框向上弹出，底部刚好处于页面底部
//      点击.clode按钮隐藏，不做选择
//    点击.finished按钮隐藏，同时将高亮的元素在列表ul中显示
// 样式依赖：
// .dropdown 绝对定位定位，相对于body元素，top值足够大，隐藏在页面下方
//  背景色为白色，z-index足够大，处于顶层显示
/*使用方法：<button data-toggle="dropdown"></button>
 */
// 没有处理如果弹框为显示状态，旋转屏幕的情况 
// html结构依赖 data-toggle属性， 和data-src属性（select标签）
// select(disabled data-toggle="dropdown" data-src="true")#cardType
// option(value=0 selected) 借记卡/信用卡
// option(value=1) 一账通卡
// button(data-toggle="dropdown").icon &rsaquo;
;
(function($) {
    var selector = "[data-toggle=dropdown]";
    // 判断横屏还是竖屏：没考虑
    // var orientation=(window.innerWidth > window.innerHeight)? "landscape" : "portrait";
    // 对各列表选择高亮，elem 列表，i高亮索引
    var winH = $(window).height();
    // 添加列表后才计算
    var dropdownH;
    var lightUl = function(elem, i) {
        elem.children("li").removeClass("on").eq(i).addClass("on");
        // 重新验证
    };
    // 高亮select标签中对因的索引
    var lightSelect = function(elem, i) {
        // console.log(elem.text(), i);
        elem.val(i);
    };
    // 显示弹框
    var showDropdown = function() {
        // 必须遮挡住的元素选择器，默认遮盖表单提交按钮
        var mock = $("form input[type=submit], form .submit, form #submit");
        // 底部需留下的间隙,默认20px
        var space = 20;
        var top = winH - dropdownH - space;
        // 如果没遮住提交按钮，一定要遮住提交按钮
        if (mock.length > 0) {
            var mockTop = $(mock).offset().top;
            // console.log(top, mockTop);
            if (top > mockTop) {
                top = mockTop - 4;
            }
        }

        dropdown.animate({ "top": top + "px" }, 200, "ease");
    };
    // 隐藏弹框
    var hideDropdown = function() {
        dropdown.animate({ "top": dropdownTop }, 200, "ease-out");
    };
    // 将表单中的列表项目克隆到下拉列表
    var addChoose = function(elem) {
        // console.log("add....");
        var elem = $(elem);
        // 如果是点击的选择框
        if (elem.data('src')) {
            select = elem;
        } else {
            // 如果是点击的图标
            select = elem.siblings('[data-src]');
            // console.log(select);
            if (select.length == 0) {
                return false;
            }
        }

        // console.log(elem);
        // console.log(this);
        // console.log(list);
        var p = select.attr("id");
        var i = 1;
        // 初始化下拉列表，清空，记忆来源，以及下拉列表中高亮的li元素索引，默认为1
        choose.empty().attr({
            p: "#" + p,
            i: i
        });
        // 向下拉列表添加内容
        var tmp = "";
        select
            .children('option')
            .each(function(index, option) {
                var text = $(option).text();
                if (index == i) {
                    tmp += "<li class='on'>" + text + "</li>";
                } else {
                    tmp += "<li>" + text + "</li>";
                }
            });
        choose.html(tmp);
        // 高亮默认索引列表项目
        dropdownH = dropdown.height();
        // console.log(dropdownH);
        // 显示弹框
        showDropdown();
    }

    // 下拉列表上面上滑和下滑时，列表项目的行为
    var swipeUp = function(e) {
        e.preventDefault();
        // 上滑是改变高亮索引
        var i = choose.attr("i");
        i--;
        if (i <= 0) {
            i = 0;
        }
        choose.attr("i", i);
        lightUl(choose, i);
    };

    var swipeDown = function(e) {
        e.preventDefault();
        var items = choose.children('li');
        // 上滑是改变高亮索引
        var i = choose.attr("i");
        i++;
        if (i >= items.length - 1) {
            i = items.length - 1;
        }
        choose.attr("i", i);
        lightUl(choose, i)
    };


    // 确定选择，改变表单中的对应显示
    var select = function() {
        // 显示错误提示信息的位置
        // 获取下拉菜单来自表单中的哪个下拉选项
        var p = $(choose.attr("p"));
        // 对应select标签高亮索引
        var i = choose.attr("i");
        lightSelect(p, i);
        // console.log(choose.attr("p") == "idType", i);
        // 耦合型太强××××
        // 改变证件类型对应的身份证 data属性
        if (choose.attr("p") === "#idType" && i === 0) {
            $("#idNo").data("validate", "idNo");
        } else {
            $("#idNo").data("validate", "No");
        }
        $("#idNo").removeClass("valid dirty invalid").addClass("empty")
            .val("")
            .data("validate-success", "")
            .data("validate-fail", "");
        hideDropdown();

    };


    // 寻找有data-toggle="dropdown"属性的元素
    // 如果有，添加文档添加html元素，并添加事件
    var btns = $(selector);
    // console.log(btns);
    if (btns.length > 0) {
        var tmp = '<div class="dropdown"> <div class="finish"> <div class="container"> <button class="icon icon-circle close">&lsaquo;</button> <button class="finished">完成</button> </div> </div> <ul class="choose"></ul> </div>';
        var dropdown = $(tmp).appendTo('body');
        //所有需要输入内容的 input 元素
        var inputs = $("input[type]");
        // 原始top值
        var dropdownTop = dropdown.css("top");
        // top 弹出后的top值，由显示屏高度和自身高度决定
        // 视窗高度

        // 记忆弹框原始高度，方便动画执行
        var choose = dropdown.find(".choose");
        var cancel = dropdown.find(".close");
        // 确定选择按钮
        var finished = dropdown.find(".finished");
        // console.log(btns);
        btns.on("tap", function(e) {
            // console.log(this);
            e.preventDefault()
            addChoose(this);
        });

        dropdown.on("swipeUp", swipeUp);
        dropdown.on("swipeDown", swipeDown);
        // 为完成和返回按钮添加事件
        cancel.on("tap", hideDropdown);
        finished.on("tap", select);
        // 所有输入框获取焦点时，隐藏
        // inputs.focus(hideDropdown);

    }




})(Zepto);
