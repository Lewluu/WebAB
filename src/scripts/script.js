const item = document.querySelector('.layout-draggable');

item.addEventListener('dragstart', DragStart);

function DragStart(e){
    console.log("Drag starts...");
}

function HelloWorld(){
    console.log("Hello world!");
}