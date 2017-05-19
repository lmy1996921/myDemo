//图片预加载
(function($){
	function preload(imgs,options){
		this.imgs = (typeof imgs === 'string')?[imgs]:imgs;
		this.opts = $.extend({},preload.DEFAULTS,options);		
	
		this._unoredered();
	}
	preload.DEFAULTS = {
		each:null,
		all:null
	}

	preload.prototype._unoredered = function(){
		//无序加载
		
		var imgs = this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;

		$.each(imgs,function(i,src){
			if(typeof src != 'string')return;
			var imgObj = new Image();
			$(imgObj).on('load error',function(){
				opts.each && opts.each(count);
				$progress.html(Math.round((count+1)/len*100)+'%');
				if(count>=len-1){
					opts.all && opts.all();
					document.title='1/'+len;
				}
				count++;
			}); 
			imgObj.src = src
		});
	};

	$.extend({
		preload:function(imgs,opts){
			new preload(imgs,opts)
		}
	});
})(jQuery);