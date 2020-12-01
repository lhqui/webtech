<?php
    namespace Classes;
    require '../init.php';
    $_POST['phim_anhbia'] = file_get_contents($_FILES['phim_anhbia']['tmp_name']);
    $_POST['phim_anh'] = file_get_contents($_FILES['phim_anh']['tmp_name']);
    $result = Phim::add($_POST);
    // print_r($result);
    $result ? print_r('Thêm phim thành công') : print_r($result);
    
?>