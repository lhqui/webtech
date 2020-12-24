<?php 
namespace Classes;
require '../init.php';
$ds_phim = [];
if(!isset($_GET['phim_ten'])) {
    $ds_phim = Phim::getAll();
}
else {
    $db = DB::getInstance();
    $db->query("select * from phim where phim_ten like CONCAT('%', ?, '%')",array($_GET['phim_ten']));
    if($db->everythingOk()) {
        foreach($db->result() as $phim) {
            array_push($ds_phim,new Phim($phim->phim_id));
        }
    }
}
?>

<html>
<head>

</head>
<body>
    <template>
        <?php foreach($ds_phim as $phim) {
        $phim->template();
    }?>
    </template>
</body>
</html>