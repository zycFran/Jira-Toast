/**
 * Created by zhouyc on 2015/10/10.
 */
$(function(){
    var user_name = localStorage.getItem("jira_userid");
    if(user_name){
        $("#user_name").val(user_name);
    }
    $("button").click(function(){
        var val = $("#user_name").val();
        if(!val){
            alert('请输入jira用户名');
            return false;
        }
        localStorage.setItem('jira_userid', val);
        alert('保存成功!');
    })
});
