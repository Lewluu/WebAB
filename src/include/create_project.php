<?php

if(!empty($_POST)){
    $prj_name=$_POST['project_name'];
    $prj_owner=$_POST['project_owner'];

    echo $prj_name.'<br>'.$prj_owner;
}

?>