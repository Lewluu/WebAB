<?php

include 'HtmlObject.php';
include 'StyleObject.php';
include 'ScriptObject.php';

if(!empty($_POST)){
    $prj_name=$_POST['project_name'];
    $prj_owner=$_POST['project_owner'];

    $curr_path=getcwd();
    $curr_path=substr($curr_path,0,-8);

    mkdir($curr_path.'/out/'.$prj_name);
    mkdir($curr_path.'/out/'.$prj_name.'/src');
    mkdir($curr_path.'/out/'.$prj_name.'/src/pages');
    mkdir($curr_path.'/out/'.$prj_name.'/src/css');
    mkdir($curr_path.'/out/'.$prj_name.'/src/scripts');

    chdir($curr_path.'/out/'.$prj_name);

    $html=new HtmlObject();
    $html->createFile(getcwd(),"index.html",$prj_name);

    $css=new StyleObject();
    $css->createFile("src/css","style.css",null);

    $js=new ScriptObject();
    $js->createFile("src/scripts","script.js",null);
}

?>