<?php    
    namespace Classes;
    require '../init.php';
    $ten=$_POST['ten'];
    $ds_phim=Phim::searhPhim($ten);
    echo "<template>";
        // foreach($ds_phim as $phim) {
        //     $phim->template();
        // }
    echo $ds_phim;
    // print_r($ds_phim);
    echo "</template>"
?>

