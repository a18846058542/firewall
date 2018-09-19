/**
 * Created by dccs-wlyx on 2018/8/29.
 */
var pageSize = 20;    //每页显示的记录条数
var curPage=0;        //当前页
var lastPage;        //最后页
var direct=0;        //方向
var len;            //总行数
var page;            //总页数
var begin;
var end;
window.onload=function(){
  new Vue({
      el:'#policyTable',
      data:{
          search:'',
          VPCdata:[]
      },
      created:function(){
          this.getData()
      },
      methods:{
          getData:function(){
              var that=this;
              that.$http({
                  method:'post',
                  url:'json/getVPCRules.json'
              }).then(function(response){
                  this.VPCdata=response.body.Output.firewall_rules;
                  for(var i=0;i<this.VPCdata.length;i++){
                      var ports = this.VPCdata[i].requirement_dst_port;
                      var strPorts = "";
                      for(var k=0;k<ports.length;k++) {
                          var port = ports[k];
                          if(port.dst_port_range.min==port.dst_port_range.max){
                              strPorts+=port.protocol+"-"+port.dst_port_range.max+"; ";
                          }else{
                              strPorts+=port.protocol+"-"+port.dst_port_range.min+"~"+port.dst_port_range.max+"; ";
                          }
                      }
                      strPorts=strPorts.substring(0,strPorts.length-2);
                      $("#policy-table").append("<tr class='tdInfo'><td>" + "<input type='checkbox' name='changeInfo'/>" + "</td><td class='idNum'>" + (i+1) + "</td><td>" + this.VPCdata[i].requirement_src_ip.join("<br/>") + "</td><td>" + this.VPCdata[i].requirement_dst_ip.join("<br/>") + "</td><td>" + this.VPCdata[i].requirement_protocol + "</td><td>" + strPorts + "</td><td>" + this.VPCdata[i].start_time + "~" + this.VPCdata[i].end_time + "</td><td>" + this.VPCdata[i].requirement_timeout + "</td><td>" + this.VPCdata[i].requirement_action + "</td><td>" + "" + "</td></tr>");
                  }

                  $("#searchInput").keyup(function(){
                      var searchValue=$(this).val();
                      $("#policy-table .tdInfo").hide().filter(":contains(" + searchValue + ")").show();
                  }).keyup();

                  $("#allChange").click(function(){
                      if($(this).is(':checked')){
                          $("input[name='changeInfo']").each(function(){
                              $(this).prop("checked",true);
                          });
                      }else{
                          $("input[name='changeInfo']").each(function(){
                              $(this).removeAttr("checked",false);
                          });
                      }
                  });




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
              },function(error){
                  console.log(error);
              })
          }
      }
  })
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





