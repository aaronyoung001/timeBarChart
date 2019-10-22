/**
 * Created by Aaron on 2019/10/21.
 */

import BaseView from "@/core/BaseView";
class Bar extends BaseView{

    constructor(x,y,width,height,color,eventBus){
        super(eventBus);
        this._x=x;
        this._y=y;
        this._width=width;
        this._height=height;
        this._color=color;
        this._isClickAble=true;
    }



    draw(ctx,name,labelValue){
        super.draw(ctx);
        ctx.fillStyle = this._color || '#1abc9c';
        ctx.fillRect(this._x,this._y,this._width,this._height);
        this.storePath("bar",{x:this._x,y:this._y,height:this._height,width:this._width,name,labelValue});



        ctx.font="12px Arial"
        ctx.fillText(parseInt(labelValue||0),this._x+this._width+8,this._y+this._height/2);






    }
    
}




export default Bar;