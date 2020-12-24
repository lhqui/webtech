<?php 
    namespace Classes;
    require '../init.php';
    $db = DB::getInstance();
    echo $_GET['phim_ten'];
    $db->query("select * from phim where phim_ten like CONCAT('%', ?, '%')",array($_GET['phim_ten']));
    print_r($db->result());
?>
