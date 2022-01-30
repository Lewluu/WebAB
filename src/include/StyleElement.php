<?php

class StyleElement{
    //attributes
    private $css_data;
    private $css_path;
    //methods
    function __construct(){   
    }
    function loadStyle($path){
        $this->css_path=$path;
        $this->css_data=file_get_contents($path);
    }
    function getStyle(){
        return $this->css_data;
    }
    function getStyle_code(){
        return htmlspecialchars($this->css_data);
    }
}

?>