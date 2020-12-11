<?php
    namespace Classes;
    require '../init.php';
    $user = new User();
    $result=$user->dat_ve($_POST['rap_id'],$_POST['phong_stt'],$_POST['suatchieu_thoidiem'],$_POST['muave_soluong'],$_POST['gheString']);
    // print_r(array(
    //     'a'=>$_POST['rap_id'],
    //     'b'=>$_POST['phong_stt'],
    //     'c'=>$_POST['suatchieu_thoidiem']
    // ))
    print_r($result)
?>