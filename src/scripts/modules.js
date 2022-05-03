export class LewDebug{
    static _debug_section;
    static init(){
        var panel=$("#combined_panel .tool-section");
        panel.each(function(index){
            if(index==2)
                _debug_section=$(this);
        });
    }
    static addHtml(html_data){
        var html_current=_debug_section.html();
        var html_new=html_current+html_data;
        _debug_section.html(html_new);
    }
}