/**
 * Created by zhouyc on 2015/10/10.
 */
$(function(){

    init();

    bindEvent();

    var auto_close;
    var delay_time;
    function init(){
        var user_name = localStorage.getItem("jira_userid");
        if(user_name){
            $("#user_name").val(user_name);
        }

        var role = localStorage.getItem("jira_role") || 'developer';
        $(".role-" + role).addClass("active").siblings().removeClass("active");

        delay_time = localStorage.getItem("delay_time") || 5;
        $("#delay_time").val(delay_time);

        auto_close = localStorage.getItem("auto_close")=='true';
        $("#noti_desktop").attr("checked", auto_close);

        if(auto_close){
            $("#timeSet").show();
        }else{
            $("#timeSet").hide();
        }
    }

    function bindEvent(){
        $("#noti_desktop").change(function(){
            auto_close = !auto_close;
            if(auto_close){
                $("#timeSet").show();
            }else{
                $("#timeSet").hide();
            }
        });


        $(".role-item").click(function(){
            $(this).addClass("active").siblings().removeClass("active");
            localStorage.setItem("jira_role", $(this).attr("value"));
        });

        $("#SaveBtn").click(function(){
            var val = $("#user_name").val();
            if(!val){
                alert('请输入jira用户名');
                return false;
            }
            localStorage.setItem('jira_userid', val);

            delay_time = Number($("#delay_time").val()) || 5;

            localStorage.setItem("auto_close", auto_close);
            localStorage.setItem("delay_time", delay_time);

            alert('保存成功!');
        });

    }
});
