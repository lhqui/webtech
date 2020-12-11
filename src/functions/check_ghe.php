<?php 
    namespace Classes;
    require '../init.php';    
    $suat = new SuatChieu($_POST['rap_id'],$_POST['phong_stt'],$_POST['suatchieu_thoidiem']);
    $user = new User();
    $row = array('A','B','C','D','E');
    $result = [];
    foreach($row as $row) {
        for($i=1;$i<=10;$i++) {
            $instance = array(
                'row'=>$row,
                'col'=>$i,
                'status'=>$suat->checkGhe($row,$i,$user->_data->username)
            );
            array_push($result,$instance);
        }
    }
    print_r(\json_encode($result));
    // print_r($suat->checkGhe($_POST['ghe_hang'],$_POST['ghe_stt'],Session::get(Config::get('session/user'))));
?>