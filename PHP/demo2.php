<?php
    header('Content-type:text/html;charset=utf-8');
    $email = $_GET['email'];
    $emailArr = explode('@',$email);
    if(count($emailArr) !== 2){
        echo '邮箱不正确';
    }else if(count($emailArr) === 2){
        $num = stripos( $email,'@');
        $str = substr($email,$num-4,4);
        $strAll = substr($email,$num-4);
        $strL = substr($email,0,$num-4);
        if($num < 6){
            echo '邮箱不正确';
        }else{
            echo '邮箱服务商:' . substr($email,$num+1) . '<br/>';
            $reStr = str_replace($str,'****',$strAll);
            echo $strL . $reStr;
        }
    }
?>