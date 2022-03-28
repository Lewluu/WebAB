$(document).ready(function(){
    $("#new_project_submit").submit(function(){
        $(document).load("src/include/create_project.php");
    });
});

// function createProject(){
//     var xmlhttprequest=new XMLHttpRequest();
//     xmlhttprequest.onreadystatechange=function(){
//         if(this.readyState==4 && this.status==200){
//             //nothing happens
//         }
//         xmlhttprequest.open("POST","src/include/create_project.php",true);
//         xmlhttprequest.send();
//     }
// }

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

function optionOnClick(option){
    var option_pressed=document.getElementsByClassName("menu-project-option");
    switch(option){
        case 1:
            break;
        case 2:
            var popup_window=document.getElementsByClassName("popup-new-project");
            popup_window[0].style="display:block";
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        default: break;
    }
}

function closePopUp(popup_nr){
    if(popup_nr==0){
        var popup_window=document.getElementsByClassName("popup-new-project");
        popup_window[0].style="display:none";
    }
}