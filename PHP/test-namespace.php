<?php
header("Content-type: text/html; charset=utf-8");
class Site {
  /* 成员变量 */
  var $url;
  var $title;
  /* 成员函数 */
  function __construct( $par1, $par2 ) {
   $this->url = $par1;
   $this->title = $par2;
    }
    function setUrl($par){
     $this->url = $par;
    }
    function getUrl(){
     echo $this->url . PHP_EOL .'<br/>';
    }
    function setTitle($par){
     $this->title = $par;
    }
    function getTitle(){
     echo $this->title . PHP_EOL .'<br/>';
    }
}

$runoob = new Site("菜鸟教程",'www.runoob.com');
$taobao = new Site("淘宝",'www.taobao.com');
$google = new Site("Google 搜索",'www.google.com');

// 调用成员函数，设置标题和URL
/*$runoob->setTitle( "菜鸟教程" );
$taobao->setTitle( "淘宝" );
$google->setTitle( "Google 搜索" );

$runoob->setUrl( 'www.runoob.com' );
$taobao->setUrl( 'www.taobao.com' );
$google->setUrl( 'www.google.com' );
*/
// 调用成员函数，获取标题和URL
$runoob->getTitle();
$taobao->getTitle();
$google->getTitle();

$runoob->getUrl();
$taobao->getUrl();
$google->getUrl();
?>