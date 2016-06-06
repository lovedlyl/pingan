//     Zepto.js storage.js plugin
//     (c) 2016-05-31 (c) 2016-05-31 claudio lovedllyl@gmail.com
//     Zepto.js may be freely distributed under the MIT license.
// 页面跳转时，缓存表单数据
;
(function($) {
    var selector = "[data-storage]";
    var inputs = $(selector);
    // 抽离本地存储函数，方便以后修改，或许不用sessionStorage
    var setItem = function(item, value) {
        if (sessionStorage) {
            sessionStorage.setItem(item, value);
        }
    };
    var getItem = function(item) {
        if (sessionStorage) {
            return sessionStorage.getItem(item);
        } else {
            return;
        }

    };
    // 暴露接口
    $.setItem = setItem;
    $.getItem = getItem;
    $.getItems = function() {
        var res = {};
       for (var i = sessionStorage.length - 1; i >= 0; i--) {
           var key = sessionStorage.key(i);
           var value = sessionStorage.getItem(key);
           res[key] = value;
       }
       return res;
    };
    // 保存本地内存中的表单内容
    var saveData = function() {
        // console.log("saving....")
        inputs.each(function(index, input) {
            // 缓存索引为链接地址 加上 元素在需要缓存元素中的索引
            // 如phone.html --> phone0
            setItem($(input).data("storage"), $(input).val());
        });

    };
    // 获取本地缓存数据
    var fetchData = function() {
        // console.log("fetching");
        inputs.each(function(index, input) {
            var value = getItem($(input).data("storage"));
            // 防止第一次加select的缓存返回值得为数值0而不是字符串“0”
            if (value !== null && value !== undefined) {
                $(input).val(value);
            }
        });
    };

    // 页面加载时填充数据
    if (inputs.length > 0) {
        fetchData();
    }
    // 页面离开是就缓存数据
    window.onunload = function() {
        if (inputs.length > 0) {
            saveData();
        }
    }
})(Zepto);
