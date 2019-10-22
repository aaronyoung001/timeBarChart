/**
 * Created by Aaron on 2019/10/12.
 */

import TimeBar from "./compoments/charts/TimeBar";
import EventBus from "@/core/EventBus"
import EventHandler from "@/core/EventHandler";


const App=(dom,options)=>{


    let eventBus=new EventBus();


    TimeBar(dom,options,eventBus);

    EventHandler(dom,eventBus);





}


window.Charts=App;

