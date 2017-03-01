import {message} from 'antd';
var $ = require('jquery/src/core');
require('jquery/src/ajax');
require('jquery/src/ajax/xhr');
const Util = {
	extend: function(des, source){
		for (let name in source) {
			des[name] = source[name];
		}
		return des;
	},
	leftTrim: function(v) {
		let rgx = /^ */g;
		return v && v.replace(rgx, "");
	},

	rightTrim: function(v) {
		let rgx = / *$/g;
		return v && v.replace(rgx, "");
	},

	trim: function(v) {
		if (!v) return v;

		v = this.leftTrim(v);
		return this.rightTrim(v);
	},

	getLocInfo(locations, loc, ids) {
	    if (!locations) return {};
	    if (!loc || loc[0] == "1000") return locations;

	    let cnt = locations.children,
	        length = locations.children ? locations.children.length : 0,
	        result = {
	        	"label": "权限内省市",
			    "value": ids,
			    "key"  : ids,
			    "children": []
	        },
	        children = result.children;

	    for (let i = 0; i < length; i++) {
	    	for(let j = 0; j < loc.length; j++) {
	    		if (cnt[i].label == loc[j]) 
	      		children.push(cnt[i]);
	    	}
	    }

	    return result;
	},

	req: function(options) { 
		/* let rlt = {
			code: 1, // 1: 成功；2：失败
			data: {},
			message: ""
		}*/
		message.destroy();
		message.loading(options.loading, 100);
		$.ajax({
            type: options.type ? options.type: "post",
            async: "async",
            data: {m_param: JSON.stringify(options.m_param)},
            url: options.url,
            dataType: options.dataType ? options.dataType : "json",
            crossDomain: true,
        }).done(function(result){
        	let {code, data, msg} = JSON.parse(result);
        	
            switch(+code) {
            	case 1:
            		options.success && options.success(data);
            		message.destroy();
            		message.success(msg);
            		break;
      				
            	default: 
            		options.error && options.error();
      				message.destroy();
      				message.error(msg);
            		break;
            }
        }).fail(function(result){
        	options.error && options.error();
        	message.destroy();
            message.error("网络异常", 3);
        }) ;
	},

	format: function (date, fmt) { //author: meizz 
		if (!(date instanceof Date)) return date;
		
		if (!fmt) fmt = "yyyy-MM-dd HH:mm:ss";
	    var o = {
	        "M+": date.getMonth() + 1, //月份 
	        "d+": date.getDate(), //日 
	        "H+": date.getHours(), //小时 
	        "m+": date.getMinutes(), //分 
	        "s+": date.getSeconds(), //秒 
	        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
	        "S": date.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    	
    	return fmt;
	},

	getCookie: function(name) {
	    var arg = name + "=";
	    var alen = arg.length;
	    var clen = document.cookie.length;
	    var i = 0;
	    function getCookieVal(offset) {
		    var endstr = document.cookie.indexOf(";", offset);
		    if (endstr == -1) {
		        endstr = document.cookie.length;
		    }
		    return unescape(document.cookie.substring(offset, endstr));
		}
	    while (i < clen) {
	        var j = i + alen;
	        if (document.cookie.substring(i, j) == arg) {
	            return getCookieVal(j);
	        }
	        i = document.cookie.indexOf(" ", i) + 1;
	        if (i == 0) break;
	    }
	    return null;
	},
	setCookie: function(name, value, expires, path, domain, secure) {
	    document.cookie = name + "=" + escape(value) +
	    ((expires) ? "; expires=" + expires : "") +
	    ((path) ? "; path=" + path : "") +
	    ((domain) ? "; domain=" + domain : "") +
	    ((secure) ? "; secure" : "");
	}

}
const format = Util.format,
	  req    = Util.req,
	  extend = Util.extend,
	  getLocInfo = Util.getLocInfo,
	  getCookie = Util.getCookie,
	  setCookie = Util.setCookie;
export {format, req, extend, getLocInfo,getCookie,setCookie};
