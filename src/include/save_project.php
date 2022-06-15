<?php
session_start();

include 'HtmlObject.php';

if(empty($_POST)){
    die();
}

$project_name = $_POST["project_name"];
$project_html = $_POST["project_html"];

$html_obj = new HtmlObject();
$html_obj->generateSavedFile(getcwd(), "test_save.html", $project_html);

echo json_encode("Hello from save_project.php !");

?>