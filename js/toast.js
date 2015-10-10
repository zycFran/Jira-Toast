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

    setTimeout(function () {
        notification.close();
    }, 5000);
}

var base = 'http://42.121.137.49/jira/browse/';
//var base = 'http://localhost:8091/browse/';

io.connect('http://121.43.150.219:3001').on('ping', function(res) {
    console.log(res);
    var user_name = localStorage.getItem("jira_userid");
    if(res.issue.fields.assignee && res.issue.fields.assignee.name == user_name){
        var state = getState(res);
        showNotice(res.issue, state);
        new Audio("audio/notify.mp3").play();
    }
});


// open, reopen, in progress,
function getState(res){
    if(res.webhookEvent == 'jira:issue_created'){
        return "open";
    }else if(res.webhookEvent == 'jira:issue_updated'){
        if(res.changelog.items.length){
            var len = res.changelog.items.length;
            var it = res.changelog.items[len-1];
            if(it['field'] == 'assignee'){
                return 'assignee';
            }else{
                return it['toString'];
            }
        }
    }
}