<?php
    require './init.php';

    use \NoahBuscher\Macaw\Macaw;

    Macaw::get('/','Classes\\Router@index');
    Macaw::get('view/(:any)','Classes\\Router@view');
    Macaw::get('phim/(:any)','Classes\\Router@phim');
    // Management system
    Macaw::get('manage','Classes\\Router@manage');
    Macaw::get('functions/(:any)','Classes\\Router@functions');
    Macaw::dispatch();

?>




