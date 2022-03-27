<?php

include 'FileObject.php';

class HtmlObject extends FileObject{
    public function createFile($path,$file_name,$title){
        $html_file=fopen($path.'/'.$file_name,"w");

        fwrite($html_file,"<!DOCTYPE html>");
        fwrite($html_file,"<html lang='en'>");
        fwrite($html_file,"<head>");
        fwrite($html_file,"<title>".$title."</title>");
        fwrite($html_file,"<meta charset='UTF-8'>");
        fwrite($html_file,"<meta name='viewport' content='width=device-width',initial-scale=1.0>");
        fwrite($html_file,"<meta='description' content=''>");
        fwrite($html_file,"<link rel='stylesheet' type='text/css' href='src/css/style.css'>");
        fwrite($html_file,"<script src='src/scripts/script.js'></script>");
        fwrite($html_file,"</head>");
        fwrite($html_file,"<body>");
        fwrite($html_file,"</body>");
        fwrite($html_file,"</html>");

        fclose($html_file);
    }
    public function getData(){
            
    }
    public function getCode(){
            
    }
}

?>