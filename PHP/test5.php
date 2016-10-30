<?php
    for ($i=1; $i <8; $i++) {
        for ($j=10-$i; $j >0; $j--) {
            echo '&ensp;';
        }
        for ($k=0; $k < 2*$i -1; $k++) {
                echo '*';
            }
        echo "<br/>";
    }
?>