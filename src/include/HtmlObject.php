<?php

include 'StyleElement.php';
include 'ScriptElement.php';

class HtmlObject{
    //attributes
    private $html_data;
    //methods
    function __construct(){
    }
    function createFile($path,$file_name,$title){
        $html_file=fopen($path.'/'.$file_name,"w");

        fwrite($html_file,"<!DOCTYPE html>");
        fwrite($html_file,"<html lang='en'>");
        fwrite($html_file,"<head>");
        fwrite($html_file,"<title>".$title."</title>");
        fwrite($html_file,"<meta charset='UTF-8'>");
        fwrite($html_file,"<meta name='viewport' content='width=device-width',initial-scale=1.0>");
        fwrite($html_file,"<meta='description' content=''>");
        // the next lines should include the path to css and js files, but they'll be passed to other methods
        // so it'll the end of head tag and begining of body tag
        fwrite($html_file,"</head>");
        fwrite($html_file,"<body>");
        fwrite($html_file,"</body>");
        fwrite($html_file,"</html>");

        //$this->html_data=file_get_contents($path);
    }
    function getHTML(){
        // include $this->html_data;
        return $this->html_data;
    }
    function getHTML_code(){
        return htmlspecialchars($this->html_data);
    }
}


?>