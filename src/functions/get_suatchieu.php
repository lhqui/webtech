<?php
namespace Classes;
require '../init.php';
// $result=SuatChieu::get($_GET['movie'],$_GET['date']);
if(Input::exist('get')) {
    $ds_rap = Rap::getAll();
    $result = [];
    foreach($ds_rap as $rap) {
        array_push($result,$rap->getSuatChieu($_GET['movie'],$_GET['date']));
    }
    // print_r(json_encode(SuatChieu::getAll($_GET['movie'],$_GET['date'])));
    print_r(\json_encode($result));
}

?>