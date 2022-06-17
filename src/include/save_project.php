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

$html_obj = new HtmlObject();
$html_obj->generateSavedFile(getcwd(), "test_save.html", "test", $project_html);

echo ($project_html);

?>