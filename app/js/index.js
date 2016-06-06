// 公共函数
// if(!sessionStorage){
//     alert(1);
// }

// 弹框提示信息
var warning = function(msg, input) {
    $(".modal .modal-content").text(msg);
    $(".modal").addClass("on");
    if (input) {
        $(input).get(0).focus();
    }
};


$(".modal .close").on("tap", function() {
    $(".modal").removeClass("on");
});

// 左上角圆形按钮点击 页面返回
$(".header .icon-circle").on("tap", function(e) {
    e.preventDefault();
    history.go(-1);
});

//表单中的按钮点击时 有默认提交的动作
$("form button").on("click", function(e) {
    e.preventDefault();
    // console.log("click");
});

// 表单提交请求函数
// 为减少全局变量，将所有属性和函数，集中放置在formSubmit这一命名空间中
// formSubmit.

$.ajaxSetup({
    dataType: "json",
    contentType: "application/json"
});

var formSubmit = function() {
    formSubmit.$$btn.off("tap", formSubmit.$$fire);
    $.post({
        url: formSubmit.$$url,
        data: formSubmit.$$params,
        success: formSubmit.$$success,
        error: formSubmit.$$error
    });
};


formSubmit.$$url = "???????????????????";
//请求成功调用account.html 和 phone.html调用
formSubmit.$$success = function(data) {
    // console.log("ajax success");
    data = JSON.parse(data);
    if (data.status == "success") {
        location.href = "/success.html";
    } else {
        formSubmit.$$btn.on("tap", formSubmit.$$fire);
        warning("对不起，您的帐号存在异常，请联系客服95511转4转8");
    }
};
// 请求失败的调用
formSubmit.$$error = function(xhr) {
    // console.log("xhr");
    // location.href = "/account.html";
    formSubmit.$$btn.on("tap", formSubmit.$$fire);
    warning("请求失败，请稍后再试！");
};

formSubmit.$$checked = function() {
    var res = true;
    for (var i = 0; i < formSubmit.$$required.length; i++) {
        var input = formSubmit.$$required[i];
        var label = input.siblings('label').text();
        
        if (input.hasClass("empty")) {
            warning("请填写" + label + "！", input)
            res = false;
            break;
        }
        // 有无效的输入不提交
        if (!input.hasClass("valid")) {
            msg = $(input).data("validate-fail") || "请填写" + label + "！";
            input.val("");
            warning(msg, input);
            res = false;
            break;
        }
    };
    return res;
};
