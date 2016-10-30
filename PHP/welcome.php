<?php
    header("Content-type: text/html; charset=utf-8");
    $use = isset($_GET['fname'])?trim($_GET['fname']) : '';
    $age = isset($_GET['age'])?trim($_GET['age']) : '';
    echo '欢迎'. $use.'<br/>"';
    echo '你的年龄是'. $age.' 岁。';
    echo $_REQUEST['fname'];
?>
