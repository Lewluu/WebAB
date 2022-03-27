<?php

if(!empty($_POST)){
    $prj_name=$_POST['project_name'];
    $prj_owner=$_POST['project_owner'];

    $curr_path=getcwd();
    $curr_path=substr($curr_path,0,-8);

    mkdir($curr_path.'/out/'.$prj_name);
}

?>