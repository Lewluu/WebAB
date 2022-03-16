<?php

include 'src/include/HtmlElement.php';

#for this project i'll be using a personal framework in php

#copy content from index html
$html_index=new HtmlElement();
$html_index->loadHTML('src/elements/index.html');


echo $html_index->getHTML();

?>