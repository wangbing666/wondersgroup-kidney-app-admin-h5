$(document).ready(function(){
  
  //跳转到用户端下载
  $("#user").on("click",function(){
    if (isWeixinBrowser()) {
      $('.cover').css('display', 'block');
    }else{
      jump("user",0);
    }
  });

  //跳转到医生端下载
  $("#doctor").on("click",function(){
    if (isWeixinBrowser()) {
      $('.cover').css('display', 'block');
    }else{
      jump("doctor",1);
    }
  });

  //关闭信息提示
  $('.cover').on('click', function() {
    $('.cover').css('display', 'none');
  });
})


/**
 * 获取链接地址后的参数
 * @param name
 * @returns {*}
 * @constructor
 */
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return (r[2]);
  return null;
}

//跳转页面
function jump(src,typeId){
  var tel = GetQueryString("tel") || "";
  var type = GetQueryString("type") || "";
  url = src+"client.html?tel="+tel+"&type="+type+"&typeId="+typeId;
  window.location.href = url;
}

//判断是否微信浏览器
function isWeixinBrowser() {
  var ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false;
}
