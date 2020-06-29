<?php 
   $fn  = $_POST['name'];
   $str = $_POST['score'];
   $file = fopen("mdps.txt","a+");
   echo fwrite($file,$fn.":".$str.PHP_EOL);
   fclose($file);
?>