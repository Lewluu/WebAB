<?php

require 'src/include/HtmlElement.php';

#copy content from index html
$html_index=new HtmlElement('src/elements/index.html');
$html_index->getHTML();

?>