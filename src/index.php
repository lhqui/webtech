<?php
    require './init.php';

    use \NoahBuscher\Macaw\Macaw;

    Macaw::get('/','Classes\\Router@index');
    Macaw::get('view/(:any)','Classes\\Router@view');
    // Management system
    Macaw::get('manage','Classes\\Router@manage');
    Macaw::get('manage/functions/(:any)','Classes\\Router@manage_function');
    Macaw::dispatch();

?>




