<?php

include 'src/include/StyleElement.php';
//include 'src/include/HtmlElement.php';

#copy content from index html
//$html_index=new HtmlElement();
//$html_index->setHTML('src/elements/index.html');

#copy content from a css file
$css_data=new StyleElement();
$css_data->loadStyle('src/css/main_style.css');

#loat css data in html content
//$html_index->setStyle($css_data);

//echo $html_index->getHTML();

?>