var jiraListCtr = avalon.define({
    $id: "JiraListController",
    list: [
        {key: 'sfasf',
        summary: 'asafsaf',
        link: 'http://www.baidu.com'}
    ],

    total: 0
});

getList();

function getList(){
    var assignee = localStorage.getItem("jira_userid");
    var role = localStorage.getItem("jira_role");

    var jql = 'project=SMYH%20and%20resolution=Unresolved%20and%20assignee=' + assignee + "&_dt=" + Math.random();
    var url = 'http://42.121.137.49/jira/rest/api/2/search?jql=' + jql;
    var base = 'http://42.121.137.49/jira/browse/';

    getAjax(url, function(result){
        result = JSON.parse(result);

        var tp = [];
        avalon.each(result.issues, function(i, it){
            tp.push({
                key: it.key,
                link: base + it.key,
                summary: it.fields.summary
            })
        });

        jiraListCtr.list = tp || [];

        jiraListCtr.total = result.total;

        chrome.browserAction.setBadgeText({text: '' + result.total});

        avalon.scan();
    });
}

setInterval(getList, 60000);