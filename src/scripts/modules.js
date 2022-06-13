class LewDebug{
    static init(){
        this._debug_section=$(".debug-output");
        this._line_nr=1;
        console.log("Debug module initiated!");
    }
    static log(html_data){
        var html_current = $(this._debug_section).html();
        var html_new = html_current + "<p>" + (this._line_nr++) + " ---&nbsp;&nbsp;&nbsp;" + html_data + "</p>";
        $(this._debug_section).html(html_new);
    }
}

class LewSubLayout{
    
}

class LewLayout{
    init(){
        this._element_layout = "";
        this._layout_nr = 0;
        this._is_editable = false;
        this._is_updated = false;
    }
    setLayout(element_layout){
        this._element_layout = element_layout;
    }
    setLayoutNumber(value){
        this._layout_nr = value;
    }
    removeLayout(){
        var sel_layout = document.getElementsByClassName(
            "selected-layout-el-" + String(this._layout_nr)
            );
            
        if($(sel_layout).css("display") == "flex"){
            var iframe_element = $("#iframe_panel").contents().find(this._element_layout);

            LewDebug.log("<b>" + $(sel_layout).text() + "</b> removed ...");

            iframe_element.remove();
            $(sel_layout).remove();

            return true;
        }

        return false;
    }
    getSelectedLayout(){
        return this._element_layout;
    }
    Update(){
        if(!this._is_updated){
            var layout_nr_temp = this._layout_nr;
            var layout_el_temp = this._element_layout;

            $(".selected-layout-el-" + String(layout_nr_temp) + " > img").hover(function(){
                $(this).css("cursor", "pointer");
            }); 
            $(".selected-layout-el-" + String(layout_nr_temp) + " > img").on("click", function(){
                LewDebug.log("<b>" + layout_el_temp + "</b> unselected ...");

                var iframe_element =
                $("#iframe_panel").contents().find(layout_el_temp);
        
                // remove selected layouts
                $(".selected-layout-el-" + String(layout_nr_temp)).css("display", "none");
                $(".selected-layout-el-" + String(layout_nr_temp ) + " > img").css("display", "none");

                iframe_element.attr("contenteditable", "false");
                iframe_element.css("resize", "false");
                iframe_element.css("border-style","");
                iframe_element.css("border-width","");
                iframe_element.css("border-color","");
                iframe_element.css("background-color","");
                iframe_element.css("overflow","");
            });

            this._is_updated = true;
        }
        else    return;
    }
    Edit(){
        var iframe_element =
            $("#iframe_panel").contents().find(this._element_layout);
        
        iframe_element.hover(function(){
            $(this).css("cursor", "pointer");
        });

        var layout_nr_temp = this._layout_nr;
        var layout_el_temp = this._element_layout;
        iframe_element.on("click", function(){
            LewDebug.log("<b>" + layout_el_temp + "</b> selected ...");

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
    }
    Unedit(){
        LewDebug.log("<b>" + this._element_layout + "</b> unselected ...");

        var iframe_element =
            $("#iframe_panel").contents().find(this._element_layout);
        
        // remove selected layouts
        $(".selected-layout-el-" + String(this._layout_nr)).css("display", "none");
        $(".selected-layout-el-" + String(this._layout_nr) + " > img").css("display", "none");

        // remove event on click
        iframe_element.unbind();

        iframe_element.hover(function(){
            iframe_element.css("cursor", "default");
        });

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