<?php
session_start();

if(empty($_POST)){
    die();
}

$project_name = $_POST["project_name"];
$project_html = $_POST["project_html"];

echo json_encode("Hello from save_project.php !");

?>