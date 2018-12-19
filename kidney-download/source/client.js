var doctorUrl = 'http://140.207.217.96/kidney-user-test/';

$(document).ready(function(){
  //表单验证
  $(".invitation").Validform({
    tiptype:function(msg,o,cssctl){
      if(!o.obj.is("form")){
        var objtip=o.obj.parents(".content").next(".Validform_checkti");
        cssctl(objtip,o.type);
        $(objtip).css({
          "display":"block"
        });
        objtip.text(msg);
      }
    },
    datatype: {
      "tel":/^1[34578]\d{9}$/,
      "number": /^\d{6}$/,
    },
  });

  //请求验证码
  $(".getVerification").on("click",function(){
    var tel = $("#mobile").val();
    if((/^1[34578]\d{9}$/).test(tel)){
      timedCount();
      $.ajax({
        url:doctorUrl+"invite/captcha?mobile="+tel,
        type:'get',
        success:function(result){
          console.log(result);
          if(result.ret_code == 0){
            $('#message').text("验证码发送成功");
            $('#modal').css('display', 'block');
          }else{
            $('.getVerification').text('获取验证码');
            $('.getVerification').removeAttr('disabled');
            clearTimeout(t);
            count = 60;
            $('#Validform_checkti').html(result.message);
            $('#Validform_checkti').css({
              display:'block'
            })
          }
        },
        error: function(){
          $('#message').text("服务器请求错误");
          $('#modal').css('display', 'block');
        }
     });
    }
  });

  $("#mobile").keyup(function(){
    $('#Validform_checkti').css({
      display:'none'
    })
  })

  //关闭模态框
  $('#close').on('click', function() {
    $('#modal').css('display', 'none');
  });

   //关闭信息提示
  $('.cover').on('click', function() {
    $('.cover').css('display', 'none');
  });

  //直接下载
  $(".cnet").on("click",function(){
    if (isWeixinBrowser()) {
      $('.cover').css('display', 'block');
    }else{
      var typeId = GetQueryString("typeId");
      var type = GetQueryString("type");
      if(typeId){
        if (isAndroid() && typeId == 0) {
          window.location.href = "http://7xrrdw.com1.z0.glb.clouddn.com/patient-kidney.apk";
        }
        if (isIOS() && typeId == 0) {
          window.location.href = "https://appsto.re/cn/rVBqhb.i";
        }
        if (isAndroid() && typeId == 1) {
          window.location.href = "http://7xrrdw.com1.z0.glb.clouddn.com/doctor-kidney.apk";
        }
        if (isIOS() && typeId == 1) {
          window.location.href = "https://appsto.re/cn/m1Dqhb.i";
        }
      }else{
        if (isAndroid()) {
          window.location.href = "http://7xrrdw.com1.z0.glb.clouddn.com/patient-kidney.apk";
        }
        if (isIOS()) {
          window.location.href = "https://appsto.re/cn/rVBqhb.i";
        }
      } 
    }
  });
});

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
   
//定时设置
var count = 60;
var t;
function timedCount() {
  $('.getVerification').attr('disabled', 'true');
  $('.getVerification').text(count + '秒后重新获取');
  count--;
  t = setTimeout("timedCount()", 1000);
  if (count < 0) {
    count = 60;
    $('.getVerification').text('获取验证码');
    $('.getVerification').removeAttr('disabled');
    clearTimeout(t);
  }
};

//提示信息消失
function verifyPhone(){
  $('#toast').css('display', 'none');
};

//下载医生端
$("#doctordownload").on("click",function(){
  verification(1);
});

//下载用户端
$("#userdownload").on("click",function(){
  if(isWeixinBrowser()) {
      $('.cover').css('display', 'block');
    }else{
      verification(0);
  }
});

//验证手机号和验证码
function verification(number){
  var verification = $("#verification").val();
  var tel = $("#mobile").val();
  if(tel && (/^1[34578]\d{9}$/).test(tel) && (/^\d{6}$/).test(verification)){
    toDownload(number);
  }else if(!tel){
    $('#toast').css({
      display:"block"
    });
    $('#toast p').html("请填写手机号");
    setTimeout("verifyPhone()",1500);
  }else if(!verification){
    $('#toast').css({
      display:"block"
    });
    $('#toast p').html("请填写验证码");
    setTimeout("verifyPhone()",1500);
  }
}

//请求下载
function toDownload(dlType) {
  var data = {};
  var tel = GetQueryString("tel");
  var type = GetQueryString("type");
  data.inviterTel = tel || "";
  data.inviterTypeIdx = type || "";
  data.inviteeTel = $("#mobile").val();
  data.inviteeTypeIdx = dlType;
  data.captcha = $("#verification").val();
  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType:'application/json',
    processData:false,
    url: doctorUrl + 'invite',
    success: function(data) {
      if (isAndroid() && dlType == 0 && data.ret_code == 0) {
        window.location.href = "http://7xrrdw.com1.z0.glb.clouddn.com/patient-kidney.apk";
      }else if (isIOS() && dlType == 0 && data.ret_code == 0) {
        window.location.href = "https://appsto.re/cn/rVBqhb.i";
      }else if (isAndroid() && dlType == 1 && data.ret_code == 0) {
        window.location.href = "http://7xrrdw.com1.z0.glb.clouddn.com/doctor-kidney.apk";
      }else if (isIOS() && dlType == 1 && data.ret_code == 0) {
        window.location.href = "https://appsto.re/cn/m1Dqhb.i";
      }else{
        $('#message').text(data.message);
        $('#modal').css('display', 'block');
      }
    },
    error: function(){
      $('#message').text("服务器请求错误");
      $('#modal').css('display', 'block');
    }
  })
};



//判断安卓客户端
function isAndroid() {
  var u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
}

//判断IOS客户端
function isIOS() {
  var u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}

//判断是否微信浏览器
function isWeixinBrowser() {
  var ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false;
}

