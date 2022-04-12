/// <reference path="../../typings/globals/jquery/index.d.ts" />

$(document).ready(function(){
    //getting project main menu options, then handling the forms 
    var options=document.getElementsByClassName("menu-project-option");
    var projects=[];
    var sp;

    //new project option
    $(options[1]).on("click",function(e){
        e.preventDefault();
        openPopUp(2);
        //close all others popups
        closePopUp(3);
        closePopUp(5);
    });

    //upload project option
    $(options[2]).on("click",function(e){
        e.preventDefault();
        openPopUp(3);
        //close all others popups
        closePopUp(2);
        closePopUp(5);
        $.getJSON("src/include/upload_project.php",function(data){
            var html_content=String();
            projects=data;
            for(var i=0;i<projects.length;i++){
                html_content+="<p class='project-from-directory'>"+projects[i]+"</p>"
            }
            $(".projects-list-box").html(html_content);
            //selecting existing projects
            var tsp=document.getElementsByClassName("project-from-directory");
            $(tsp).each(function(){
                $(this).on("click",function(e){
                    //copy the content of selected project into 'sp' variable
                    sp=$(this).html();
                    //removing bg for unselected projects and updating bg for selected
                    $(tsp).addClass("unselected-project");
                    $(tsp).removeClass("selected-project");
                    $(this).removeClass("unselected-project");
                    $(this).addClass("selected-project");
                });
            });
        });
    });

    //delete project option
    $(options[4]).on("click",function(e){
        e.preventDefault();
        openPopUp(5);
        //close all others popups
        closePopUp(2);
        closePopUp(3);
        $.getJSON("src/include/upload_project.php",function(data){
            var html_content=String();
            projects=data;
            for(var i=0;i<projects.length;i++){
                html_content+="<p class='project-from-directory'>"+projects[i]+"</p>"
            }
            $(".projects-list-box").html(html_content);
            //selecting existing projects
            var tsp=document.getElementsByClassName("project-from-directory");
            $(tsp).each(function(){
                $(this).on("click",function(e){
                    //copy the content of selected project into 'sp' variable
                    sp=$(this).html();
                    //removing bg for unselected projects and updating bg for selected
                    $(tsp).addClass("unselected-project");
                    $(tsp).removeClass("selected-project");
                    $(this).removeClass("unselected-project");
                    $(this).addClass("selected-project");
                });
            });
        });
    })
    
    //new project form
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

    //upload project form
    $(".upload-project-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            success: function(){
                console.log(sp);
            },
            error: function(){
            }
        });
    });
    
    //delete project form
    $(".delete-project-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            success:function(){
            },
            error:function(){
            }
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
            popup_window=document.getElementsByClassName("popup-delete-project");
            popup_window[0].style="display:block";
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

function closePopUp(popup_nr){
    switch(popup_nr){
        case 2:
            var popup_window=document.getElementsByClassName("popup-new-project");
            popup_window[0].style="display:none";
            break;
        case 3:
            var popup_window=document.getElementsByClassName("popup-upload-project");
            popup_window[0].style="display:none";
            break;
        case 5:
            var popup_window=document.getElementsByClassName("popup-delete-project");
            popup_window[0].style="display:none";
            break;
        default:
            break;
    }
}