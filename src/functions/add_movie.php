<?php
    require '../init.php';
    use Classes\Input;
    use Classes\DB;
    if(Input::exist()) {
        $db = DB::getInstance();
        $db->insert('phim',array(
            'phim_ten'=>Input::get('ten_phim'),
            'phim_mieuta'=>Input::get('mieu_ta'),
            'phim_ngaysx'=>Input::get('ngay_sx'),
            'phim_ngaychieu'=>Input::get('ngay_chieu'),
            'phim_anhbia'=>file_get_contents($_FILES['anh_bia']['tmp_name']),
            'phim_thoiluong'=>Input::get('thoi_luong'),
            'phim_gia'=>Input::get('gia')
        ));
        if(!$db->error())
        {
            print_r('Them phim thanh cong');
        }
        else
            print_r($db->errorMsg());

    }
?>