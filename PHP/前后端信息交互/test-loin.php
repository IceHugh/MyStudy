<?php
header("Content-type:text/html;charset=utf-8");
$servername = "localhost:3307";
$username = "root";
$password = "usbw";

// 创建连接
$conn = mysql_connect($servername, $username, $password);
// 检测连接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
// echo "连接成功";
mysql_select_db("mydate",$conn);
mysql_query("SET NAMES utf8");
$result = mysql_query("SELECT b.name,a.title,a.message FROM `message` AS a LEFT JOIN `user` AS b on a.uid = b.id");
$arr = array();
while ($data = mysql_fetch_array($result)) {
    $info['name'] = $data['name'];
    $info['title'] = $data['title'];
    $info['message'] = $data['message'];
    $arr[] = $info;
};
echo json_encode($arr);
?>