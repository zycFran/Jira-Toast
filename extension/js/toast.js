/**
 * Created by zhouyc on 2015/10/8.
 */
function showNotice(issue, state) {
    var notification = new window.Notification(issue.key + " (" + state + ")", {
        icon: 'img/icon.png',
        body:  issue.fields.summary.substr(0, 95) || "",
        tag: '查看详情'
    });

    notification.onclick = function(){
        window.open(base + issue.key);
    };

    var auto_close = localStorage.getItem("auto_close");
    var delay_time = Number(localStorage.getItem("delay_time")) || 5;
    if(auto_close){
        setTimeout(function () {
            notification.close();
        }, delay_time * 1000);
    }
}

var base = 'http://42.121.137.49/jira/browse/';
var socket_io_url = 'http://42.121.137.49:3001';


io.connect(socket_io_url).on('ping', function(res) {
    console.log(res);
    var user_name = localStorage.getItem("jira_userid");
    var role = localStorage.getItem("jira_role") || 'admin';

    var fields = res.issue.fields;
    var state = fields.status.name.toLocaleLowerCase();
    var creator = fields.creator.name;
    var assignee = fields.assignee.name;

    var isShow = false;

    //管理员监听所有的事件类型
    //开发监听 open reopen
    //测试监听 open resolved
    if(role == 'admin' || (user_name == assignee && (state == 'open' || state == 'reopened'))){
        isShow = true;
    }
    if(role == 'tester'){
        if(user_name == creator && (state == 'resolved')){
            isShow = true;
        }
    }
    if(isShow){
        showNotice(res.issue, state);
        new Audio("audio/notify.mp3").play();
    }
});