<?php
/*$ages = array('perter' => '35' ,'ben' => '21','joe' => '31');
foreach ($ages as $x => $value) {
    echo "Key=" . $x . ", Value=" . $value;
    echo "<br>";
};
$age['Peter']="35";
$age['Ben']="37";
$age['Joe']="43";
echo $age;*/

$numbers=array(4,6,2,22,11);
sort($numbers);
foreach ($numbers as $key => $num_value) {
    echo $num_value.'<br/>';
}
$age=array("Peter"=>"39","Ben"=>"37","Joe"=>"43");
asort($age);
foreach ($age as $keys => $age_value) {
    echo $keys.'<br/>';
}
?>