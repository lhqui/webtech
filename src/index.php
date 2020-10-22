<?php 
    require './vendor/autoload.php';
    use \NoahBuscher\Macaw\Macaw;

    // Macaw::get('/',function(){
    //     echo 'hey';
    // });
    Macaw::get('/','Classes\\Router@index');
    Macaw::get('view','Classes\\Router@view');
    Macaw::get('functions','Classes\\Router@functions');
    Macaw::dispatch();
?>



