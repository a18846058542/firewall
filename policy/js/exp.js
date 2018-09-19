/**
 * Created by Administrator on 2018/9/7 0007.
 */
var pageSize = 20;    //每页显示的记录条数
var curPage=0;        //当前页
var lastPage;        //最后页
var direct=0;        //方向
var len;            //总行数
var page;            //总页数
var begin;
var end;
$(function(){


    $("#addPolicy").click(function(){
        $("#SA").val('');
        $("#DA").val('');
        /*$("#agreement option:selected").val('');*/
        $("#port").val('');
        $("#dateTimeStart").val('');
        $("#dateTimeEnd").val('');
        $("#long-lived").val('');
        $("#IDnum").val('');
        $("#action1").attr('checked',true);
        $(".SAipAddressInfo").hide();
        $(".DAipAddressInfo").hide();
        $(".portInfo").hide();
        $(".longInfo").hide();
        $("#SA").css("borderColor","#e6e6e6");
        $("#DA").css("borderColor","#e6e6e6");
        $("#port").css("borderColor","#e6e6e6");
        $("#long-lived").css("borderColor","#e6e6e6");
    });

    $("#deletePolicy").click(function(){
        var checked=$("input[name='changeInfo']:checked");
        var deleteThis=$("[name='changeInfo']:checked").parents("tr");
        if($(checked).val()==undefined){
            modalAlert(4);
            return false;
        }
        var a=$(checked).length;
        if(a>1){
            modalAlert(5);
            return false;
        }
        deleteThis.remove();
    });
    $(".SAipAddressInfo").hide();
    $(".DAipAddressInfo").hide();
    $(".portInfo").hide();
    $(".longInfo").hide();
    var exp=/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)(\/\d+)?(-(2[0-4]\d|25[0-5]|[01]?\d\d?))?$/;
    $("#SA").blur(function(){
        var SA=$(this).val();
        var SAval=SA.split(";");
        var arr="";
        for(var i=0;i<SAval.length;i++){
            arr+=exp.test(SAval[i])+";";
        }
        arr=arr.substring(0,arr.length-1);
        var arr1=arr.split(";");
        for(var k=0;k<arr1.length;k++){
            if(arr1[k]=="false"){
                $(".SAipAddressInfo").show();
                $(this).css("borderColor","#EE180D");
                return false;
            }else{
                $(".SAipAddressInfo").hide();
                $(this).css("borderColor","#e6e6e6");
            }
        }


    });
    $("#DA").blur(function(){
        var DA=$(this).val();
        var DAval=DA.split(";");
        var arr="";
        for(var i=0;i<DAval.length;i++){
            arr+=exp.test(DAval[i])+";";
        }
        arr=arr.substring(0,arr.length-1);
        var arr1=arr.split(";");
        for(var k=0;k<arr1.length;k++){
            if(arr1[k]=="false"){
                $(".DAipAddressInfo").show();
                $(this).css("borderColor","#EE180D");
                return false;
            }else{
                $(".DAipAddressInfo").hide();
                $(this).css("borderColor","#e6e6e6");
            }
        }
    });
    $("#port").blur(function(){
        var port=$(this).val();
        var portVal=port.split(";");
        var portExp=/^[1-9]$|^[1-9]\d$|^[1-9]\d{2}$|^[1-9]\d{3}$|^[1-5]\d{4}$|^6[0-4]\d{3}$|^65[0-4]\d{2}$|^655[0-2]\d$|^6553[0-5]$/;
        var arr="";
        for(var i=0;i<portVal.length;i++){
            arr+=portExp.test(portVal[i])+";";
        }
        arr=arr.substring(0,arr.length-1);
        var arr1=arr.split(";");
        for(var k=0;k<arr1.length;k++){
            if(arr1[k]=="false"){
                $(".portInfo").show();
                $(this).css("borderColor","#EE180D");
                return false;
            }else{
                $(".portInfo").hide();
                $(this).css("borderColor","#e6e6e6");
            }
        }
    });
    $("#long-lived").blur(function(){
        var longLived=$(this).val();
        var longExp=/^\d$|^[1-9]\d$|^[1-9]\d{2}$|^[1-9]\d{3}$|^[1-9]\d{4}$|^1\d{5}$|^2[0-4]\d{4}$|^25[0-8]\d{3}$|^259[01]\d{2}$|^259200$/;//259200
        var arr=longExp.test(longLived);
        if(arr==false){
            $(".longInfo").show();
            $(this).css("borderColor","#EE180D");
        }else{
            $(".longInfo").hide();
            $(this).css("borderColor","#e6e6e6");
        }
    });
    $("#subPolicy").click(function(){
        var num=$("#policy-table tr").length-1;
        console.log(num);
        var SA=$("#SA").val();
        var DA=$("#DA").val();
        var agreement=$("#agreement option:selected").val();
        var port=$("#port").val();
        var dateTimeStart=$("#dateTimeStart").val();
        var dateTimeEnd=$("#dateTimeEnd").val();
        var dateTimeout=dateTimeStart+"~"+dateTimeEnd;
        var portNum=port.split(";");
        var arrPort1="";
        for(var k=0;k<portNum.length;k++){
            var arrPort=portNum[k];

            arrPort1+=agreement+"-"+arrPort+"; ";
        }
        arrPort1=arrPort1.substring(0,arrPort1.length-2);
        if(dateTimeStart=='' && dateTimeEnd==''){
            dateTimeout="";
        }
        var longLived=$("#long-lived").val();
        var action=$("input[name='action']:checked").val();
        if(SA=='' || DA=='' || agreement=='' || port=='' || action==''){
            modalAlert(3);
            return false;
        }else{
            $(this).attr("data-dismiss","modal");
            var IDnum=$("#IDnum").val();
            var idText=$("#policy-table .idNum:contains("+IDnum+")");
            console.log(idText);
            for(var i=0;i<idText.length;i++){
                if(IDnum==$(idText[i]).text()){
                    $(idText[i]).parents('tr').before("<tr class='tdInfo'><td>"+"<input type='checkbox' name='changeInfo'/>"+"</td><td class='idNum'>"+(num+1)+"</td><td>"+SA.split(";").join("<br/>")+"</td><td>"+DA.split(";").join("<br/>")+"</td><td>"+agreement+"</td><td>"+arrPort1+"</td><td>"+dateTimeout+"</td><td>"+longLived+"</td><td>"+action+"</td><td>"+""+"</td></tr>");

                    len =$("#policy-table tr").length - 1;    // 求这个表的总行数，剔除第一行介绍
                    page=len % pageSize==0 ? len/pageSize : Math.floor(len/pageSize)+1;//根据记录条数，计算页数
                    // alert("page==="+page);
                    curPage=1;    // 设置当前为第一页
                    displayPage(1);//显示第一页

                    document.getElementById("btn0").innerHTML="当前 " + curPage + "/" + page + " 页    每页 ";    // 显示当前多少页
                    document.getElementById("allNum").innerHTML="数据总条数 " + len + "";        // 显示数据量
                    document.getElementById("pageSize").value = pageSize;



                    $("#btn1").click(function firstPage(){    // 首页
                        curPage=1;
                        direct = 0;
                        displayPage();
                    });
                    $("#btn2").click(function frontPage(){    // 上一页
                        direct=-1;
                        displayPage();
                    });
                    $("#btn3").click(function nextPage(){    // 下一页
                        direct=1;
                        displayPage();
                    });
                    $("#btn4").click(function lastPage(){    // 尾页
                        curPage=page;
                        direct = 0;
                        displayPage();
                    });
                    $("#btn5").click(function changePage(){    // 转页
                        curPage=document.getElementById("changePage").value * 1;
                        if (!/^[1-9]\d*$/.test(curPage)) {
                            alert("请输入正整数");
                            return ;
                        }
                        if (curPage > page) {
                            alert("超出数据页面");
                            return ;
                        }
                        direct = 0;
                        displayPage();
                    });


                    $("#pageSize").click(function setPageSize(){    // 设置每页显示多少条记录
                        pageSize = document.getElementById("pageSize").value;    //每页显示的记录条数
                        if (!/^[1-9]\d*$/.test(pageSize)) {
                            alert("请输入正整数");
                            return ;
                        }
                        len =$("#policy-table tr").length - 1;
                        page=len % pageSize==0 ? len/pageSize : Math.floor(len/pageSize)+1;//根据记录条数，计算页数
                        curPage=1;        //当前页
                        direct=0;        //方向
//                      firstPage();
                        displayPage();
                    });
                    return false;

                }

            }
            $("#policy-table tbody").append("<tr class='tdInfo'><td>"+"<input type='checkbox' name='changeInfo'/>"+"</td><td class='idNum'>"+(num+1)+"</td><td>"+SA.split(";").join("<br/>")+"</td><td>"+DA.split(";").join("<br/>")+"</td><td>"+agreement+"</td><td>"+arrPort1+"</td><td>"+dateTimeout+"</td><td>"+longLived+"</td><td>"+action+"</td><td>"+""+"</td></tr>");
        }
        /*var IDnum=$("#IDnum").val();
         var idNums=$("#policy-table .idNum");
         console.log(idNums.length);
         for(var a=0;a<idNums.length;a++){
         var b=idNums[a];
         if()
         }*/

        len =$("#policy-table tr").length - 1;    // 求这个表的总行数，剔除第一行介绍
        page=len % pageSize==0 ? len/pageSize : Math.floor(len/pageSize)+1;//根据记录条数，计算页数
        // alert("page==="+page);
        curPage=1;    // 设置当前为第一页
        displayPage(1);//显示第一页

        document.getElementById("btn0").innerHTML="当前 " + curPage + "/" + page + " 页    每页 ";    // 显示当前多少页
        document.getElementById("allNum").innerHTML="数据总条数 " + len + "";        // 显示数据量
        document.getElementById("pageSize").value = pageSize;



        $("#btn1").click(function firstPage(){    // 首页
            curPage=1;
            direct = 0;
            displayPage();
        });
        $("#btn2").click(function frontPage(){    // 上一页
            direct=-1;
            displayPage();
        });
        $("#btn3").click(function nextPage(){    // 下一页
            direct=1;
            displayPage();
        });
        $("#btn4").click(function lastPage(){    // 尾页
            curPage=page;
            direct = 0;
            displayPage();
        });
        $("#btn5").click(function changePage(){    // 转页
            curPage=document.getElementById("changePage").value * 1;
            if (!/^[1-9]\d*$/.test(curPage)) {
                alert("请输入正整数");
                return ;
            }
            if (curPage > page) {
                alert("超出数据页面");
                return ;
            }
            direct = 0;
            displayPage();
        });


        $("#pageSize").click(function setPageSize(){    // 设置每页显示多少条记录
            pageSize = document.getElementById("pageSize").value;    //每页显示的记录条数
            if (!/^[1-9]\d*$/.test(pageSize)) {
                alert("请输入正整数");
                return ;
            }
            len =$("#policy-table tr").length - 1;
            page=len % pageSize==0 ? len/pageSize : Math.floor(len/pageSize)+1;//根据记录条数，计算页数
            curPage=1;        //当前页
            direct=0;        //方向
//                      firstPage();
            displayPage();
        });

    });


});

