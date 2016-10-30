<?php
    $str = '   hello world!  ';
    $arr = explode(' ',$str);
    print_r($arr);
    $str1 = implode(',',$arr);
    print_r($str1);
    print_r(trim($str));
    print_r(str_replace('world','new world',$str))
?>