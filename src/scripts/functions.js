var Lew = {
    layouts_arr: [],
    iframe_is_editable: false,
    initLayoutSection: function(){
    },
    searchForLayouts: function(){
        var iframe_el_arr = $("#iframe_panel").contents().find(".layout-editable");
        var layout_arr_temp = [];
        $(iframe_el_arr).each(function(index){
            let layout = new LewLayout();
            var layout_name = ".layout-editable-" + String(index + 1);

            layout.setLayout(layout_name);

            layout_arr_temp.push(layout);
        })
        this.layouts_arr = layout_arr_temp;
    },
    editIframe: function(){

        this.iframe_is_editable = true;
    },
    clearEdit: function(){

        this.iframe_is_editable = false;
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