<?php
session_start();

include 'HtmlObject.php';

if(empty($_POST)){
    die();
}

$project_name = $_POST["project_name"];
$project_html = $_POST["project_html"];

// remove addblock content
$project_html = preg_replace('~<style(.*?)</style>~Usi', "", $project_html);
$project_name_temp = $project_name."_temp.html";
$working_directory = "..\\out\\".$project_name;

if(is_dir($working_directory)){
    $html_obj = new HtmlObject();
    $html_obj->generateSavedFile($working_directory, $project_name_temp, "test", $project_html);
}
else{
    echo json_encode($working_directory." doesn't exists ...");
}

?>