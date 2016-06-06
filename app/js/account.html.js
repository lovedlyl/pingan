$(function() {
    // 帐号页面数据.account.html,卡类型，卡号，卡密码
    var cardType = $("#cardType"); 
    var cardNo = $("#cardNo");
    var password = $("#password");
    // 表单提交
    (function() {
        // console.log("account.html");

        formSubmit.$$fire = function(e) {
            e.preventDefault();
            formSubmit.$$required = [cardNo, password];
            if (formSubmit.$$checked()) {
                formSubmit.$$params = $("form").serialize();
                formSubmit();
            }
        };
        formSubmit.$$btn = $("#submit");
        formSubmit.$$btn.on("tap", formSubmit.$$fire);
    })();
    // .....表单提交结束
});
