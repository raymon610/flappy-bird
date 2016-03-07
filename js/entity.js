//笨鸟的对象
var bird={
	x:0,
	y:0,
	score:0,
	e:null,
	unitDistance:10,  //每次移动的距离
	upUnit:20,
	init:function(){
		this.x=(Util.windowWidth-Util.birdElement.width)/5;//相对于父窗体的x偏移(css:left)
		this.y=(Util.windowHeight-Util.birdElement.height)/2;//相对于父窗体的y偏移(css:top)
		this.e=Util.birdElement;//对应的dom元素
		Util.birdElement.style.left=this.x+"px";
		Util.birdElement.style.top=this.y+"px";
		Util.parentElement.appendChild(this.e);
	},
	move:function(moveX,moveY){
		var x=this.x+moveX;
		var y=this.y+moveY;
		
		if(x<0-this.e.width/2||x>Util.windowWidth-this.e.width/2){
			return ;
		}
		if(y<0-this.e.height/2||y>Util.windowHeight-this.e.height/2){
			return ;
		}
		this.x=x;
		this.y=y;
		
		this.e.style.left=this.x+"px";
		this.e.style.top=this.y+"px";
	},
	
	moveLevel:function(moveX){
		this.x+=moveX;
		this.e.style.left=this.x+"px";
	},
	
	//自由落体
	freeFall:function(moveY){ //下降的距离
		this.y+=moveY;
		this.e.style.top=this.y+"px";
	}
	
	//向上移动
	,moveUp:function(moveY){
		this.y-=moveY;
		this.e.style.top=this.y+"px";
	}
}


//障碍管道
var pipeline = function(x,y,speed,e){
	this.x=x;
	this.y=y;
	this.e=e;
	this.e.style.left=x;
	this.e.style.top=y;
	this.speed=speed;
	this.passed = false
	Util.parentElement.appendChild(this.e);

}
//障碍管道移动
pipeline.prototype.move = function(moveX,moveY){
	this.x+=moveX;
	this.y+=moveY;
	
	this.e.style.left = this.x +"px";
	this.e.style.top = this.y +"px";
}

//障碍管道复活
pipeline.prototype.restore = function(x,y){
	this.x = Util.windowWidth;
	this.y = y;
	this.e.style.left=this.x+"px";
	this.e.style.top=this.y+"px";
	this.isDied=false;
	this.passed = false
}

//管道工厂
var pipelineFactory={
	pipelines:[],
	creatPipeline:function(n){  //n 表示每次产生多少个敌机
		for(var i=0;i<n;i++){
			var e = Util._createPanel(),
				w = e.style.width.replace("px",""),
				t = (parseInt(w)+97) * i,
				x = Util.windowWidth - t,
				speed = 5;

			var pl= new pipeline(x,0,speed,e);
			this.pipelines.push(pl);
		}
	}
}


