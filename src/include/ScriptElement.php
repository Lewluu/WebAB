<?php

class ScriptElement{
    //attributes
    private $script_data;
    private $script_path;
    //methods
    function __construct(){    
    }
    function loadScript($path){
        $this->script_path=$path;
        $this->script_data=file_get_contents($path);
    }
    function getScript(){
        return $this->script_data;
    }
    function getScript_code(){
        return htmlspecialchars($this->script_data);
    }
}

?>