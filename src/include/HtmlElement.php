<?php

include 'StyleElement.php';
include 'ScriptElement.php';

class HtmlElement{
    //attributes
    private $html_data;
    private $html_path;
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
        $file_w=fopen("temp_file.html","w");
        $file_r=fopen($this->html_path,"r");
        $line_nr=1;
        while($line=fgets($file_r)){
            if($line_nr!=8){
                fputs($file_w,$line);
                if($line_nr==9)
                    fputs($file_w,$style->getStyle());
            }
            $line_nr++;
        }

        $this->html_data=file_get_contents("temp_file.html");

        fclose($file_w);
        fclose($file_r);
        unlink("temp_file.html");
    }
    function setScript(ScriptElement $script){
        
    }
    function getSyle(){
        return $this->style->getStyle();
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