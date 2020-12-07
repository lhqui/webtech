<?php
    namespace Classes;
    require '../init.php';
    $phong = new Phong($_GET['phong'],$_GET['rap']);
    $phong->pushSuatChieu($_GET['phim']);
?>