<?php

include_once 'FileObject.php';

class HtmlObject extends FileObject{
    public function createFile($path,$file_name,$title){
        $html_file=fopen($path.'/'.$file_name,"w");

        fwrite($html_file,"<!DOCTYPE html> \n");
        fwrite($html_file,"<html lang='en'> \n");
        fwrite($html_file,"\t <head> \n");
        fwrite($html_file,"\t \t <title>".$title."</title> \n");
        fwrite($html_file,"\t \t <meta charset='UTF-8'> \n");
        fwrite($html_file,"\t \t <meta name='viewport' content='width=device-width',initial-scale=1.0> \n");
        fwrite($html_file,"\t \t <meta name='description' content=''> \n");
        fwrite($html_file,"\t \t <link rel='stylesheet' type='text/css' href='src/css/style.css'> \n");
        fwrite($html_file,"\t \t <script src='src/scripts/script.js'></script> \n");
        fwrite($html_file,"\t </head> \n");
        fwrite($html_file,"\t <body> \n");
        fwrite($html_file,"\t \t <div class='layout-editable layout-editable-1'> \n");
        fwrite($html_file,"\t \t \t <h2>Hello from <i>".$title."</i> project!</h2> \n");
        fwrite($html_file,"\t \t </div> \n");
        fwrite($html_file,"\t \t <div class='layout-editable layout-editable-2'> \n");
        fwrite($html_file,"\t \t \t <h2>Hello from <i>".$title."</i> project again!</h2> \n");
        fwrite($html_file,"\t \t </div> \n");
        fwrite($html_file,"\t</body> \n");
        fwrite($html_file,"</html> \n");

        fclose($html_file);
    }
    public function generateSavedFile($path, $file_name, $content){
        $html_file=fopen($path.'/'.$file_name,"w");

        fwrite($html_file,"<!DOCTYPE html> \n");
        fwrite($html_file,"<html lang='en'> \n");
        fwrite($html_file, $content);
        fwrite($html_file,"\n</html>\n");

        fclose($html_file);
    }
    public function getData(){
            
    }
    public function getCode(){
            
    }
}

?>