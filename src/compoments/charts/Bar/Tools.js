/**
 * Created by Aaron on 2019/10/21.
 */

import BaseView from "@/core/BaseView";
const playImageSource=require("@/assets/play.png");
const pauseImageSource=require("@/assets/pause.png");

class Tools extends BaseView{

    constructor(x,y,eventBus){
        super(eventBus);
        this._x=x;
        this._y=y;

        this._pauseimg=new Image();
        this._pauseimg.src=pauseImageSource;
        this._pauseimgHeight=0;
        this._pauseimgWidth=0;

        this._playimg=new Image();
        this._playimg.src=playImageSource;
        this._playimgHeight=0;
        this._playimgWidth=0;
        this._showTools=false;
        this._isClickAble=true;
        this.playState=true;
        const _self=this;
        this._pauseimg.onload=function(){

            _self._pauseimgWidth=_self._playimg.width;
            _self._pauseimgHeight=_self._playimg.height;
        }
        this._playimg.onload=function(){

            _self._playimgWidth=_self._playimg.width;
            _self._playimgHeight=_self._playimg.height;
        }

        eventBus.on("showTool",function (sender, data, obj) {
           let context=sender.getContext("2d");
            if(data){//显示时间轴工具栏
                _self._showTools=true;

            }else{
                _self._showTools=false;
            }
            _self.showPlayImage(context);
        });

        eventBus.on("playStateChange",function (sender, data, obj) {
            let context=sender;
            _self.playState=data;
            _self.showPlayImage(context);
        });

    }



    draw(ctx){
        super.draw(ctx);
        this.showPlayImage(ctx);
    }


 

    showPlayImage(ctx){
        if( this._playimgHeight>0&& this._showTools){
            ctx.clearRect(this._x+5,this._y-this._playimgHeight,this._playimgWidth,this._playimgHeight);
            ctx.drawImage(this.playState?this._pauseimg:this._playimg,this._x+5,this._y-this._playimgHeight);
            this.storePath("rect",{x:this._x+5,y:this._y-this._playimgHeight,height:this._playimgHeight,width:this._playimgWidth});

        }else{
            ctx.clearRect(this._x+5,this._y-this._playimgHeight,this._playimgWidth,this._playimgHeight);
        }

    }



}


export default Tools;