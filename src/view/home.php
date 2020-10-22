<?php 
    require_once './init.php';
?>
<html>
    <head>
        <script src='https://code.jquery.com/jquery-3.4.1.min.js'></script>
        <script type='module' src="/components/header/index.js"></script>
        <script type='module' src="/components/movie-carousel/index.js"></script>
        <!-- <script type='module' src='./components/ticket_buy/index.js'></script> -->
    </head>
    <body style=''>
        <custom-header></custom-header>
            
        <movie-carousel>
            <?php
                foreach(Phim::getAll() as $movie)
                {
                    echo "
                    <template>
                        <div class='movie'>
                            <img src='data:image/png;base64,"    . base64_encode($movie->_data->PHIM_ANHBIA) . "'></img>
                            <div class='content'> 
                                <h4>ABC</h4>
                                <p>ASDASJHD</p>
                            </div>
                        </div>
                    </template>
                    ";
                }
            ?>
        </movie-carousel>

       

        <div>
            <footer></footer>
        </div>


    </body>
</html>