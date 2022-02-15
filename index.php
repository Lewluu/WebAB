<?php

include 'src/include/HtmlElement.php';

#copy content from index html
$html_index=new HtmlElement();
$html_index->loadHTML('src/elements/index.html');

#copy content from a css file
$css_data=new StyleElement();
$css_data->loadStyle('src/css/main_style.css');

#load css data in html content
$html_index->setStyle($css_data);

#copy content from a script file
$script_data=new ScriptElement();
$script_data->loadScript('src/scripts/script.js');

#load script data in html content, it has to override with the file with style added
//$html_index->setScript($script_data);

echo $html_index->getHTML();

?>