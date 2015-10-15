/**
 * Created by zhouyc on 2015/10/10.
 */
function getAjax(url, cb){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            //msg_cache = xhr.responseText;
            cb(xhr.responseText);
        }
    };
    xhr.send();
}

function postAjax(url, data, cb){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            //msg_cache = xhr.responseText;
            cb(xhr.responseText);
        }
    };
    xhr.send(data);
}

