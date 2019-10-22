/**
 * Created by Aaron on 2019/10/21.
 */
import BaseView from "@/core/BaseView";


class TimeZone extends BaseView{

    constructor(x,y,font,color){
        super();
        this._x=x;
        this._y=y;
        this._font=font;
        this._color=color;

    }



    draw(ctx,label){
        super.draw(ctx);
        ctx.fillStyle = this._color
        ctx.font =this._font;
        let offset = ctx.measureText(label);
        ctx.fillText(label,this._x-offset.width,this._y);

    }


    


}


export default TimeZone;