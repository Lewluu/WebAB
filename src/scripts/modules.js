export class LewDebug{
    _debug_section;
    static init(){
        var panel=$("#combined_panel .tool-section");
        panel.each(function(index){
            if(index==2){
                this._debug_section=$(this);
            }
        });
        console.log("Debug module initiated!");
    }
    static addHtml(html_data){
        var html_current=this._debug_section.html();
        var html_new=html_current+html_data;
        this._debug_section.html(html_new);
    }
}