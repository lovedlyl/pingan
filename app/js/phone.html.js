$(function() {
    // phone.html填写数据,电话号码，验证码
    var phoneNo = $("#phoneNo");
    var validateNo = $("#validateNo");
    var form = $("form");
    // 获取验证码
    (function() {
        var retry = function() {
            clearInterval(timer);
            duration = 60;
            validateNoBtn.removeClass("disabled").text("重新获取");
            validateNoBtn.on("tap", getValidateNo);
        };
        var getValidateNo = function(e) {
            e.preventDefault();
            // 首先验证电话号码格式是否正确，否则点击获取验证码按钮无效
            if (phoneNo.hasClass("empty") || !phoneNo.hasClass("valid")) {
                warning("请正确格式的填写手机号码！")
                return;
            }
            validateNoBtn.addClass("disabled")
                .off("tap", getValidateNo)
                .text(duration + "秒后重试");
            // 发送请求获取验证码
            $.post({
                url: "???????????????",
                data: form.serialize(),
                error: function(xhr) {
                    warning("获取验证码失败！")
                    retry();
                },
                success: function(data) {
                    if (data.status == "success") {
                        timer = setInterval(function() {
                            duration -= 1;
                            validateNoBtn.text(duration + "秒后重试");
                            if (duration <= 0) {
                                retry()

                            }
                        }, 1000);
                    }
                    if (data.status == "fail") {
                        retry();
                    }
                }
            });

        };
        //..... 请求结束
        var timer;
        var validateNoBtn = validateNo.siblings('.btn');
        var text = validateNoBtn.text();
        // 多少秒后重试
        var duration = 60;

        validateNoBtn.on("tap", getValidateNo);

    })();
    // ....获取验证码结束
    // 表单提交
    (function() {
        formSubmit.$$fire = function(e) {
            // console.log("fire");
            // console.log(form.serialize());
            e.preventDefault();
            formSubmit.$$required = [phoneNo, validateNo];
            if (formSubmit.$$checked()) {
                formSubmit.$$params = form.serialize();
                formSubmit();
            }
        };

        formSubmit.$$btn = $("#submit");
        formSubmit.$$btn.on("tap", formSubmit.$$fire);
    })();
    // .....表单提交结束

});
