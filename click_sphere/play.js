var h=window.innerHeight;
var w=window.innerWidth;
var circles=[];
const n=3; //amount of circles
const rad=100; 
var col_h,col_s,col_l,col_b;
const duration=300; //milisecond   

var body=document.getElementsByTagName("body")[0];
body.style.position="relative";
body.style.backgroundColor="#9e9e9e";
body.style.alignItems="center";

//**** create as much circles as much that we want *****/
// be carefull, if we have big number of n, then the programm will not be able to find the position without overlapping, and will crush. for now, we assume that n=3
for (let i=0;i<n;i++){
    createCircle(circles,i);  
    circles[i].addEventListener("click",e=>{clicked(i)});
}



function takeIt(num){
    return Math.floor(Math.random()*num);
}




//Create circle and at the same time check if there is overlap

function createCircle(obj,i){
    
    var circle=document.createElement("div");
    circle.innerHTML=1;
    circle.style.display="flex";
    circle.style.alignItems="center";    
    circle.style.justifyContent="center";    
    circle.style.color="white";
    circle.style.height=rad*2+"px";
    circle.style.width=rad*2+"px";
    circle.style.borderRadius="50%";
    circle.style.position="absolute";
    circle.style.cursor="pointer";
    circle.style.fontSize="50px";
    obj.push(circle);
    getColor();
    document.body.appendChild(obj[obj.length-1]);
    obj[obj.length-1]=getNewPosition(obj,obj.length-1,false);
    return ;

}


function getNewPosition(object,id,animated){
    let old_left=object[id].style.left;
    let old_top=object[id].style.top;

    object[id].style.left=takeIt(w-rad*2)+"px";
    object[id].style.top=takeIt(h-rad*2)+"px";
    for(let i=0;i<object.length;i++){
        if(id!==i){
            // console.log("id="+id+", i="+i);
            if(distance(object[id].style.left,object[i].style.left,object[id].style.top,object[i].style.top)<=rad*2){
                getNewPosition(object,id,false);
                break;
            }
        }
    }

    if(animated===true){
        move(object[id],old_left,old_top);
    }

    //if we wanted the exact coordinates, w
    // object[id].style.left=new_left;
    // object[id].style.top=new_top;

    return object[id];
}

function getColor(){
    col_h=takeIt(360);
    col_s=takeIt(100);
    col_l=10+takeIt(20);
    col_b=col_l+60;
    body.style.backgroundColor="hsl(" + col_h + "," + col_s + "%," + col_b + "%)";
    for(let i=0;i<circles.length;i++){
        circles[i].style.backgroundColor="hsl(" + col_h + "," + col_s + "%," + col_l + "%)"
    }
    return ;
}

function distance(sx1,sx2,sy1,sy2){
    x1=Number(sx1.slice(0,-2));
    x2=Number(sx2.slice(0,-2));
    y1=Number(sy1.slice(0,-2));
    y2=Number(sy2.slice(0,-2));
    return(Math.sqrt((x2-x1)**2+(y2-y1)**2));
}

function clicked(i){
    circles[i].innerHTML=Number(circles[i].innerHTML)+1;
    circles[i]=getNewPosition(circles,i,true);
    getColor();
}

function move(elem,left,top){
    var new_left=Number(elem.style.left.slice(0,-2));
    var new_top=Number(elem.style.top.slice(0,-2));
    elem.style.left=left;   //in order not be seeing at the new place before the animation
    elem.style.top=top;
    var left=Number(left.slice(0,-2));
    var top=Number(top.slice(0,-2));
    const interval=25; 
    var distanceX=left-new_left;
    var stepX=distanceX/duration*interval;
    var distanceY=top-new_top;
    var stepY=distanceY/duration*interval;
    var id=null;
    clearInterval(id);
    id=setInterval(frame,interval);
    

    function frame(){

        if(Math.abs(left-new_left)<=Math.abs(stepX) && Math.abs(top-new_top)<Math.abs(stepY)){
            elem.style.left=new_left+"px";
            elem.style.top=new_top+"px";
            clearInterval(id);
        } else{
            if(Math.abs(left-new_left)>=Math.abs(stepX)){
                left-=stepX;
                elem.style.left=left+"px";
            }
            if(Math.abs(top-new_top)>=Math.abs(stepY)){
                top-=stepY;
                elem.style.top=top+"px";
            }
        }
    }
    return;
}