const item = document.querySelector('.layout-draggable');

item.addEventListener('dragstart', DragStart);

function DragStart(e){
    console.log("Drag starts...");
}

function HelloWorld(){
    console.log("Hello world!");
}

function arrowOnClick(){
    //var el=document.getElementById("arrow-rotate");
    var el=document.getElementsByClassName("arrow-rotate");
    if(el[0].style.transform!="rotate(90deg)")
        el[0].style.transform="rotate(90deg)";
    else
        el[0].style.transform="rotate(0deg)";
    console.log(el[0].style.transform);
}