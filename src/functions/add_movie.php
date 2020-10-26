<?php
    require '../init.php';
    use Classes\Input;
    use Classes\Phim;
    if(Input::exist()) {
        $_POST['phim_anhbia'] = file_get_contents($_FILES['phim_anhbia']['tmp_name']);
        $result = Phim::add($_POST);
        $result ? print_r('Thêm phim thành công') : print_r($result);
    }
?>