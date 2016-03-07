// JavaScript Document
var Util={
	windowWidth:900,
	windowHeight:400,
	birdElement:null,
	pipelineElement:null,
	upPipelineElement:null,
	bottomPipelineElement:null,
	parentElement:null,
	scoreSpan:null,
	
	g:function(id){
		return document.getElementById(id);
	},
	
	init:function(){
	
		this.parentElement=this.g("parent");
		
		//加载鸟
		this.birdElement=this._loadImg("images/bird.png");
		
		//管道
		//this.pipelineElement = this._createPanel();
		
		this.scoreSpan=this.g("score");
		
	},
	
	_loadImg:function(src){
		var e=document.createElement("img");
		e.style.position="absolute";
		e.src=src;
		return e;
	}
	//创建管道
	,_createPanel:function(){ 
		var m = document.createElement("div"),	 	//外面总的DIV
			mcUp = document.createElement("div"),  	//管道口DIV
			mcFill = document.createElement("div"), //需要填充的DIV
			empty = document.createElement("div"),  //空的DIV 可让鸟过的
			mcBottom = document.createElement("div"),  	//管道口DIV
			mcFillBottom = document.createElement("div"), //需要填充的DIV
			emptyH = 80;
			pMouthH = 57, //管口的高度
			sumFillH = Util.windowHeight-pMouthH*2-emptyH,  //可填充的总高度
			topH = parseInt(Math.random() * sumFillH),   	//其中一个填充的高度
			divW = 51;
		
		m.style.position="absolute";
		m.style.width=divW + "px";
		m.style.height= Util.windowHeight+ "px";
		m.style.display = "none";
		
		
		//上管口
		mcUp.style.width=divW + "px";
		mcUp.style.height=pMouthH +"px";
		mcUp.style.backgroundImage ="url(images/top.png)";
		
		//上管口填充
		mcFill.style.width=divW + "px";
		mcFill.style.height=topH + "px";  //上填充高度
		mcFill.style.backgroundRepeat ="repeat-y";
		mcFill.style.backgroundImage ="url(images/topbg.png)";
		
		//中间空的
		empty.style.width=divW + "px";
		empty.className ="empty";
		empty.style.height= emptyH + "px";
		
		//下管口
		mcBottom.style.width=divW + "px";
		mcBottom.style.height=pMouthH +"px";
		mcBottom.style.backgroundImage ="url(images/bottom.png)";
		
		//下管口填充
		mcFillBottom.style.width=divW + "px";
		mcFillBottom.style.height=topH + "px";  //上填充高度
		mcFillBottom.style.backgroundImage ="url(images/bottombg.png)";
		mcFillBottom.style.height=(sumFillH-topH) + "px";  //下管填充高度
		
		m.appendChild(mcFill);
		m.appendChild(mcUp);
		m.appendChild(empty);
		m.appendChild(mcBottom);
		m.appendChild(mcFillBottom);
		
		return m;
	}
	,pipelineRest:function(m){
		var topFill = m.children.item(0),  //上管道填充物
		    topPL = m.children.item(1),  //上管道口
		    empty = m.children.item(2),  //空的部分
		    bottomPL = m.children.item(3),  //下管道口
		    bottomFill = m.children.item(4),  //下管道填充物
		
			//管口高度 上下都一样
		    pMouthH = parseInt(topPL.style.height.replace("px","")),
			emptyH = parseInt(empty.style.height.replace("px","")),
			
			sumFillH = Util.windowHeight-pMouthH*2-emptyH,  //可填充的总高度
			topH = parseInt(Math.random() * sumFillH);   	//其中一个填充的高度
		
		
		topFill.style.height=topH + "px";  //上填充高度
		bottomFill.style.height=(sumFillH-topH) + "px";  //下管填充高度
		
		return m;
	}
}