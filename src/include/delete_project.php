<?php

if(empty($_POST)){
    echo json_encode('Please selected a project!');
    die();
}
$prj_name=$_POST['project_name'];
// $prj_owner=$_POST['project_owner'];

$curr_path=getcwd();
$curr_path=substr($curr_path,0,-8);
$curr_path=$curr_path.'\\out\\'.$prj_name;
$path_array=[$curr_path.'\src\pages',$curr_path.'\src\css',$curr_path.'\src\scripts',$curr_path.'\src',$curr_path];

function deleteDir($path){
    array_map('unlink',glob("$path\*.*"));
    rmdir($path);
}

for($i=0;$i<sizeof($path_array);$i++)
    deleteDir($path_array[$i]);

echo json_encode($curr_path." has been deleted!");

?>