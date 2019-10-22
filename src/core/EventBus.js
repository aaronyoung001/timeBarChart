/**
 * Created by Aaron on 2019/10/21.
 */

const  validateEventName=(s)=> {
    if (s == null) {
        return null;
    }
    s = s.replace(/^\s+|\s+$/g, "");
    return s.length > 0 ? s.toLowerCase() : null;
}


class Handler {

    constructor(){
        this._fns=new Array();
        this._datas=new Array();
    }


    add(fn, data) {
        this._fns.push(fn);
        this._datas.push(data);
    }
    remove (fn) {
        const i = this._fns.indexOf(fn);
        if (i >= 0) {
            this._fns.splice(i, 1);
            this._datas.splice(i, 1);
        }
    }
    invoke (sender, data) {
        this._fns.forEach((fn, i) => {
            try {
                fn(sender, data,  this._datas[i])
            } catch (error) {
                console.error(error);
            }
        });
    }
}

class EventBus{

    constructor(){
        this._eventHandler=new Object();
    }

    on(eventName,fn,data){

        eventName=validateEventName(eventName);
        if(eventName==null){
            throw new Error("event name is invalid!");
        }

        if(!(typeof fn === "function")){
            throw new Error("function is invalid!");
        }

        let handle=this._eventHandler[eventName];
        if(handle==null){
            handle=new Handler();
            handle.add(fn,data)
            this._eventHandler[eventName]=handle;
        }



    }

    off(eventName,fn){
        eventName=validateEventName(eventName);
        if(eventName==null){
            return;
        }
        let handle=this._eventHandler[eventName];
        if (handle != null) {
            if (fn != null) {
                handle.remove(fn);
            }
            delete this._eventHandler[eventName];
        }
    }

    emit(eventName,sender,data){
        eventName=validateEventName(eventName);
        if(eventName==null){
           return;
        }
        let handle=this._eventHandler[eventName];
        if (handle != null) {
            handle.invoke(sender, data);
        }
    }

}


export default EventBus;