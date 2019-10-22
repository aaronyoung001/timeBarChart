/**
 * Created by Aaron on 2019/10/22.
 */
import BaseView from "@/core/BaseView";
class Tip extends BaseView{

    constructor(eventBus){
        super(eventBus);
    }



    draw(ctx,x,y,item){
        super.draw(ctx);
        ctx.fillStyle = 'rgba(58, 58, 58, 0.59)';
        ctx.fillRect(x,y,100,63);
        
        ctx.fillStyle="#ffffff";
        ctx.font="13px Arail"
        let nameWidth=ctx.measureText(item.path.name).width;
        ctx.fillText(item.path.name,x+(50-nameWidth/2),y+20);

        let valueWidth=ctx.measureText(parseInt(item.path.labelValue)).width;
        ctx.fillText(parseInt(item.path.labelValue),x+(50-valueWidth/2),y+43);




    }

}




export default Tip;