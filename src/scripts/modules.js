class LewDebug{
    static init(){
        this._debug_section=$(".debug-output");
        this._line_nr=1;
        console.log("Debug module initiated!");
    }
    static addHtml(html_data){
        var html_current=this._debug_section.html();
        var html_new=html_current+"<p>"+(this._line_nr++)+" ---&nbsp;&nbsp;&nbsp;"+html_data+"</p>";
        this._debug_section.html(html_new);
    }
}