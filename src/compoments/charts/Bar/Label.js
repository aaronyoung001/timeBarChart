/**
 * Created by Aaron on 2019/10/21.
 */
import BaseView from "@/core/BaseView";
class Label extends BaseView{

    constructor(x,y,font,color){
        super();
        this._x=x;
        this._y=y;
        this._font=font;
        this._color=color;
    }



    draw(ctx,label){
        super.draw(ctx);
        ctx.fillStyle = this._color;
        ctx.font = this._font;
        let offset = ctx.measureText(label);
        let offsetWidth=offset.width + 12
        ctx.fillText(label, this._x-offsetWidth ,this._y);
    }


    ellipseText(){
        
    }

}




export default Label;