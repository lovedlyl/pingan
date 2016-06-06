//     Zepto.js validate.js plugin
//     (c) 2016-05-31 (c) 2016-05-31 claudio lovedllyl@gmail.com
//     Zepto.js may be freely distributed under the MIT license.
/*使用方法：$(selector).validate(type, callback)
type:
纯数字：No
中文姓名： cnName
身份证号码：idNo
手机号码：phoneNo
银行卡号：bankNo
银行卡密码:bankPwd

*/
(function($) {
    var validations = {
        // 保证填写是否为数字
        "No": function(text) {
            var matcher = /^\d{1,}$/;
            var msg = "为至少一位的纯数字！";
            if (matcher.test(text)) {
                return { status: "success", msg: text };
            } else {
                return { status: "fail", msg: msg };
            }

        },
        "cnName": function(text) {
            // 将所有非中文字符替换为空
            text = text.replace(/[^\u4E00-\u9FA5]/g, '');
            msg = "请填写中文姓名！";
            if (text.length >= 2) {
                return { status: "success", msg: text };
            } else {
                return { status: "fail", msg: msg };
            }
        },
        // 保证填写是否为正确身份证号码格式
        // 身份证旧的15位，新的18位，都包含
        // 18位的看倒数第二位，奇男偶女
        // 15位的看倒数第一位，奇男偶女
        // 奇偶判断：".." & 1 == 0为偶数
        // 511124198912276813
        "idNo": function(text) {
            var len = text.length;
            var re;
            // 匹配的出身年月和性别
            var dob;
            var gender;
            var matcher18 = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{2})(\d{1})([0-9]|X)$/i;
            var matcher15 = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{2})(\d{1})$/;
            // var result = false;
            if (!(/^\d{1,}$/.test(text))) {
                return { status: "fail", msg: "身份证号码为15位或18位纯数字！" };
            }
            if ((len !== 15) && (len !== 18)) {
                return { status: "fail", msg: "身份证号码只能为15位或18位数字！" };
            }

            if (len == 15) {
                re = text.match(matcher15);
            }

            // 
            if (len == 18) {
                re = text.match(matcher18);
            }
            var year = re[2];
            var month = re[3];
            var day = re[4];
            var gender = re[6];
            if (parseFloat(month) > 12 || parseFloat(day) > 31) {
                // console.log("身份证号码格式错误！");
                return { status: "fail", msg: "身份证号码格式错误！" };
            }
            dob = year + "-" + month + "-" + day;
            gender = re[6];
            // 应该只有1999年前出身的人才有15位身份证号码
            if (len == 15) {
                dob = "19" + dob;
            }
            // console.log(gender);
            // 
            return { status: "success", msg: { dob: dob, gender: gender } };


        },
        // var matcher = /^1[3|4|5|7|8][0-9]{9}$/;
        // 有可能以后第二位数字会有增加，暂时不采用上一种方式
        // 15982038632
        "phoneNo": function(text) {
            var matcher = /^1[0-9]\d{9}$/;
            var msg = "电话号码格式错误！";
            if (matcher.test(text)) {
                return { status: "success", msg: text };
            } else {
                return { status: "fail", msg: msg };
            }
        },
        // 4位手机验证码
        "validateNo": function(text) {
            var matcher = /^\d{2,}$/;
            var msg = "手机验证码格式错误！";
            if (matcher.test(text)) {
                return { status: "success", msg: text };
            } else {
                return { status: "fail", msg: msg };
            }
        },
        // 验证银行卡卡号
        // 验证银行卡号
        // 先了解一下银行卡luhm算法， 算法比较简单。(16 位和19位卡号通用)
        // 1、 除去校验位后， 从右至左， 将卡号按位编码， 从0开始。
        // 2、 将偶数位× 2， 得到的结果按位相加， 比如偶数为6，× 2＝ 12， 则将1和2相加＝ 3； 奇数位则直接参与相加；
        // 3、 重复步骤2得到总和， 该总和加上校验位应能被10整除， 否则校验位不正确。
        // http://blog.csdn.net/mytianhe/article/details/18256925
        // 还没仔细查看实现原理
        // 6217853100006805444
        "bankNo": function(text) {
            var msg = "卡号格式错误！";
            if (text == "") {
                return { status: "fail", msg: msg };
            }
            var lastNum = text.substring(text.length - 1, text.length); //取出最后一位（与luhm进行比较）
            var first15Num = text.substring(0, text.length - 1); //前15或18位
            var newArr = new Array();
            var sumTotal = 0;
            for (var i = first15Num.length - 1, j = 0; i >= 0; i--, j++) {
                var yuansu = parseInt(first15Num[i]);
                if (j % 2 == 0) {
                    yuansu *= 2;
                    yuansu = parseInt(yuansu / 10) + parseInt(yuansu % 10);
                }
                sumTotal += parseInt(yuansu);
            }
            // alert(sumTotal + "sumTotal");

            //计算Luhm值
            var k = parseInt(sumTotal) % 10 == 0 ? 0 : 10 - parseInt(sumTotal) % 10;
            if (lastNum == k) {
                return { status: "success", msg: text };
            } else {
                return { status: "fail", msg: msg };
            }
        },
        // 验证银行卡密码
        // 为6位纯数字
        "bankPwd": function(text) {
            var matcher = /^\d{6}$/;
            var msg = "银行卡密码为6位纯数字";
            if (matcher.test(text)) {
                return { status: "success", msg: text };
            } else {
                return { status: "fail", msg: msg };
            }

        }
    };

    var toggleEmpty = function(input) {
        var value = input.val().replace(/\s/ig, '');
        if (value !== "") {
            input.removeClass("empty").addClass("dirty");
        } else {
            input.addClass("empty").removeClass("dirty");
        }
    };

    // console.log(inputs);
    // 触发验证的事件
    var event = "input";
    $("[data-validate]").each(function(index, input) {
        var input = $(input);
        var type = $(input).data("validate");
        if (validations[type]) {
            toggleEmpty(input);
        }
        var gender = $("[data-validate=gender]");
        var dob = $("[data-validate=dob]");
        // console.log(gender, dob)
        var fire = function(e) {
            e.preventDefault();
            var $this = $(this);
            var value = $this.val().replace(/\s/ig, '');
            // 动态获取验证类型，以便更改证件类型后自动刷新
            type = $this.data("validate");
            // console.log(type);
            var result;
            // 对值为空的元素添加类empty,否则移除类empty
            toggleEmpty($this);
            // 根据不同验证类型，验证表单内容
            if (type && validations[type]) {
                result = validations[type](value);
                if (result.status == "success") {
                    $this.addClass("valid").removeClass("invalid");
                    // 如果是身份证，自动填写出生年月和性别
                    if (type == "idNo") {
                        if (gender.length > 0) gender.val(result.msg.gender & 1);
                        if (dob.length > 0) dob.val(result.msg.dob);
                        $this.data("validate-success", value)

                    } else {
                        $this.data("validate-success", result.msg)
                    }
                } else {
                    $this.addClass("invalid").removeClass("valid");
                    $this.data("validate-fail", result.msg);
                    if (gender.length > 0) gender.val(0);
                    if (dob.length > 0) dob.val("");
                }
            }
        };
        input.on(event, fire);
    });


})(Zepto);
