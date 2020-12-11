<?php 
    namespace Classes;
    require '../init.php';
    $row = array('A','B','C','D','E');
    foreach($row as $row) {
        for($i = 1;$i<=10;$i++) {
            $db=DB::getInstance();
            $db->insert('ghe',array(
                'ghe_hang'=>$row,
                'ghe_stt'=>$i
            ));
        }
    }
?>