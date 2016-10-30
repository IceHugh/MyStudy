<?php
    $a = 50;
    if ($a>30) {
        echo "大于30";
    } else if($a>40){
        echo "大于40";
    }else{
        echo "都不大于";
    };
    switch ($a) {
        case '30':
            echo "等于30";
            break;
        case '40':
            echo "等于40";
            break;
        default:
            echo "都不等于";
            break;
    };
 ?>