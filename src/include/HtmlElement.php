<?php

include 'StyleElement.php';
include 'ScriptElement.php';

class HtmlElement{
    //attributes
    private $html_data;
    private StyleElement $style;
    private ScriptElement $script;
    //methods
    function __construct(){
    }
    function loadHTML($path){
        $this->html_data=file_get_contents($path);
        $this->html_path=$path;
        // $this->html_data=$path;
    }
    function setStyle(StyleElement $style){
        $this->style=$style;
    }
    function setScript(ScriptElement $script){
        $this->script=$script;
    }
    function getSyle(){
        return $this->style->getStyle();
    }
    function getScript(){
        return $this->script->getScript();
    }
    function getHTML(){
        // include $this->html_data;
        return $this->html_data;
    }
    function getHTML_code(){
        return htmlspecialchars($this->html_data);
    }
    function removeHTML(){
    }
}


?>