
# TimeBarChart
---

## Showcase
![Demo](https://github.com/aaronyoung001/timeBarChart/blob/master/demo.gif "Demo")

## Description
-It's a demo project for practice

-Use canvas to draw a bar chart,and animate it when time change

-User can control the animation to play or pause


## How to install
yarn install  or  npm install

## How to start
yarn run start  or npm run start

## How to build
yarn run build   or  npm run build

## How to use
 1.use bundle js ,import js with script element

 eg:
   <script src='./charts.js'></script>

    Charts(document.getElementById("canvas"),{

        yAxisLabel:['CHINA','INDIA','JAPAN','UK','USA'],
        styles:{
            offsetTop:50,
            offsetLeft:50,
            offsetBottom:50,
            offsetRight:50
        },
        timeZone:["1990年","1991年","1992年","1993年","1994年","1995年","1996年"],
        data:{"CHINA":[150,200,330,400,600,650,930],"INDIA":[130,210,250,360,340,450,500],"JAPAN":[200,280,300,320,540,620,660],"UK":[180,260,200,280,290,510,420],"USA":[250,360,470,600,750,900,1200]},
        barStyle:{
            height:30,//柱状图宽度
            colors:['#1abc9c','#F44336','#2196F3','#FF9800','#3F51B5']//柱状图颜色
        },

        interval:1000,
        height:500,
        width:900
    });

 



