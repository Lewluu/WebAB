const item = document.querySelector('.layout-draggable');

item.addEventListener('dragstart', DragStart);

function DragStart(e){
    console.log("Drag starts...");
}

function HelloWorld(){
    console.log("Hello world!");
}

function arrowOnClick(arrow_nr){
    //var el=document.getElementById("arrow-rotate");
    var menu_arrow=document.getElementsByClassName("arrow-rotate");
    var tools=document.getElementsByClassName("tool-section-display");
    if(menu_arrow[arrow_nr].style.transform!="rotate(90deg)"){
        menu_arrow[arrow_nr].style.transform="rotate(90deg)";
        tools[arrow_nr].style="display:block";
    }
    else{
        menu_arrow[arrow_nr].style.transform="rotate(0deg)";
        tools[arrow_nr].style="display:none";
    }
}