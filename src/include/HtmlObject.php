<?php

include_once 'FileObject.php';

class HtmlObject extends FileObject{
    public function createFile($path,$file_name,$title){
        $html_file=fopen($path.'/'.$file_name,"w");

        fwrite($html_file,"<!DOCTYPE html> \n");
        fwrite($html_file,"<html lang='en'> \n");
        fwrite($html_file,"<head> \n");
        fwrite($html_file,"<title>".$title."</title> \n");
        fwrite($html_file,"<meta charset='UTF-8'> \n");
        fwrite($html_file,"<meta name='viewport' content='width=device-width',initial-scale=1.0> \n");
        fwrite($html_file,"<meta='description' content=''> \n");
        fwrite($html_file,"<link rel='stylesheet' type='text/css' href='src/css/style.css'> \n");
        fwrite($html_file,"<script src='src/scripts/script.js'></script> \n");
        fwrite($html_file,"</head> \n");
        fwrite($html_file,"<body> \n");
        fwrite($html_file,"</body> \n");
        fwrite($html_file,"</html> \n");

        fclose($html_file);
    }
    public function getData(){
            
    }
    public function getCode(){
            
    }
}

?>