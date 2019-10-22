/**
 * Created by Aaron on 2019/10/21.
 */
import Bar from "@/compoments/charts/Bar/Bar"
import Label from "@/compoments/charts/Bar/Label"



const BarView=(context,options,eventBus)=>{


        let data = options.currentData;
        let nextData=options.nextData;



        let _xAxisLength = options.xAxisLength;
        let _yAxisLength =   options.yAxisLength;
        let _axisGap = options.axisGap
        let _consumingTime=options.consumingTime;
        let _interval=options.interval
        let _maxValue=options.maxValue;



        //绘制矩形
        data.forEach(function (item, index) {
            let offsetValue=0;
            let offsetY=0;
            if(nextData!=null){
                let nextItemIndex=nextData.findIndex(sitem=>sitem.label===item.label);
                let nextItem=nextData[nextItemIndex];
                offsetValue=(nextItem.value-item.value)*_consumingTime/_interval;
                offsetY=-(nextItemIndex-index)*_axisGap*_consumingTime/_interval;

            }

            //绘制小间隔
            context.beginPath();
            context.strokeStyle = '#353535';
            context.moveTo(options.styles.offsetLeft-10, _yAxisLength -  index * _axisGap);
            context.lineTo(options.styles.offsetLeft,_yAxisLength - index * _axisGap);
            context.stroke();


            //绘制坐标文字
            let text=item.label;
            let label=new Label(options.styles.offsetLeft ,_yAxisLength - index * _axisGap+offsetY,"12px Arial","#888888");
            label.draw(context,text);




            //绘制bar
            let x0 =options.styles.offsetLeft+1;
            let height=options.barStyle.height;;
            let y0=_yAxisLength- index * _axisGap-options.barStyle.height/2+offsetY;
            let width =(item.value+offsetValue) / _maxValue * (_xAxisLength);
            if(item.label==="USA"){
              //  console.log((item.value+offsetValue)/ _maxValue )
            }

            let bar=new Bar(x0,y0,width,height,item.color,eventBus);
            bar.draw(context,text,item.value+offsetValue);


            //context.fillRect(x0,y0,width,height);


        });
    


}


export default BarView;