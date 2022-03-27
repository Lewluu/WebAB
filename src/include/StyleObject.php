<?php

class StyleElement{
    //attributes
    private $css_data;
    //methods
    function __construct(){   
    }
    function loadStyle($path){
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