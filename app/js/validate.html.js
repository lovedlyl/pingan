$(function() {
    var cnName = $("#cnName");
    var idType = $("#idType");
    var idNo = $("#idNo");
    var validCode = $("#validCode");
    // idType.on("tap", function() {
    //     alert(1000);
    // });
    // console.log(validCode);
    // 获取idType(证件类型)
    (function() {
        var getIdTypes = function() {
            var idTypes = {
                "0": "身份证",
                "1": "护照",
                "2": "军官证或士兵证",
                "3": "港澳通行证/回乡证/台胞证",
                "4": "户口本",
                "5": "其他"
            };
            $.post({
                url: "?????????????????",
                data: $.serialize({ request: 'idTypes????????' }),
                error: function(xhr) {
                    // console.log("use default idTypes");
                    // ???????????????????
                },
                success: function(data) {
                    idTypes = JSON.parse(data);
                }
            });

            return idTypes;
        };
        // ...........
        var tmp = "";
        var idTypes = getIdTypes();
        $.each(idTypes, function(key, val) {
            // console.log(val);
            if (key == 0) {
                tmp += "<option value=" + key + " selected>" + val + "</option>";
            } else {
                tmp += "<option value=" + key + ">" + val + "</option>";
            }
        });
        // console.log(tmp);
        idType.html(tmp);

    })();

    // ...获取证件类型结束
    // ...获取验证码，验证码按钮添加事件
    (function() {
        // 获取验证码
        // 如果请求失败使用的默认参数
        var fake = { code: "583L", src: "data:image/gif;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAcADoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3m7uoLG0murmQRwwoXdj2ArCtfHXh67uY4EvSryMFTfEwDE++P51a8Vadd6t4durGy2edNtUbzgY3DP6VwOq6reW1ldeF9Tgiju2hQ2slsoHmHOAv6da7cLho1l5+uy77anVQoKqvP9O56Xaatp19I0drfW8zr95EkBI/Cs3UPGWg6ZKYbjUEMoOCiAsR+XFcX4WthJ4guFvLRbfUrK0Ma2kY2CfgjJbvUdxKk3iOy0TW9LisrdirJb2xBDHOAXbqa3WBgqri22kr6W9dO5osLFVHFu6Sv0/DudevjW0uPEttotnbyTyzIHMoICopXd+PH866evJvhoo1DxfqeoOACiHYPQE4wPoBXrNc2Noxo1FTj0Sv6tXMcVSjSnyLolf13CiiiuQ5yhq66k1jjSniW53A/vehHpXFXPgfWdRuG1i8vYv7WjKtCq/cG05xXolFdFHE1KPwfl+HobUq86XwHB23h7xHNqNzrV1Lbw6n5QjhEfKYzU2keDr2TV5NX1+4jmvCpVBH0Wu2oqnjKrTSsrq23TsN4mettL6fLsee2nw2u9Mmkn07xBNbSuTnZHgEfnXQ6HF4ms7w22rTW15abTsuUG1wfQiuhoqamJqVfj1+Sv8AeKdec/j1+QUUUVzmJ//Z" };
        var applyChange = function(data) {
            $.setItem("validCodeSrc", data.code);
            $("#validCodeImg").attr("src", data.src);
        };
        // 请求参数
        var params = { requst: "validCode?????????????" };
        var fire = function(e) {
            // console.log("getting img ...");
            $.post({
                url: "????????????????????????",
                data: $.serialize(params),
                success: function(data) {
                    var data = JSON.parse(data);
                    if (data.status == "success") {
                        applyChange(data);
                    } else {
                        warning("获取验证码失败，请重新获取！");
                    }
                },
                error: function(xhr) {
                    // console.log("error");
                    applyChange(fake);
                }
            });

        };
        // 页面加载时就请求一次
        fire();
        // ......
        $("#getValidCodeBtn").on("tap", fire);


    })();
    // 获取验证码结束
    // 表单提交
    (function() {
        // 校验验证码
        var validCodeChecked = function() {
            var res = true;
            var value = validCode.val();
            if (value !== $.getItem("validCodeSrc")) {
                warning("验证码错误！");
                res = false;
            }
            return res;
        };
        formSubmit.$$fire = function(e) {
            e.preventDefault();
            formSubmit.$$required = [cnName, idNo];
            if (formSubmit.$$checked() && validCodeChecked()) {
                // 如果输入内容格式都正确，变量赋值，请求
                formSubmit.$$params = $("form").serialize();
                formSubmit.$$success = function(data) {
                    data = JSON.parse(data);
                    if (data.status == "success") {
                        var userType = data.userType;
                        $.setItem("userType", userType);
                        // 依赖返回的用户类型**********************
                        if (userType == "普通用户???????????") {
                            location.href = "/phone.html";
                        } else {
                            location.href = "/account.html";
                        }
                    }
                    if (data.status == "fail") {
                        formSubmit.$$btn.on("tap", formSubmit.$$fire);
                        warning(data.msg);
                    }
                };
                formSubmit();
            }
            // ....
        };
        formSubmit.$$btn = $("#submit");
        formSubmit.$$btn.on("tap", formSubmit.$$fire);
    })();
    // .....表单提交结束
});
