
var browser = {
  versions:function(){ 
  var u = navigator.userAgent, app = navigator.appVersion; 
  return {//移动终端浏览器版本信息 
    trident: u.indexOf("Trident") > -1, //IE内核
    presto: u.indexOf("Presto") > -1, //opera内核
    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
    iPhone: u.indexOf("iPhone") > -1 , //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf("iPad") > -1, //是否iPad
    webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
    };
  }(),
  language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

$(function(){
    $('.go_make').click(function(){
        start_make1($(this));
    });
});

function start_make1(_this){
    $.post('/wxinfo',function(result){
        if(result==-1){
            bootbox.dialog({
                className:"money-modal",
                message: "登录后才可继续操作，请登录...",
                title: "提示",
                closeButton: false,
                buttons: {
                    success: {
                        label: "登录 / 注册",
                        className: "btn-success",
                        callback: function() {
                            window.open("/wxlogin");
                        }
                    }
                }
            });
            return;
        } else if(result==-2){
            bootbox.dialog({
                className:"money-modal",
                message: "您的余额不足！<font style='color: red;'>制作不扣除任何费用，只需保证账户余额有18元及以上就可以永久制作</font>",
                title: "提示",
                closeButton: false,
                buttons: {
                    success: {
                        label: "继续充值制作",
                        className: "btn-success",
                        callback: function() {
                            window.open("/pay");
                        }
                    },
                    main: {
                        label: "忍痛放弃，制作有水印",
                        className: "btn-default",
                        callback: function() {
                            //$('.phone-wrap').css('transform','scale(1.0)');
                            $('#waters').addClass('i-water');
                            makePic1(_this);
                        }
                    }
                }
            });
            return;
        } else{
            $("div").remove("#waters");
            $('.phone-wrap').css('transform','scale(1.0)');
        }
        makePic1(_this);
    });
}

function makePic1(obj){
    var _this = obj;
    var div = $('#iphone').clone();

    var my_image = $('.my-image');
    var mask = $('.mask');
    if(!my_image.length){
        my_image = $('<div class="my-image">成功生成图片，点击 <a class="my-image-view" target="_blank" href="#">这里</a> 查看，<a class="my-image-continue" href="#">继续制作</a></div>');
        $('body').append(my_image);
    }
    if(!mask.length){
        $('body').append('<div class="mask"></div>');
    }

    div.removeClass('iphone-preview');
    div.css({
        zoom:1,
        position:'absolute',
        left:0,
        top:0
    });
    $('#ifm').contents().find('body').append(div);
    _this.hide();
    $('.loading').show();
    $('.my-image').hide();
    $('.mask').hide();


    html2canvas(div, {
        onrendered: function(canvas) {
            var myImage = canvas.toDataURL("image/png");

            var pop_pic = $('.pop-pic');
            var pop_class = 'pc';
            if(browser.versions.mobile){
                pop_class = 'mobile';
            }
            pop_pic.find('.tips').addClass(pop_class);
            pop_pic.find('img').attr('src',myImage);
            pop_pic.show();
            $('#wrapper').hide();
            $('.loading').hide();
            _this.show();
            div.remove();
        }
    });
    return false;
}

function start_make(_this){
    $.post('/wxinfo',function(result){
        if(result==-1){
            bootbox.dialog({
                className:"money-modal",
                message: "登录后才可继续操作，请登录...",
                title: "提示",
                closeButton: false,
                buttons: {
                    success: {
                        label: "登录 / 注册",
                        className: "btn-success",
                        callback: function() {
                            window.open("/wxlogin");
                        }
                    }
                }
            });
            return;
        } else if(result==-2){
            bootbox.dialog({
                className:"money-modal",
                message: "您的余额不足！<font style='color: red;'>制作不扣除任何费用，只需保证账户余额有18元及以上就可以永久制作</font>",
                title: "提示",
                closeButton: false,
                buttons: {
                    success: {
                        label: "继续充值制作",
                        className: "btn-success",
                        callback: function() {
                            window.open("/pay");
                        }
                    },
                    main: {
                        label: "忍痛放弃，制作有水印",
                        className: "btn-default",
                        callback: function() {
                            //$('.phone-wrap').css('transform','scale(1.0)');
                            $('#waters').addClass('i-water');
                            makePic(_this);
                        }
                    }
                }
            });
            return;
        } else{
            /*$('.phone-wrap').addClass('ok');
            $('.phone-wrap').css('transform','scale(1.0)');*/
            //$('#waters').removeClass('i-water');
            $("div").remove("#waters");
            $('.phone-wrap').css('transform','scale(1.0)');
        }
        makePic(_this);
    });
}

function getOs() { 
    var OsObject = ""; 
   if(isIE = navigator.userAgent.indexOf("MSIE")!=-1) { 
        return "MSIE"; 
   } 
   if(isFirefox=navigator.userAgent.indexOf("Firefox")!=-1){ 
        return "Firefox"; 
   } 
   if(isChrome=navigator.userAgent.indexOf("Chrome")!=-1){ 
        return "Chrome"; 
   } 
   if(isSafari=navigator.userAgent.indexOf("Safari")!=-1) { 
        return "Safari"; 
   }  
   if(isOpera=navigator.userAgent.indexOf("Opera")!=-1){ 
        return "Opera"; 
   } 
} 

function toDecimal2(x) {    
    var f = parseFloat(x);    
    if (isNaN(f)) {    
        return false;    
    }    
    var f = Math.round(x*100)/100;    
    var s = f.toString();    
    var rs = s.indexOf('.');    
    if (rs < 0) {    
        rs = s.length;    
        s += '.';    
    }    
    while (s.length <= rs + 2) {    
        s += '0';    
    }    
    return s;    
}    

Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "$";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

$(function(){
	//初始化手机时间
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();

    //qq表情
    $(qq_emoji).each(function(i,item){
      var a = '<a title="' + item + '" href="javascript:;"></a>';
      $('.faceBox').append(a);
    });

    //点击显示表情事件
    $('body').on('click','.btn-add-face',function(){
      var position = $(this).offset();
      var data_input = $(this).attr('data-input');
      $('#emojiPanel').css({
        //left:position.left,
        top:position.top + 55
      }).toggle();
      $('#emojiPanel').attr('data-input',data_input);
      return false;
    });

    //表情点击事件
    $('body').on('click','.emojiArea a',function(){
      var t = $(this).attr('title');
      var data_input = $(this).parents('#emojiPanel').attr('data-input');
      insertAtCursor($('.' + data_input).get(0),'[' + t + ']');
    });

    //初始时间
    for(var i = 0; i < 24; i++){
      var h = i > 9 ? i : '0' + i;
      var s = h == hours ? ' selected' : '';
      $('.slt-hour,.slt-p-hour').append('<option' + s + '>' + h + '</option>');
    }
    for(var i = 0; i < 60; i++){
      var h = i > 9 ? i : '0' + i;
      var s = h == minutes ? ' selected' : '';
      $('.slt-minite,.slt-p-minite').append('<option' + s + '>' + h + '</option>');
    }

    $('.slt-common').change(function(){
      var val = $(this).find('option:selected').val();
      var _class = $(this).attr('data-class');
      $(this).find('option').each(function(i,item){
        $('.' + _class).removeClass($(item).val());
      });
      $('.' + _class).addClass(val);

		if(val=='i-n-user-group')
		{
			$(".input-common").val("群聊标题(3)");
			$('.i-n-name span').text("群聊标题(3)");
		}

    });
      
    $('.rd-common').click(function(){
      var val = $(this).val();
      var _class = $(this).attr('data-class');
      if(val == '1'){
        $('.' + _class).show();
      }else{
        $('.' + _class).hide();
      }
    });
      // 是否可删除消息
      $('.rd-common1').click(function(){
        var val = $(this).val();
        if (val == '1') {
            $('.msg-del').css('display', 'none')
        } else {
            $('.msg-del').css('display', 'block')
        }
    })

    $('.input-common').change( function() {
      var _class = $(this).attr('data-class');
      var val = $.trim($(this).val());
      $('.' + _class).text(val);
      $('.' + _class).html(val);
    });

    //手机时间选择
    $('.slt-phone-time').change(function(){
      var shi = $('.slt-p-shi option:selected').val();
      var hour = $('.slt-p-hour option:selected').val();
      var minite = $('.slt-p-minite option:selected').val();
      var str = '';

      if(shi != '-'){
        str += shi;
      }
      str += hour + ':';
      str += minite;

      $('.i-top-time').text(str);
    }).change();

    //点击body事件
    $('body').click(function(){
      $('#emojiPanel').hide();
    });

    $('body').on('click','.btn-rand-face',function(){
      var face_path = 'images/face/';
      var num = get_random_num(1,40);
      var file_name = face_path + num + '.jpg';
      var img = '<img src="' + file_name + '" />';
      $(this).parents('.add-user').find('.a-u-pic-show img').remove();
      $(this).parents('.add-user').find('.a-u-pic-show input').after(img);

      var _class = $(this).attr('data-class');
        if(_class){
        var obj = $('.' + _class);
            if(_class=='i-b-a-face_ali'){
                //支付宝转账
                $('.i-b-a-face_ali img').attr('src', file_name);
            } else{
                if(obj.get(0).tagName.toLowerCase() == 'img'){
                    obj.attr('src',file_name);
                }else{
                    obj.css('background-image','url(' + file_name + ')');
                }
            }
      }
    });

    $('body').on('click','.ali-btn-rand-face',function(){
        var face_path = '/images/face/';
        var num = get_random_num(1,40);
        var file_name = face_path + num + '.jpg';
        var img = '<img src="' + file_name + '" />';
        $(this).parents('.add-user').find('.a-u-pic-show img').remove();
        $(this).parents('.add-user').find('.a-u-pic-show input').after(img);

        var _class = $(this).attr('data-class');
        if(_class){
            var obj = $('.' + _class);
            if(_class=='i-b-a-face_ali'){
                //支付宝转账
                $('.i-b-a-face_ali img.changface').attr('src', file_name);
            } else{
                if(obj.get(0).tagName.toLowerCase() == 'img'){
                    obj.attr('src',file_name);
                }else{
                    obj.css('background-image','url(' + file_name + ')');
                }
            }
        }
    });

    $('body').on('click','.btn-rand-username',function(){
      //var num = get_random_num(4,8);
      var name = randName();//randomString(num,true);
      $(this).parents('.add-user').find('.a-u-data-name').val(name);
    });

    //电池滑块
    function setBar(num){
      $('.i-top-berry i em').css('width',num + '%');
      num = num.toString();
      var index = num.toString().lastIndexOf('.');
      num = index == -1 ? num : num.substring(0,index);
      $('.i-top-berry-num').text(num + '%');
    }
    $('.slider_bar').sGlide({
      'startAt': 50,
      'width': 300,
      'height': 20,
      'unit': 'px',
      // 'image': 'img/knob_.png',
      // 'pill': false,
      'totalRange': [1,100],
      // 'locked': true,
  
      'colorShift': ['#3a4d31', '#7bb560'],
      // 'vertical': true,
      'buttons': true,
      // 'disabled': true,
      drag: function(o){
        setBar(o.custom);
      },
      onButton: function(o){
        setBar(o.custom);
      }
    });

    if(is_check_brower && (getOs() != 'Chrome' && getOs() != 'Safari')){
    //if(is_check_brower){
      var browser = '<div class="browser"><a target="_blank" href="http://www.12tool.com"><span>请勿在微信里面操作,直接复制网站地址到手机浏览器里面去操作!</span></a><a class="pop-close" href="#">x</a></div>';
      $('body').append(browser);
      $('body').append('<div class="mask"></div>');
      $('.mask').height($(document).height());
    }

    $('.pop-close').click(function(){
      $('.mask,.browser').hide();
      return false;
    });

    $('body').on('click','.my-image-continue',function(){
      $('.mask,.my-image').hide();
      return false;
    });
});