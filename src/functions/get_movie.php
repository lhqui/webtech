<?php
    namespace Classes;
    require '../init.php';
    print_r(json_encode(Phim::getAll()));
    // print_r(Phim::getAll())
    // $dsPhim = Phim::getAll();
    // foreach($dsPhim as $phim) {
    //     $phim->_data->phim_anhbia = base64_encode($phim->_data->phim_anh);
    //     $phim->_data->phim_anh = base64_encode($phim->_data->phim_anhbia);
    // }
    // print_r(json_encode($dsPhim));
?>