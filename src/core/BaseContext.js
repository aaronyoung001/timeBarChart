/**
 * Created by Aaron on 2019/10/21.
 */


const BaseContext=(context)=>{


    context.fillRect=context.fillRect.beforeDraw(function(){

    });


    return context;


}


Function.prototype.beforeDraw=function(beforeTransition){
    const __self = this;
    return function() {
        beforeTransition.apply(this, arguments);
        return __self.apply(this, arguments);
    }

}


export default BaseContext;