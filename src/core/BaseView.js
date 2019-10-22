/**
 * Created by Aaron on 2019/10/21.
 */
import EventBus from "@/core/EventBus"

class BaseView{


    constructor(eventBus){
        this._isClickAble=false;
        this._id=Math.random().toString(36).substr(3,8)+Date.now().toString();
        if(!!eventBus){
            if(eventBus instanceof EventBus){
                this._eventBus=eventBus;
            }

        }
    }



    draw(ctx){



    }


    storePath(type,path){
        if(this._isClickAble&&!!this._eventBus){
            this._eventBus.emit("storePath",this,{id:this._id,type,path})

        }
    }


    setClickAble(flag){
        this._isClickAble=flag;
    }


}



export default BaseView;