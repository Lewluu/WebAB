/// <reference path="../../typings/globals/jquery/index.d.ts" />

$(document).ready(function(){
    $(".new-project-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "src/include/create_project.php",
            data: $(".new-project-form").serialize(),
            success: function(){
                $(".popup-new-project").css("display","none");
                alert("Project was created!");
            },
            error: function(){
                alert("Project creation failed!");
            }
        });
    });
});

// function createProject(){
//     var form_element=document.getElementsByClassName("form-data");
//     var form_data=new FormData();
//     for(var count=0;count<form_element.length;count++){
//         form_data.append(form_element[count].name,form_element[count].value);
//     }
//     document.getElementsByClassName("new-project-submit-button")[0].disabled=true;

//     var xmlhttp=new XMLHttpRequest();
//     xmlhttp.open("POST","src/include/create_project.php");
//     xmlhttp.send(form_data);
//     xmlhttp.onreadystatechange=function(){
//         if(this.readyState==4 && this.status==200){
//             document.getElementsByClassName("new-project-submit-button")[0].disabled=false;
//             document.getElementsByClassName("new-project-form")[0].reset();
//         }
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
            popup_window[0].style="display:block;";
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