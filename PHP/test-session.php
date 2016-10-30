<?php
    header('Content-type:text/html;charset=utf-8');
    session_start();
    if($_SESSION['views']){
        $_SESSION['views'] +=1;
    }else{
        $_SESSION['views'] = 1;
    }
    $_SESSION['views'] = 1;
    echo '浏览量：' . $_SESSION['views'];
?>