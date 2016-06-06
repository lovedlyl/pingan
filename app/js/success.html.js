// alert(1);

$(function() {

    // 页面加载时，通过本地缓存数据，请求用户名
    // $.getItems 为自己写的插件，返回本地缓存所有内容为plain Object
    var items = $.getItems();
    var params = ($.extend(items, { request: "getUserName???????" }));
    var userName;
    // 获取用户名成功后，调用函数
    var getUserNameSuccess = function(data) {
        data = JSON.parse(data);
        if (data.status == "success") {
            //?????
            userName = data.userName;
            $("#userName").text(userName);
            // 成功获取用户名后，才为提交登录按钮添加事件
            $("#login").on("tap", login);
        } else {
            //??????????
            warning(data.msg)
        }
    };
    // 登录事件函数
    var login = function(e) {
        e.preventDefault();
        params = $.extend(items, { request: "login?????", userName: userName });
        $.post({
            url: "url?????????????????",
            data: $.serialize(params),
            success: function(data) {
                data = JSON.parse(data);
                if (data.status = "success") {
                    // ?????????????????
                    // 是否是页面跳转
                } else {
                    waring("登录失败，请稍后再试！");
                }
            },
            error: function(xhr) {
                warning("登录失败，请稍后再试！")
            }
        });
    };
    // 加载时获取用户名
    $.post({
        url: "url??????????????????????",
        data: $.serialize(params),
        success: getUserNameSuccess,
        error: function(xhr) {
            warning("获取用户名失败，请稍后再试！")
        }
    });
    // ...........





});
