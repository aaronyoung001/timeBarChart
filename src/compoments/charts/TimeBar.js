

import BarView from '@/compoments/charts/Bar/BarView';
import TimeZone from "@/compoments/charts/Bar/TimeZone"
import Tools from "@/compoments/charts/Bar/Tools";
import Tip from "@/compoments/charts/Bar/Tip";

import {getGraphHeight,AxisView,getGraphWidth} from '@/compoments/charts/AxisView'



import {mergeAll,merge} from 'ramda';

let playState=true;
let eb=null;
let tipWindow=null;
const TimeBar=(canvasDom,option,eventBus)=>{

    const context = canvasDom.getContext('2d');

    eb=eventBus;


    eventBus.on("togglePlay",function(sender,data,obj){
        playState=!playState;

        if(playState){
            startDrawing(context,options)
        }
        eventBus.emit("playStateChange",context,playState)
    });

    eventBus.on("hoverBar",function(sender,data,obj){
      if(!playState&&!!data){//动画不播放的时候可现实悬浮提示
          if(tipWindow===null)tipWindow=new Tip(eventBus);
          drawGraph(context,options);//重新绘制全图
          tipWindow.draw(context,data.mouseP._x,data.mouseP._y,data.item)
      }else{
          drawGraph(context,options);//重新绘制全图
      }

    });


    //绘图配置
    let options = merge({},option);

    options.eventBus=eventBus;


    let countrys= Object.keys(options.data);
    let maxValue=0;
    //临时的排序方法
    let yearDatas=options.timeZone.reduce((arr,item,index)=>{

        let yearData=countrys.map(skey=>{
            let value=options.data[skey][index];
            if(maxValue<value)maxValue=value;
            let returnData=new Object();
            returnData[skey]=value;
            returnData["value"]=value;
            returnData["label"]=skey;
            returnData["color"]=options.barStyle.colors[options.yAxisLabel.indexOf(skey)];
            return returnData;
        }).sort((a,b)=>a.value-b.value)
        arr.push(yearData);
        return arr;


    },[]);
    options.data=yearDatas;

    options.maxValue=maxValue;



    startDrawing(context,options);



}







/**
 * 绘制bar数据
 */
const drawData=(context,options,consumingTime)=> {
    let data = options.data[currentIndex];
    let nextData=((currentIndex+1)>options.data.length)?null:options.data[currentIndex+1];
    let xAxisLength = getGraphWidth(options);
    let yAxisLength =  getGraphHeight(options);
    let axisGap = yAxisLength / (options.yAxisLabel.length );
    let maxValue=options.xAxisLabel[options.xAxisLabel.length-1];

    BarView(context,mergeAll([options,{currentData:data,nextData,xAxisLength,yAxisLength,axisGap,consumingTime,maxValue}]),eb)

}


let timezone=null;
/**
 * 绘制时间区域
 * @param context
 * @param options
 * @param currentTimeIndex
 */
const drawTimeZone=(context,options,currentTimeIndex)=>{
    let label = options.timeZone[currentTimeIndex];
    const eventBus=options.eventBus;
    if(timezone==null)timezone=new TimeZone(options.width-options.styles.offsetRight ,options.height-options.styles.offsetBottom-40,"40px Arial",'#888888',eventBus);
    timezone.draw(context,label);

}


let chartTool=null;

const drawTools=(context,options)=>{
    const eventBus=options.eventBus;
    if(chartTool==null)chartTool=new Tools(options.width-options.styles.offsetRight ,options.styles.offsetBottom,eventBus);
    chartTool.draw(context);
}



let lastTimestamp=null,timeGap=0,currentIndex=0;


/**
 * 循环调用绘图方法
 * @param context
 * @param options
 */
const startDrawing=(context,options)=>{

    if(lastTimestamp!=null){
        timeGap=(new Date()).getTime()-lastTimestamp.getTime();
        if(timeGap>=options.interval){
            currentIndex++;
            timeGap=0;
            //if(currentIndex==2)return;
            if(currentIndex>options.timeZone.length-1){
                playState=false;
                currentIndex=0;
                timeGap=0;
                lastTimestamp=null;
                eb.emit("playStateChange",context,false);//播放结束,通知其他地方
                return;
            }
            lastTimestamp=new Date();
        }
        //console.log(timeGap)

    }else{
        lastTimestamp=new Date();
        timeGap=0;
    }

    drawGraph(context,options,timeGap);

    window.requestAnimationFrame(()=>{
        if(playState)startDrawing(context,options)
    });
}


/**
 * 真实的重绘全图方法
 * @param context
 * @param options
 */
const drawGraph=(context,options)=>{
    context.clearRect(0,0,options.width,options.height);
    eb.emit("clearPath",null,null);
    AxisView(context,options); //绘制坐标轴
    drawData(context,options,timeGap);//绘制柱状图
    drawTimeZone(context,options,currentIndex);
    drawTools(context,options);//绘制工具栏
}



export default TimeBar;