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
    setEditable(value){
        this._is_editable = value;
    }
    isEditable(){
        return this._is_editable;
    }
}