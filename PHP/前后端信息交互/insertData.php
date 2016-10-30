<?php
header("Content-type:text/html;charset=utf-8");
$servername = "localhost:3307";
$username = "root";
$password = "usbw";

$name = isset($_GET['name']) ? trim($_GET['name']) : ' ';
$pass = isset($_GET['pass']) ? trim($_GET['pass']) : ' ';
$title = isset($_GET['title']) ? trim($_GET['title']) : ' ';
$mess = isset($_GET['message']) ? trim($_GET['message']) : ' ';
$pass = md5($pass);
if(empty($name) || empty($pass)){
    echo "不能为空";
}
// 创建连接
$conn = mysql_connect($servername, $username, $password);
// 检测连接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
// echo "连接成功";
mysql_select_db("mydate",$conn);
mysql_query("SET NAMES utf8");
mysql_query("INSERT INTO user (name,pass) VALUES ('$name','$pass')");
echo '录入成功';
$result = mysql_query("SELECT * FROM user WHERE name='$name'");
while($data = mysql_fetch_array($result)){
    $uid = $data['id'];
}
mysql_query("INSERT INTO message (uid,title,message) VALUES ('$uid','$title','$mess')");
mysql_close($conn);
?>