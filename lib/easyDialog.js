// 20130504  easyDialog
//silenceper@gmail.com
;(function($){
 //所有的一些方法在这里写
 var methods={
		init:function(settings){
			//这里已经 each了 所有在int中调用的方法就不必再次each了 否则会出错
				//合并参数
				this.opt=$.extend(true,{},$.easyDialog.defaults,settings);
				if(this.opt.isOverlay){
					//设置遮罩
					methods.setOverlay.call(this);
				}
				//将内容插入
				methods.setContent.call(this);
				
				//防止冲突
				var that=this;
				//点击关闭
				$('#easyDialog_close').click(function(){
						methods.closeEasyDialog.call(that);
					})
		},
		
		//设置遮罩
		setOverlay:function(){
			var html_overlay="<div id='easyDialog_overlay' style='position: fixed; top: 0px; bottom:0px;left: 0px;right:0px;display: none; z-index: 9998; background-color: rgb(0, 0, 0);'></div>";
			$(html_overlay).appendTo('body');
			$('#easyDialog_overlay').css({opacity:this.opt.overlay.opacity}).fadeIn(this.opt.animateTime);
		},
		
		//将内容插入
		setContent:function(){
			var html_wrap="<div id='easyDialog_container'style='position: fixed; z-index: 9999;display:none;'><div id='easyDialog_inner'><div id='easyDialog_header'><h3>"+this.opt.container.header+"</h3><a id='easyDialog_close' href='javascript:void(0);'></a></div><div id='easyDialog_content'></div></div></div>";			
			
			//记录内容
			this.opt.prev=this.opt.container.content.prev();
			$(html_wrap).appendTo('body');
			var easyDialog=$('#easyDialog_container');
			this.opt.container.content.show();
			this.opt.container.content.appendTo($('#easyDialog_content'));
			//弹出层居中
			var _scrollHeight =-30,//获取当前窗口距离页面顶部高度 此处减了了30
				_windowHeight = $(window).height(),//获取当前窗口高度
				_windowWidth = $(window).width(),//获取当前窗口宽度
				_popupHeight = easyDialog.height(),//获取弹出层高度
				_popupWeight = easyDialog.width();//获取弹出层宽度
				_posiTop = (_windowHeight - _popupHeight)/2 + _scrollHeight;
				_posiLeft = (_windowWidth - _popupWeight)/2;
			easyDialog.css({"left": _posiLeft + "px","top":_posiTop + "px"});//设置position			
			easyDialog.fadeIn(this.opt.animateTime);
			
		},
		
		//关闭  
		closeEasyDialog:function(){
			$('#easyDialog_overlay').fadeOut(this.opt.animateTime,function(){
				$('#easyDialog_overlay').remove();
				});
			$('#easyDialog_container').fadeOut(this.opt.animateTime,function(){
				$('#easyDialog_overlay').remove();
				});
			this.opt.container.content.hide();
			this.opt.prev.after(this.opt.container.content);
			$('#easyDialog_container').remove();
		},

 };

 //插件main
 $.easyDialog=function(method){
 if(methods[method]){
		return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	}else if(typeof method === 'object' || !method){
		return methods.init.apply( this, arguments );
	}else{
		$.error( 'Method ' + method + ' does not exist on jQuery pulgin' ); 
	}
};

//一些默认的配置  分开来写这样更加规范 更加易于管理
$.easyDialog.defaults={
	container :{
			header:'登入',
			content:$('#login_box'),
		},
	animateTime:200,  //出现时间
	isOverlay:true,
	overlay:{
			opacity:0.3,
		}
};
})(jQuery);