<?php
    $s = 0;
    for ($i=1; $i < 100 ; $i++) {
        if($i%5 != 0){
            $s += $i;
        }
    }
    echo $s;
?>
