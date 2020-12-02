<?php
namespace Classes;
require '../init.php';
// $result=SuatChieu::get($_GET['movie'],$_GET['date']);
if(Input::exist('get')) {
    print_r(json_encode(SuatChieu::getAll($_GET['movie'],$_GET['date'])));
}

?>