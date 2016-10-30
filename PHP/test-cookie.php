<?php
    date_default_timezone_set('prc');
    setcookie("name","123",time()+3600);
    print_r(date('y-m-d-h-m-s',time()+3600));
?>