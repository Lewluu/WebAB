var Lew = {
    layouts_arr: [],
    iframe_is_editable: false,
    project_is_selected: false,
    layouts_searched: false,
    iframe_droppable: "",
    is_dropable: false,
    layout_draggable: "",

    loadProject: function(projectName){
        var path="./src/out/" + projectName + "/index.html";
        $("#iframe_panel").attr("src",path);

        $(document.getElementById("iframe_panel")).css("background-color","white");
    },
    searchForLayouts: function(){
        var iframe_el_arr = $("#iframe_panel").contents().find(".layout-editable");
        var layout_arr_temp = [];

        $(iframe_el_arr).each(function(index){
            let layout = new LewLayout();
            
            layout.init();
            layout.setLayoutNumber(index + 1);

            // adding new class with index and setting name for every layout
            var layout_name = ".layout-editable-" + String(index + 1);
            layout.setLayout(layout_name);
            $(this).addClass(layout_name.replace(".", ""));
            layout.searchForSubLayouts();

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

        this.layouts_arr = layout_arr_temp;
    },
    resetLayouts: function(){
        // removing layouts classes
        var layouts = $("#iframe_panel").contents().find(".layout-editable");
        $(layouts).each(function(){
            var layout_classes = $(this).attr('class').split(/\s+/);
            for(var i=0;i<layout_classes.length;i++){
                if(layout_classes[i].includes("layout-editable-")){
                    $(this).removeClass(layout_classes[i]);
                    break;
                }
            }
        })

        // removing selected layouts
        $(".selected-layout-el").each(function(){
            $(this).remove();
        });

        // removing sublayouts classes
        var sublayouts = $("#iframe_panel").contents().find(".sublayout-editable");
        $(sublayouts).each(function(){
            var sublayout_classes = $(this).attr('class').split(/\s+/);
            for(var i=0;i<sublayout_classes.length;i++){
                if(sublayout_classes[i].includes("-sublayout-editable-")){
                    $(this).removeClass(sublayout_classes[i]);
                    break;
                }
            }
        });

        // removing selected sublayouts
        $(".selected-sublayout-el").each(function(){
            $(this).remove();
        });
    },
    // drag and drop method
    updateDragAndDrop: function(){
        $(".layout-draggable").draggable({
            revert: true,
            revertDuration: 250,
            iframeFix:true,
            drag: function(){
                $(".layout-draggable").css("position", "absolute");
            },
            stop: function(){
                $(".layout-draggable").css("position", "static");
            }
        });

        $("#iframe_panel").droppable({
            drop: function(){
                LewDebug.log("layout: dropped in: ");

                $(".layout-draggable").css("position", "static");

                var iframe_body = $("#iframe_panel").contents().find("body");

                iframe_body.append(
                    "<div class='layout-editable' style='margin-bottom:0.25%;width:100%;height:75px;display:flex;align-items:center;background-color:none;border-style:double;border-width:2px;border-color:orange;'></div>"
                    );

                // removing temporary layout
                var layout_temp = $("#iframe_panel").contents().find(".layout-editable-temp");
    
                layout_temp.remove();
                
                // scanning for new added layouts
                Lew.searchForLayouts();
                Lew.editIframe();
            },
            out: function(){

                LewDebug.log("layout leaving panel ");

                // removing temporary layout
                var layout_temp = $("#iframe_panel").contents().find(".layout-editable-temp");
                layout_temp.remove();
            },
            hoverClass: function(){
                LewDebug.log("layout: dragged over: ");

                // adding temporary layout
                var layout_temp = $("#iframe_panel").contents().find("body");
                layout_temp.append(
                    "<div class='layout-editable-temp' style='margin-bottom:0.25%;width:100%;height:75px;display:flex;align-items:center;flex-wrap:wrap;background-color:none;border-style:dashed;border-width:2px;border-color:blue;'></div>"
                    );
                
                var layout_base = $("#iframe_panel").contents().find(".layout-editable");
                $(layout_base).droppable({
                    drop: function(){
                        $(".layout-draggable").css("position", "static");

                        var layout_classes = $(this).attr('class').split(/\s+/);
                        for(var i=0;i<layout_classes.length;i++){
                            if(layout_classes[i].includes("layout-editable-")){
                                var layout_parent = layout_classes[i];
                                break;
                            }
                        }

                        LewDebug.log("sublayout dropped over <b>" + layout_parent + "</b>");

                         // removing temporary layout, in case of overlapping
                        var layout_temp = $("#iframe_panel").contents().find(".layout-editable-temp");
                        layout_temp.remove();

                        // removing temporary sublayout
                        var layout_temp = $("#iframe_panel").contents().find(".sublayout-editable-temp");
                        layout_temp.remove();

                        var layout_indexed = $("#iframe_panel").contents().find("." + layout_parent);
                        layout_indexed.append(
                            "<div class='sublayout-editable' style='width: 135px; height: 45px; margin-left:0.5%; margin-top:0.5%; margin-bottom:0.5%; background-color:#FFFFFF;border-style:double;border-width:2px;border-color:orange; resize:none; '></div>"
                        );

                        // scanning for new added sublayouts
                        Lew.searchForLayouts();
                        Lew.editIframe();
                    },
                    hoverClass: function(){
                        // getting necesary parent layout
                        var layout_classes = $(this).attr('class').split(/\s+/);
                        for(var i=0;i<layout_classes.length;i++){
                            if(layout_classes[i].includes("layout-editable-")){
                                var layout_parent = layout_classes[i];
                                break;
                            }
                        }

                        LewDebug.log("sublayout dragged over <b>" + layout_parent + "</b>");

                        // disabling droping option of iframe for dropping into a layout
                        $("#iframe_panel").droppable("option", "disabled", true);

                        // adding temporary sublayout
                        var layout_indexed = $("#iframe_panel").contents().find("." + layout_parent);
                        layout_indexed.append(
                            "<div class='sublayout-editable-temp' style='width: 135px; height: 45px; margin-left:0.5%; margin-top:0.5%; margin-bottom:0.5%; background-color:none;border-style:dashed;border-width:2px;border-color:blue;'></div>"
                        );
                    },
                    out: function(){
                        // removing temporary sublayout
                        var layout_temp = $("#iframe_panel").contents().find(".sublayout-editable-temp");
                        layout_temp.remove();

                        // enabling iframe droppable again
                        $("#iframe_panel").droppable("option", "disabled", false);
                    }
                });
            }
        });
    },
    updateStyling(){
        var style_el = document.getElementsByClassName("style-element")[0];

        $("#slider_wval").on("input", function(){
            var style_el_name = style_el.textContent;
            var iframe_el = $("#iframe_panel").contents().find(style_el_name);
            var w_val = String($("#slider_wval").val()) + "%";

            iframe_el.css("width", w_val);
        });

        $("#slider_hval").on("input", function(){
            var style_el_name = style_el.textContent;
            var iframe_el = $("#iframe_panel").contents().find(style_el_name);
            var h_val = String($("#slider_hval").val()) + "px";

            iframe_el.css("height", h_val);
        });

        $("#bg_color_val").on("input", function(){
            var style_el_name = style_el.textContent;
            var iframe_el = $("#iframe_panel").contents().find(style_el_name);
            var bg_color_val = String($("#bg_color_val").val());

            iframe_el.css("background-color", bg_color_val);
        });

        $("#border_style").on("change", function(){
            var style_el_name = style_el.textContent;
            var iframe_el = $("#iframe_panel").contents().find(style_el_name);
            var border_style = String($("#border_style").val());

            iframe_el.css("border-style", border_style);
        });

        $("#slider_border_wval").on("input", function(){
            var style_el_name = style_el.textContent;
            var iframe_el = $("#iframe_panel").contents().find(style_el_name);
            var border_wval = String($("#slider_border_wval").val());

            iframe_el.css("border-width", border_wval);
        });

        $("#border_color_val").on("input", function(){
            var style_el_name = style_el.textContent;
            var iframe_el = $("#iframe_panel").contents().find(style_el_name);
            var border_color = String($("#border_color_val").val());

            iframe_el.css("border-color", border_color);
        });

        $("#text_type").on("change", function(){
            var style_el_name = style_el.textContent;
            var iframe_el = $("#iframe_panel").contents().find(style_el_name);
            var text_type = $("#text_type").val();
            
            var new_html = "<" + text_type + ">" + iframe_el.text() + "</" + text_type + ">";
            iframe_el.html(new_html);
        });

    },
    setDragAndDrop(value){
        $(".layout-draggable").draggable(value);
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
            if(this.removeSubLayouts()){
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