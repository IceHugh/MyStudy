<?php
    $a["c"] = 'e';
    $a[] = 'e';
    $a[] = 'f';
    $b = array("ygz"=>'123',"ice"=>'abs');
    $c = array('a','b','c','9');
    echo "<pre>";
    print_r($a);
    echo "</pre>";
    print_r(array_keys($b,'123')); //根据键值查找键名
    print_r(array_count_values($b));
    print_r(array_rand($c,1));
 ?>