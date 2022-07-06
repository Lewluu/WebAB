class LewDebug{
    static init(){
        this._debug_section=$(".debug-output");
        this._line_nr=1;
        console.log("Debug module initiated!");
    }
    static setupInterface(){
        var pos1 = 0;
        var pos2 = 0;
        var pos3 = 0;
        var pos4 = 0;

        var el = document.getElementById("debug_section");
        document.getElementById(el.id + "_header").onmousedown = dragMouseDownFunc;

        function dragMouseDownFunc(e){
            e = e || window.event;
            e.preventDefault();
            
            pos3 = e.clientX;
            pos4 = e.clientY;

            document.onmouseup = closeDragElFunc;
            document.onmousemove = elDragFunc;
        }

        function elDragFunc(e){
            e = e || window.event;
            e.preventDefault();

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
        }

        function closeDragElFunc(e){
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    static log(html_data){
        var html_current = $(this._debug_section).html();
        var html_new = html_current + "<p>" + (this._line_nr++) + " ---&nbsp;&nbsp;&nbsp;" + html_data + "</p>";
        $(this._debug_section).html(html_new);

        this._debug_section.scrollTop(this._debug_section.get(0).scrollHeight);
    }
}

class LewSubLayout{
    init(){
        this._element_sublayout = "";
        this._sublayout_nr = 0;
        this._is_editable = false;
        this._is_updated = false;
        this._parent_layout = "";
    }
    setSubLayout(element_sublayout){
        this._element_sublayout = element_sublayout;
    }
    setSubLayoutNumber(value){
        this._sublayout_nr = value;
    }
    setParentLayout(value){
        this._parent_layout = value;
    }
    removeSubLayout(){
        var sel_sublayout = document.getElementsByClassName(
            String(this._parent_layout).replace(".","") + "-selected-sublayout-el-" + String(this._sublayout_nr)
            );
            
        if($(sel_sublayout).css("display") == "flex"){
            var iframe_element = $("#iframe_panel").contents().find(this._element_sublayout);

            LewDebug.log("<b>" + $(sel_sublayout).text() + "</b> removed ...");

            iframe_element.remove();
            $(sel_sublayout).remove();

            return true;
        }

        return false;
    }
    getSelectedSubLayout(){
        return this._element_sublayout;
    }
    Update(){
        if(!this._is_updated){
            var sublayout_nr_temp = this._sublayout_nr;
            var sublayout_el_temp = this._element_sublayout;
            var selected_sublayout = this._parent_layout + "-selected-sublayout-el-" + String(sublayout_nr_temp);

            $(selected_sublayout + " > img").hover(function(){
                $(this).css("cursor", "pointer");
            }); 
            $(selected_sublayout + " > img").on("click", function(){
                LewDebug.log("<b>" + sublayout_el_temp + "</b> unselected ...");

                var iframe_element =
                $("#iframe_panel").contents().find(sublayout_el_temp);
        
                // remove selected layouts
                $(selected_sublayout).css("display", "none");
                $(selected_sublayout + " > img").css("display", "none");

                iframe_element.attr("contenteditable", "false");
                iframe_element.css("resize", "false");
                iframe_element.css("border-style","double");
                iframe_element.css("border-width","2px");
                iframe_element.css("border-color","orange");
                iframe_element.css("background-color","");
                iframe_element.css("overflow","");
            });

            this._is_updated = true;
        }
        else    return;
    }
    Edit(){
        var iframe_element =
            $("#iframe_panel").contents().find(this._element_sublayout);
        
        // unbind already existed events, otherwise they'll stack
        iframe_element.unbind();

        iframe_element.css("border-style","double");
        iframe_element.css("border-width","2px");
        iframe_element.css("border-color", "orange");
        iframe_element.hover(function(){
            $(this).css("cursor", "pointer");
        });

        var sublayout_nr_temp = this._sublayout_nr;
        var sublayout_el_temp = this._element_sublayout;
        var parent_layout_temp = this._parent_layout;
        iframe_element.on("click", function(){
            LewDebug.log("<b>" + sublayout_el_temp + "</b> selected ...");

            // adding style on edit
            iframe_element.attr("contenteditable","true");
            iframe_element.css("resize","both");
            iframe_element.css("border-style","double");
            iframe_element.css("border-width","2px");
            iframe_element.css("border-color","rgb(137, 238, 183)");
            iframe_element.css("background-color","rgb(210, 253, 230)");
            iframe_element.css("overflow","hidden");

            var selected_sublayout = parent_layout_temp + "-selected-sublayout-el-" + String(sublayout_nr_temp);
            $(selected_sublayout).css("display", "flex");
            $(selected_sublayout + " > img").css("display", "flex");
        });

        this._is_editable = true;
    }
    Unedit(){
        var iframe_element =
            $("#iframe_panel").contents().find(this._element_sublayout);
        
        // remove selected layouts
        var selected_sublayout = this._parent_layout + "-selected-sublayout-el-" + String(this._sublayout_nr);
        $(selected_sublayout).css("display", "none");
        $(selected_sublayout + " > img").css("display", "none");

        // remove event on click
        iframe_element.unbind();

        // removing style added on edit
        iframe_element.css("cursor", "default");
        iframe_element.attr("contenteditable", "false");
        iframe_element.css("resize", "false");
        iframe_element.css("border-style","");
        iframe_element.css("border-width","");
        iframe_element.css("border-color","");
        iframe_element.css("background-color","");
        iframe_element.css("overflow","");

        this._is_editable = false;
    }
    isEditable(){
        return this._is_editable;
    }
}

class LewLayout{
    init(){
        this._element_layout = "";
        this._layout_nr = 0;
        this._is_editable = false;
        this._is_updated = false;
        this._sublayout_list = [];
    }
    setLayout(element_layout){
        this._element_layout = element_layout;
    }
    setLayoutNumber(value){
        this._layout_nr = value;
    }
    removeSubLayouts(){
        var something_removed = false;

        // removing sublayouts under this layout
        for(var i=0;i<this._sublayout_list.length;i++){
            if(this._sublayout_list[i].removeSubLayout()){
                this._sublayout_list.pop(this._sublayout_list[i]);
                if(!something_removed)  something_removed = true;
            }
        }

        return something_removed;
    }
    removeLayout(){
        var sel_layout = document.getElementsByClassName(
            "selected-layout-el-" + String(this._layout_nr)
            );
        
        if($(sel_layout).css("display") == "flex"){
            var iframe_element = $("#iframe_panel").contents().find(this._element_layout);

            LewDebug.log("<b>" + $(sel_layout).text() + "</b> removed ...");

            // removing all selected sublayouts
            //$(".selected-sublayout-el").remove();

            iframe_element.remove();
            $(sel_layout).remove();

            return true;
        }

        return false;
    }
    getSelectedLayout(){
        return this._element_layout;
    }
    addSubLayout(sublayout){
        this._sublayout_list.push(sublayout);
    }
    getSubLayoutsNumber(){
        return this._sublayout_list.length;
    }
    searchForSubLayouts(){
        var iframe_el_arr = $("#iframe_panel").contents().find(".sublayout-editable");
        var sublayout_list_temp = [];
        var layout_nr_temp = this._layout_nr;
        var parent_class = this._element_layout.replace(".","");

        $(iframe_el_arr).each(function(){
            var classes = $(this).parent().attr('class');
            
            // check if sublayout in under this layout class
            if(classes.includes(parent_class)){
                var sublayout = new LewSubLayout();
                var sublayout_name = "";

                sublayout.init();
                sublayout.setSubLayoutNumber(sublayout_list_temp.length + 1);

                sublayout_name = ".layout-" +String(layout_nr_temp ) + "-sublayout-editable-" + String(sublayout_list_temp.length + 1);
                sublayout.setSubLayout(sublayout_name);
                sublayout.setParentLayout("." + parent_class);

                // adding sublayouts in parent class
                $(this).addClass(sublayout_name.replace(".",""));

                var sel_sublayout = document.getElementsByClassName("selected-sublayout");
                var sel_sublayout_str = $(sel_sublayout).html();
                if(!sel_sublayout_str.includes(sublayout_name)){
                    var curr_html = $(sel_sublayout).html();
                    $(sel_sublayout).html(
                        curr_html + 
                        "<div class='selected-sublayout-el " + parent_class
                        + "-selected-sublayout-el-"
                        + String(sublayout_list_temp.length + 1) 
                        +"' style='display:none'> <p>" + 
                        sublayout_name + 
                        "</p> <img style='display:none' src='src/icons/close.png'> </div>"
                    );
            }

                sublayout_list_temp.push(sublayout);
            }
        });

        this._sublayout_list = sublayout_list_temp;
    }
    Update(){
        if(!this._is_updated){
            var layout_nr_temp = this._layout_nr;
            var layout_el_temp = this._element_layout;
            var selected_el = ".selected-layout-el-" + String(layout_nr_temp);

            $(selected_el).unbind();
            $(selected_el + " > img").unbind();

            $(selected_el + " > img").hover(function(){
                $(this).css("cursor", "pointer");
            }); 
            $(selected_el + " > img").on("click", function(){
                var iframe_element =
                $("#iframe_panel").contents().find(layout_el_temp);
        
                // remove selected layouts
                $(selected_el).css("display", "none");
                $(selected_el + String(layout_nr_temp ) + " > img").css("display", "none");

                iframe_element.attr("contenteditable", "false");
                iframe_element.css("resize", "false");
                iframe_element.css("border-style","double");
                iframe_element.css("border-width","2px");
                iframe_element.css("border-color","orange");
                iframe_element.css("background-color","");
                iframe_element.css("overflow","");

                LewDebug.log("<b>" + layout_el_temp + "</b> unselected ...");
            });

            for(var i=0;i<this._sublayout_list.length;i++){
                this._sublayout_list[i].Update();
            }

            this._is_updated = true;
        }
        else    return;
    }
    Edit(){
        var iframe_element =
            $("#iframe_panel").contents().find(this._element_layout);
        
        // unbind already existed events, otherwise they'll stack
        iframe_element.unbind();

        iframe_element.css("border-style","double");
        iframe_element.css("border-width","2px");
        iframe_element.css("border-color", "orange");
        iframe_element.hover(function(){
            $(this).css("cursor", "pointer");
        });

        var layout_nr_temp = this._layout_nr;
        var layout_el_temp = this._element_layout;

        iframe_element.on("click", function(){
            LewDebug.log("<b>" + layout_el_temp + "</b> selected ...");

            // adding style on edit
            iframe_element.attr("contenteditable","true");
            iframe_element.css("resize","both");
            iframe_element.css("border-style","double");
            iframe_element.css("border-width","2px");
            iframe_element.css("border-color","rgb(137, 238, 183)");
            iframe_element.css("background-color","rgb(210, 253, 230)");
            iframe_element.css("overflow","hidden");
            
            $(".selected-layout-el-" + String(layout_nr_temp)).css("display", "flex");
            $(".selected-layout-el-" + String(layout_nr_temp) + " > img").css("display", "flex");
        });

        // updating each sublayout under this layout
        for(var i=0;i<this._sublayout_list.length;i++){
            this._sublayout_list[i].Edit();
        }
    }
    Unedit(){
        var iframe_element =
            $("#iframe_panel").contents().find(this._element_layout);
        
        // remove selected layouts
        $(".selected-layout-el-" + String(this._layout_nr)).css("display", "none");
        $(".selected-layout-el-" + String(this._layout_nr) + " > img").css("display", "none");

        // remove event on click
        iframe_element.unbind();

        // removing style added on edit
        iframe_element.css("cursor", "default");
        iframe_element.attr("contenteditable", "false");
        iframe_element.css("resize", "false");
        iframe_element.css("border-style","");
        iframe_element.css("border-width","");
        iframe_element.css("border-color","");
        iframe_element.css("background-color","");
        iframe_element.css("overflow","");

        for(var i=0;i<this._sublayout_list.length;i++){
            this._sublayout_list[i].Unedit();
        }

        this._is_editable = false;
    }
    isEditable(){
        return this._is_editable;
    }
}