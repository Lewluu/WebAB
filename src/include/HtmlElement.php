<?php

class HtmlElement{
    //attributes
    private $html_data;
    //methods
    function __construct($path)
    {
        $this->html_data=$path;
    }
    function setHTML($path){
        $this->html_data=file_get_contents($path);
    }
    function getHTML(){
        include $this->html_data;
    }
}

?>