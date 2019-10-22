/**
 * Created by Aaron on 2019/10/22.
 */
import ChartsStack from "@/core/ChartsStack";
const EventHandler=(dom,eventBus)=>{
    let stacks=new ChartsStack();

    eventBus.on("storePath",function(sender,data,obj){
        stacks.push(data);

    });

    eventBus.on("clearPath",function(sender,data,obj){

        stacks.empty();

    });

    dom.addEventListener("mousemove",function(e){
        var _x = e.pageX, _y =e.pageY;



        let currentHoverItem=null;
        stacks.all().forEach(item=>{
            if(item.type==='bar'){
                if(item.path.x<=_x&&_x<=(item.path.x+item.path.width)&&item.path.y<=_y&&_y<=(item.path.y+item.path.height)){
                    currentHoverItem=item;

                    return;
                }

            }


        })
        console.log(currentHoverItem)
        if(!!currentHoverItem){
            let hoverObj=new Object();
            hoverObj.item=currentHoverItem;
            hoverObj.mouseP={_x,_y};
            eventBus.emit("hoverBar",dom,hoverObj)
        }else{
            eventBus.emit("hoverBar",dom,null)
        }
    });

    dom.addEventListener("click",function(e){

        var _x = e.pageX, _y =e.pageY;

        stacks.all().forEach(item=>{
            if(item.type==='rect'){
                if(item.path.x<=_x&&_x<=(item.path.x+item.path.width)&&item.path.y<=_y&&_y<=(item.path.y+item.path.height)){
                    eventBus.emit("togglePlay",dom,null)
                    return;
                }

            }


        })

    });
    dom.addEventListener("mouseenter",function(e){
        eventBus.emit("showTool",dom,true);
    });

    dom.addEventListener("mouseout",function(e){
        eventBus.emit("showTool",dom,false);
    });


}

export default EventHandler;
