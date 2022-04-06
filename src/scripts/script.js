/// <reference path="../../typings/globals/jquery/index.d.ts" />

$(document).ready(function(){
    $(".new-project-form").on("submit",function(e){
        e.preventDefault();
        var form_val={};
        var form_data=$(".new-project-form").serializeArray();
        $.each(form_data,function(i,field){
            form_val[field.name]=field.value;
        });
        $.ajax({
            type: "POST",
            url: "src/include/create_project.php",
            data: form_data,
            success: function(){
                $(".popup-new-project").css("display","none");
                loadProject(form_val["project_name"]);
                alert("Project "+form_val["project_name"]+" was created!");
            },
            error: function(){
                alert("Project creation failed!");
            }
        });
    });

    //menu project options
    var options=document.getElementsByClassName("menu-project-option");
    $(options[2]).on("click",function(e){
        e.preventDefault();
        openPopUp(3);
        var projects=[];
        $.getJSON("src/include/upload_project.php",function(data){
            projects=data;
            for(var i=0;i<projects.length;i++)
                console.log(projects[i]);
        });
    })
});

function loadProject(projectName){
    var path="src/out/"+projectName+"/index.html";
    $(".iframe-panel").attr("src",path);
}

function openPopUp(option){
    var popup_window;
    switch(option){
        case 1:
            break;
        case 2:
            popup_window=document.getElementsByClassName("popup-new-project");
            popup_window[0].style="display:block;";
            break;
        case 3:
            popup_window=document.getElementsByClassName("popup-upload-project");
            popup_window[0].style="display:block";
            break;
        case 4:
            break;
        case 5:
            break;
        default: break;
    }
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

function optionOnClick(option){
    var popup_window;
    switch(option){
        case 1:
            break;
        case 2:
            popup_window=document.getElementsByClassName("popup-new-project");
            popup_window[0].style="display:block;";
            break;
        case 3:
            popup_window=document.getElementsByClassName("popup-upload-project");
            popup_window[0].style="display:block";
            break;
        case 4:
            break;
        case 5:
            break;
        default: break;
    }
}

function closePopUp(popup_nr){
    switch(popup_nr){
        case 1:
            var popup_window=document.getElementsByClassName("popup-new-project");
            popup_window[0].style="display:none";
            break;
        case 2:
            var popup_window=document.getElementsByClassName("popup-upload-project");
            popup_window[0].style="display:none";
            break;
        default:
            break;
    }
}