function modalAlert(type) {
    switch(type) {
        case 1:
            $.fn.modalAlert("提交成功", "success");
            return;
        case 2:
            $.fn.modalAlert("错误", "error");
            return;
        case 3:
            $.fn.modalAlert("请将信息输入完整", "warning");
            return;
        case 4:
            $.fn.modalAlert("请选择一条数据", "warning");
            return;
        case 5:
            $.fn.modalAlert("只能选择一条数据", "warning");
            return;
    }

}

$.fn.modalAlert = function (content, type) {
    var icon = "";
    var iconType = 0;
    if (type == 'success') {
        icon = "fa-check-circle";
        iconType = 1;
    }
    if (type == 'error') {
        icon = "fa-times-circle";
        iconType = 2;
    }
    if (type == 'warning') {
        icon = "fa-exclamation-circle";
        iconType = 3;
    }
    top.layer.alert(content, {
        icon: iconType,
        title: "系统提示",
        btn: ['确认'],
        btnclass: ['btn btn-primary']
    });
};
function displayPage(){
    if(curPage <=1 && direct==-1){
        direct=0;
        alert("已经是第一页了");
        return;
    } else if (curPage >= page && direct==1) {
        direct=0;
        alert("已经是最后一页了");
        return ;
    }

    lastPage = curPage;

    // 修复当len=1时，curPage计算得0的bug
    if (len > pageSize) {
        curPage = ((curPage + direct + len) % len);
    } else {
        curPage = 1;
    }


    document.getElementById("btn0").innerHTML="当前 " + curPage + "/" + page + " 页    每页 ";        // 显示当前多少页

    begin=(curPage-1)*pageSize + 1;// 起始记录号
    end = begin + 1*pageSize - 1;    // 末尾记录号


    if(end > len ) end=len;
    $("#policy-table tr").hide();    // 首先，设置这行为隐藏
    $("#policy-table tr").each(function(i){    // 然后，通过条件判断决定本行是否恢复显示
        if((i>=begin && i<=end) || i==0 )//显示begin<=x<=end的记录
            $(this).show();
        if(len>10)
            $('#pagediv').show();
    });
}