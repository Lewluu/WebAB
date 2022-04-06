<?php

$curr_path=getcwd();
$curr_path=substr($curr_path,0,-8);

$projects=array_diff(scandir($curr_path.'/out/'),array('.','..'));
$projects_array=[];

for($i=0;$i<sizeof($projects);$i++){
    $projects_array[$i]=$projects[$i+2];
}

echo json_encode($projects_array);

?>