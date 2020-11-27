<?php
    require '../init.php';
    use Classes\Input;
    use Classes\Rap;
    if(Input::exist()) {
        $result = Rap::add($_POST);
        $result ? print_r('Thêm rạp thành công') : print_r($result);
    }
?>