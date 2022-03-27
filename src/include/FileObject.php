<?php

abstract class FileObject{
    public function __construct(){}
    abstract public function createFile($path,$file_name,$title);
    abstract public function getData();
    abstract public function getCode();
}

?>