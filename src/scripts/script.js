/// <reference path="../../typings/globals/jquery/index.d.ts" />


$(document).ready(function(){
    // getting project main menu options, then handling the forms 
    var options = document.getElementsByClassName("menu-project-option");
    var arrows = document.getElementsByClassName("arrow-rotate");
    var tool_sections = document.getElementsByClassName("tool-section-display");
    var projects = [];
    var sp;
    
    // debug init
    LewDebug.init();
    LewDebug.setupInterface();

    // drag and drop modules
    Lew.updateDragAndDrop();
    Lew.setDragAndDrop('disable');

    // remove layouts option
    $(".remove-layout").on("click", function(){
        if(Lew.removeLayouts()){
            Lew.layouts_searched = false;
            Lew.resetLayouts();
            Lew.searchForLayouts();
            Lew.clearEdit();
            Lew.editIframe();
        } 
    });

    // arrows scroll
    $(arrows).each(function(index){
        $(this).on("click", function(){
            if(Lew.getRotation($(this)) != 90){
                $(this).css("transform", "rotate(90deg)");
                $(tool_sections[index]).css("display", "block");
            }
            else{
                $(this).css("transform", "rotate(0deg)");
                $(tool_sections[index]).css("display", "none");
            }
        });
    });

    // new project option
    $(options[1]).on("click",function(e){
        e.preventDefault();
        openPopUp(2);
        //close all others popups
        closePopUp(3);
        closePopUp(5);
    });

    // upload project option
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

    // edit project option
    $(options[3]).on("click",function(){
        if(!Lew.project_is_selected)    return;
        if(!(Lew.iframe_is_editable)){
            Lew.searchForLayouts();
            Lew.editIframe();
            Lew.setDragAndDrop('enable');
        }
        else{
            Lew.clearEdit();
            Lew.setDragAndDrop('disable');
            // Lew.resetLayouts();
        }
    });

    // save project option
    $(options[4]).on("click", function(e){
        if(Lew.project_is_selected){
            if(!Lew.iframe_is_editable){
                LewDebug.log("Saving project: <b>" + sp + "</b>");
                
                e.preventDefault();

                var data_html = $("#iframe_panel").contents().find("html").html();

                $.ajax({
                    type: "POST",
                    url: "src/include/save_project.php",
                    data: {
                        project_name: sp,
                        project_html: data_html
                    },
                    success: function(data){
                        if(!data){
                            alert("Successfully saved project: " + sp);
                        }
                        else{
                            LewDebug.log(data);
                        }
                    },
                    error: function(){
                        alert("Failed to save project: " + sp);
                    }
                });
            }
            else{
                LewDebug.log("Content is currently editable. Couldn't save ...");
            }
        }
        else{
            LewDebug.log("Please selected a project first ...");
        }
    });

    // delete project option
    $(options[6]).on("click",function(e){
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
            LewDebug.log("All projects SELECTED for delete!");
        }
        else{
            delete_all=false;
            var tsp=document.getElementsByClassName("project-from-directory");
            $(tsp).each(function(){
                $(this).removeClass("selected-project");
                $(this).addClass("unselected-project");
            });
            LewDebug.log("All projects UNSELECTED for delete!");
        }
    });

    // new project form
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
                Lew.loadProject(form_val["project_name"]);
                sp = form_val["project_name"];
                alert("Project "+form_val["project_name"]+" was created!");
            },
            error: function(){
                alert("Project creation failed!");
            }
        });
    });

    // upload project form
    $(".upload-project-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            success: function(){
                LewDebug.log("Loading project: "+sp);
                Lew.loadProject(sp);

                Lew.searchForLayouts();

                Lew.layouts_searched = false;
                Lew.project_is_selected = true;
            },
            error: function(){
            }
        });
    });
    
    // delete project form
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
            LewDebug.log("Deleting project: "+sp_array[i]);
        }
        closePopUp(5);
        if(sp_array.length>1){
            $("#iframe_panel").removeAttr("src");
        }
        else{
            if($("#iframe_panel").attr("src").includes(sp_array[0])){
                $("#iframe_panel").removeAttr("src");
            }
        }
    });
});

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