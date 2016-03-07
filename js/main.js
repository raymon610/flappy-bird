// JavaScript Document
var Main={
	init:function(){
		Util.init();
	},
	_totalPipelines:5,
	start:function(){
		//初始化管道
		pipelineFactory.creatPipeline(this._totalPipelines);
		
		//初始化鸟
		bird.init();
		
		//开始渲染画面
		this._render();
		
		//鸟开始自由落体
		this._startFreeFall();
		
		//初始化键盘事件响应
		this._initEvent();
	},
	
	//渲染定时器
	_render_t:null,
	_render:function(){
		this._render_t=setInterval(function(){
			
			var pipelines = pipelineFactory.pipelines; //敌机的集合
			
			for(var i in pipelines){
				var pipeline = pipelines[i];
				pipeline.e.style.display="block";
				pipeline.move(-pipeline.speed,0);
			
				var pX = pipeline.x;  		//管道X坐标
				
				var topFill = pipeline.e.children.item(0);  //上管道填充物
				var topPL = pipeline.e.children.item(1);  //上管道口
				var empty = pipeline.e.children.item(2);  //空的部分
				
				var pW = parseInt(pipeline.e.style.width.replace("px",""));
				
				var h = parseInt(topFill.style.height.replace("px","")) + parseInt(topPL.style.height.replace("px","")); //上管道高度
				var emptyH = parseInt(empty.style.height.replace("px",""));  

				if(bird.x+bird.e.width > pX  && bird.x < pX + pW   //是否在管道内
					&& (bird.y < h || bird.y+bird.e.width > h+emptyH)){  //高度重复
					clearInterval(Main._render_t);
					clearInterval(Main._startFreeFall_t);
					
					console.log("挂了");
					var b=window.confirm("游戏结束，是否重玩?")
					
					if(b){
						window.location.reload();
					}
				}
				if((bird.x+bird.e.width)>(pX + pW) && !pipeline.passed){ //是否超过管道 且管道不是已过的
					pipeline.passed = true;
					bird.score+=100;
					Util.scoreSpan.innerHTML=bird.score+"";
				}

				if(pipeline.x<0){  //管道已经过了最左边屏幕 重生
					pipeline.e = Util.pipelineRest(pipeline.e);
					pipeline.restore();
				}
			}
			//判断鸟是否挂了
			if(bird.y>Util.windowHeight){
				var b=window.confirm("对不起，您已经挂了，是否重玩?")
				if(b){
					window.location.reload();
				}
			}
			
		//},1000);	
		},90);
	}
	
	//自由落体定时器
	,_startFreeFall_t:null
	,_startFreeFall:function(){
		this._startFreeFall_t = setInterval(function(){
			bird.freeFall(bird.unitDistance);
		},300);
	}
	
	,_initEvent:function(){
		window.onkeydown=function(e){
			var keynum;
			var left=37,up=38,right=39,down=40;

			if(window.event){// IE
			  keynum = e.keyCode
			}else if(e.which) {// Netscape/Firefox/Opera
			  keynum = e.which
			}
			
			switch(keynum){
				case left:
					bird.moveLevel(-bird.unitDistance,0);
					break;
				case up:
					bird.moveUp(bird.upUnit);
					break;
				case right:
					bird.moveLevel(bird.unitDistance,0);
					break;
				case down:
					bird.moveUp(-bird.upUnit);
					break;
				default:
					break;
			}
			
		}
		
	}
}