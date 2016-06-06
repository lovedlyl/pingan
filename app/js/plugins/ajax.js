(function($) {
    // ajax请求
    var createXHR = function() {
        return new XMLHttpRequest();
    };
    var adder = {
        ajaxOptions: {
            type: 'GET',
            url: '',
            timeout: 1000 * 60,
            data: '',
            dataType: 'text',
            complete: function() {
                return;
            },
            success: function() {
                return;
            },
            error: function() {
                return;
            }
        },
        ajaxSetup: function(options) {
            options = options || {};
            $.ajaxOptions = $.extend($.ajaxOptions, options);
        },
        setupOptions: function(options) {
            options = options || {};
            // console.log($.ajaxOptions, options)
            return $.extend($.ajaxOptions, options);

        },
        serialize: function(obj) {
            // console.log(obj);
            var ret = [];
            var len = obj.length;
            var elem;
            if ($.isArray(obj)) {
                for (var i = 0; i < len; i += 1) {
                    elem = obj[i];
                    ret.push(encodeURIComponent(elem.name) + '=' + encodeURIComponent(elem.value));
                };
            } else if ($.isPlainObject(obj)) {
                for (var i in obj) {
                    ret.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
                };
            } else {
                obj;
            };
            return ret.join('&');
        },

        httpData: function(r, dataType) {
            if (dataType) {
                dataType = dataType.toLowerCase();
            };
            var ct = r.getResponseHeader('content-type');
            var data = dataType == null || dataType === 'xml' ? r.responseXML : r.responseText;
            // if (dataType === 'json') {
            //     data = JSON.parse(data);
            // };
            if (dataType === 'script') {
                eval.call(window, data);
            };
            return data;
        },
        ajax: function(options) {
            options = $.setupOptions(options);
            // console.log(options);
            var xhr = createXHR();
            var url = options.url;
            var type = options.type.toUpperCase();
            var data = options.data;
            // console.log(data);
            if (type === 'GET' && data) {
                url = url + '?' + $.serialize(data);
            };
            clearTimeout(xhr.timer);
            var requestDone = false;
            if (options.timeout) {
                xhr.timer = setTimeout(function() {
                    requestDone = true;
                }, options.timeout);
            }

            xhr.open(type, url, true);
            if (type === 'POST') {
                xhr.setRequestHeader('Content-type', 'text/plain:charset=UTF-8');
            };
            xhr.onreadystatechange = function() {
                // console.log(requestDone);
                if (xhr.readyState == 4 && !requestDone) {
                    var status = xhr.status;
                    // 成功
                    if (status >= 200 && status < 300 || status === 304) {
                        // console.log("sccuss");
                        if (options.success) {
                            options.success($.httpData(xhr, options.dataType));
                        }
                        // 出现错误
                    } else {
                        // console.log("error");
                        if (options.error) {
                            options.error(xhr);
                        }
                    };
                    // 不管成功和错误，始终执行的回调函数
                    if (options.complete) {
                        // console.log("done");
                        options.complete(xhr);
                    }
                    xhr = null;
                };
            };
            type === 'GET' ? xhr.send(null) : xhr.send(data);
        },
        get: function(options) {
            $.ajax($.extend(options, { type: 'GET' }));
        },
        post: function(options) {
            $.ajax($.extend(options, { type: 'POST' }));
        }
    };
    $.each(adder, function(key, fn) {
        $[key] = fn;
    });
    // 序列化表单
    $.fn.serialize = function() {
        // console.log(this.find("[name]"));
        var tag = this.get(0).tagName.toLowerCase();
        var res = {};
        if (tag != "form") {
            console.error("只能序列化表单");
        } else {

            this.find("[name]")
                .each(function(index, el) {
                    var input = $(el); 
                    // console.log(input);
                    res[input.attr("name")] = input.val();
                });
            return $.serialize(res);
        }
    };
})(Zepto);
