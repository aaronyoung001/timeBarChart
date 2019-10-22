/**
 * Created by Aaron on 2019/10/21.
 */


class ChartsStack{

    constructor(){
        this.stacks=new Array();
        this.elements=new Object();
    }



    pop(){
        let item=this.stacks.shift();
        if(!!item&&!!item.id){
            Reflect.deleteProperty(this.elements,item.id);
        }
        return item;
    }


    push(chart){
        if(!!chart.id&&!Reflect.has(this.elements,chart.id)){
            Reflect.set(this.elements,chart.id,true);
            this.stacks.unshift(chart);
        }

    }


    all(){
        return this.stacks;
    }


    peek(){
        if(this.stacks!=null&&this.stacks.length>0){
            return this.stacks[0]
        }
        return null;

    }



    empty(){
        this.elements=new Object();
        return this.stacks.length=0;
       
    }
}


export default ChartsStack;