/**
 * 格式化时间
 */


export function formatDate(date,fmt) {
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for( let k in o) {
        if( new RegExp(`(${k})`).test(fmt)) {
            let str = o[k]+'';
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length ===1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

/**
 * 格式化时间
 */

/*
export function formatDate(date, fmt) {
    // 匹配0~多个y，年比较特殊所以将他抽出来
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';          //  这个(RegExp.$1.length === 1)的作用是有可能外面传递的只有一个m或者d等一个值得
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

// 如果$s1是mm,str是9(009),所以就是09了,
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
*/
