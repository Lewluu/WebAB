<?php

include_once 'FileObject.php';

class ScriptObject extends FileObject{
    public function createFile($path,$file_name,$title){
        $js_file=fopen($path.'/'.$file_name,"w");

        fclose($js_file);
    }
    public function getData(){
            
    }
    public function getCode(){
            
    }
}

?>