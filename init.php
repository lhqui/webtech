<?php
session_start();

$GLOBALS['config'] = array(
    'mysql' => array(
        'servername' => '127.0.0.1',
        'username' => 'root',
        'password' => '',
        'database' => 'webtech_project'
    ),
);

spl_autoload_register(function($class) {
    require_once "classes/" . $class . ".php";
});
date_default_timezone_set('Asia/Ho_Chi_Minh');
function escape($string) {
    return htmlentities($string,ENT_QUOTES,'UTF-8');
}

?>