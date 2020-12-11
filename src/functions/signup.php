<?php 
    namespace Classes;
    require '../init.php';
    print_r(User::signup($_POST['username_signup'],$_POST['password_signup']))

?>