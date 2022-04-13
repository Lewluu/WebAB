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

if(is_dir($curr_path)){
    $files=array_diff(scandir($curr_path.'/src'),array('.','..'));
    $files_array=[];

    for($i=0;$i<sizeof($files);$i++){
        $files_array[$i]=$files[$i+2];
    }
    echo json_encode($files_array);

    $message="Project: ".$prj_name." deleted successfuly!";
}
else{
    $message=$curr_path." directory doesn't exist!<br>";
}

echo json_encode($message);

?>