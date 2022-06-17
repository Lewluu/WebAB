var Lew = {
    layouts_arr: [],
    iframe_is_editable: false,
    project_is_selected: false,
    layouts_searched: false,
    iframe_droppable: "",
    is_dropable: false,
    layout_draggable: "",
    initLayoutSection: function(){
        this.layout_draggable = document.querySelector(".layout-draggable");

        this.layout_draggable.addEventListener('dragstart', this.dragStartFunc);
    },
    dragStartFunc(e){
        e.dataTransfer.setData("text/plain", e.target.classList);

        LewDebug.log("Layout selected for dragging ...");

        // for removing display
        // setTimeout(()=>{
        //     $(".layout-draggable").css("display", "none");
        // }, 1000);
    },
    setDroppable(){
        this.iframe_droppable = document.querySelector(".layout-droppable");

        this.iframe_droppable.addEventListener('dragenter', this.dragEnterFunc);
        this.iframe_droppable.addEventListener('dragover', this.dragOverFunc);
        this.iframe_droppable.addEventListener('dragleave', this.dragLeaveFunc);
        this.iframe_droppable.addEventListener('drop', this.dropFunc);

        this.is_dropable = true;
    },
    dragEnterFunc(e){
        e.preventDefault();

        LewDebug.log("Layout entered ...");
    },
    dragOverFunc(e){
        e.preventDefault();

        LewDebug.log("Layout is dragged over ...");
    },
    dragLeaveFunc(e){
        LewDebug.log("Layout leaved ...");
    },
    dropFunc(e){
        LewDebug.log("Layout dropped ...");
    },
    loadProject: function(projectName){
        var path="./src/out/" + projectName + "/index.html";
        $("#iframe_panel").attr("src",path);

        $(document.getElementById("iframe_panel")).css("background-color","white");
    }
    ,
    searchForLayouts: function(){
        var iframe_el_arr = $("#iframe_panel").contents().find(".layout-editable");
        var layout_arr_temp = [];

        $(iframe_el_arr).each(function(index){
            let layout = new LewLayout();
            
            layout.init();
            layout.setLayoutNumber(index + 1);

            var layout_name = ".layout-editable-" + String(index + 1);
            layout.setLayout(layout_name);

            layout_arr_temp.push(layout);

            var sel_layout = document.getElementsByClassName("selected-layout");
            var sel_layout_str = $(sel_layout).html();
            if(!sel_layout_str.includes(layout_name)){
                var curr_html = $(sel_layout).html();
                $(sel_layout).html(
                    curr_html + 
                    "<div class='selected-layout-el selected-layout-el-"
                     + String(index + 1) + 
                     "' style='display:none'> <p>" + 
                    layout_name + 
                    "</p> <img style='display:none' src='src/icons/close.png'> </div>"
                    );
            }
        });

        LewDebug.log("Searched for layouts. Found: " + String(layout_arr_temp.length));

        this.layouts_arr = layout_arr_temp;
    },
    editIframe: function(){
        var iframe = document.getElementById("iframe_panel");

        $(iframe).css("border-style","double");
        $(iframe).css("border-width","2px");
        $(iframe).css("border-color","rgb(137, 238, 183)");

        $(this.layouts_arr).each(function(){
            this.Edit();
            this.Update();
        });

        this.iframe_is_editable = true;

        this.setDroppable();
    },
    clearEdit: function(){
        var iframe = document.getElementById("iframe_panel");

        $(iframe).css("border-style","");
        $(iframe).css("border-width","");
        $(iframe).css("border-color","");

        $(this.layouts_arr).each(function(){
            this.Unedit();
        });

        this.iframe_is_editable = false;
    },
    removeLayouts: function(){
        var layout_arr_temp = this.layouts_arr;
        var found_layouts = false;

        $(this.layouts_arr).each(function(){
            if(this.removeLayout()){
                layout_arr_temp.pop(this);
                found_layouts = true;
            }
        });

        this.layouts_arr = layout_arr_temp;

        return found_layouts;
    }
    ,
    getRotation: function(obj){
        var matrix = 
        obj.css("-webkit-transform") ||
        obj.css("-moz-transform") ||
        obj.css("-ms-transform") ||
        obj.css("-o-transform") ||
        obj.css("transform");

        if(matrix != "none"){
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        }
        else{
            var angle = 0;
        }
        return (angle < 0) ? angle + 360 : angle;
    }
};