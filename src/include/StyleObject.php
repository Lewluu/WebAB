<?php

include_once 'FileObject.php';

class StyleObject extends FileObject{
    public function createFile($path,$file_name,$title){
        $css_file=fopen($path.'/'.$file_name,"w");

        fclose($css_file);
    }
    public function getData(){
            
    }
    public function getCode(){
            
    }
}

?>