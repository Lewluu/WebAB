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
    });
    var delete_all=false;
    $(".delete-all").change(function(){
        if(delete_all==false){
            delete_all=true;
            var tsp=document.getElementsByClassName("project-from-directory");
            $(tsp).each(function(){
                $(this).removeClass("unselected-project");
                $(this).addClass("selected-project");
            });
            console.log("All projects SELECTED for delete!");
        }
        else{
            delete_all=false;
            var tsp=document.getElementsByClassName("project-from-directory");
            $(tsp).each(function(){
                $(this).removeClass("selected-project");
                $(this).addClass("unselected-project");
            });
            console.log("All projects UNSELECTED for delete!");
        }
    });

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
                closePopUp(2);
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
                console.log("Loading project: "+sp);
                loadProject(sp);
            },
            error: function(){
            }
        });
    });
    
    //delete project form
    $(".delete-project-form").on("submit",function(e){
        e.preventDefault();
        
        var tsp=document.getElementsByClassName("project-from-directory");
        var sp_array=[];
        $(tsp).each(function(){
            if($(this).hasClass("selected-project")){
                sp_array.push($(this).html());
            }
        });
        for(var i=0;i<sp_array.length;i++){
            $.post("src/include/delete_project.php",
                {
                    project_name:sp_array[i]
                },
                function(data){
                    console.log(data);
                }
            );
            console.log("Deleting project: "+sp_array[i]);
        }
        closePopUp(5);
        if(sp_array.length>1){
            $("#iframe_panel").remove("src");
        }
        else{
            if($("#iframe_panel").attr("src").includes(sp_array[0])){
                $("#iframe_panel").removeAttr("src");
            }
        }
    });

    //iframe editor
    $(".remove-layout").on("click",function(){
        editIframe();
    });
});

function editIframe(){
    var element=$("#iframe_panel").contents().find(".layout1-editable");
    console.log(element.css("background-color","red"));
}

function removePanelProject(project){
    if(project=="all")
        $("#iframe_panel").removeAttr("src"); 
    // $(".
    console.log($("#iframe_panel").attr("src"));
}

function loadProject(projectName){
    var path="src/out/"+projectName+"/index.html";
    $("#iframe_panel").attr("src",path);
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