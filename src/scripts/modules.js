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
        this._is_editable = false;
    }
    setLayout(element_layout){
        this._element_layout = element_layout;
    }
    deleteLayout(){
        if(this._element_layout != ""){
            $(this._element_layout).remove();
        }
        else{
            LewDebug.log("No layout selected!");
        }
    }
    getSelectedLayout(){
        return this._element_layout;
    }
    Edit(){
        if(!this._is_editable)  this._is_editable = true;
        else    return;

        var iframe_element =
            $("#iframe_panel").contents().find(this._element_layout);
        
        iframe_element.hover(function(){
            $(this).css("cursor", "pointer");
            // iframe_element.css("background-color","rgb(210, 253, 230)");
        });

        var el_layout = this._element_layout;
        iframe_element.on("click", function(){
            iframe_element.attr("contenteditable","true");
            iframe_element.css("resize","both");
            iframe_element.css("border-style","double");
            iframe_element.css("border-width","2px");
            iframe_element.css("border-color","rgb(137, 238, 183)");
            iframe_element.css("background-color","rgb(210, 253, 230)");
            iframe_element.css("overflow","hidden");

            var sel_layoyt = document.getElementsByClassName("selected-layout");
            var curr_html = $(sel_layoyt).html();
            $(sel_layoyt).html(curr_html + "<p>" + el_layout + "</p>");
        });
    }
    Unedit(){
        if(this._is_editable)   this._is_editable = false;
        else    return;

        var iframe_element =
            $("#iframe_panel").contents().find(this._element_layout);
        
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
    }
    isEditable(){
        return this._is_editable;
    }
}