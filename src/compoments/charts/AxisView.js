/**
 * Created by Aaron on 2019/10/21.
 */
const AxisView=(context,options)=>{
    options.xAxisLabel=caculateXRange(options.maxValue);
    drawXAxis(context,options);
    drawXLabels(context,options);
}

const MAX_X_SEPETOR_NUM=7;


/**
 * 获取x轴显示范围
 * @param maxRange
 * @returns {Array}
 */
const caculateXRange=(maxRange)=>{
    if(maxRange!=null&&(typeof maxRange==='number')){

        let sv=Math.ceil(maxRange/MAX_X_SEPETOR_NUM);

        let numLength=sv.toString().length;
        let seperatorMi=Math.pow(10,numLength-1);
        let seperatorValue=Math.ceil(sv/seperatorMi)*seperatorMi;
        let returnXLabel=new Array();
        for(let i=0;i<MAX_X_SEPETOR_NUM+1;i++){
            returnXLabel.push((i)*seperatorValue);
        }


        return returnXLabel;

    }
    return new Array();

}
/**
 * 画x轴
 * @param context
 * @param options
 */
const drawXAxis=(context,options)=>{

    context.strokeWidth = 2;
    context.strokeStyle = '#353535';
    context.moveTo(getStartPoint(options)[0],getStartPoint(options)[1]);
    context.lineTo(getYLine(options)[0],getYLine(options)[1]); //y轴总高从50到700
    context.lineTo(getXLine(options)[0],getXLine(options)[1]); //x轴总长从50到1000
    context.stroke();
}



/**
 * 绘制x轴坐标
 */
const drawXLabels=(context,options)=> {
    let labels = options.xAxisLabel;
    if(labels!=null&&labels.length>0){
        let xLength = getGraphWidth(options);
        let gap = xLength / (labels.length-1);

        labels.forEach(function (label, index) {
            //绘制坐标文字

            context.fillStyle = '#a7a4a4';
            context.font =  "18px Arial"
            let offset = context.measureText(label).width;
            context.fillText(label, options.styles.offsetLeft + (index ) * gap - offset/2 ,options.height-options.styles.offsetBottom + 20);
            //绘制小竖线
            context.beginPath();
            context.strokeStyle = '#353535';
            context.moveTo(options.styles.offsetLeft + (index ) * gap  ,options.height-options.styles.offsetBottom);
            context.lineTo(options.styles.offsetLeft + (index ) * gap ,options.height-options.styles.offsetBottom+5);
            context.stroke();
            //存储偏移量
            options.offsetXLabel = offset / 2;
        });
    }

}



//获取坐标轴起始节点
const getStartPoint=(opt)=>{
    return [opt.styles.offsetLeft,opt.styles.offsetTop];

}


const getYLine=(opt)=>{
    return [opt.styles.offsetLeft,opt.height-opt.styles.offsetBottom];

}

const getXLine=(opt)=>{
    return [opt.width-opt.styles.offsetRight,opt.height-opt.styles.offsetBottom];

}




const getGraphHeight=(opt)=>{

    return opt.height-opt.styles.offsetBottom-opt.styles.offsetTop;
}

const getGraphWidth=(opt)=>{

    return opt.width-opt.styles.offsetRight-opt.styles.offsetLeft;
}



export  {AxisView,getGraphHeight,getGraphWidth};