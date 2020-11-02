<html>
    <head>
        <?php include 'header.php'?>
        <script type='module' src="/components/header/index.js"></script>
        <script type='text/babel' src="/components/movie-carousel/index.js"></script>
        <!-- <script type='module' src='./components/ticket_buy/index.js'></script> -->
    </head>
    <body style='background-color:black'>
        <custom-header></custom-header>

        <div id='movie-carousel'>
            <template>
                <?php
                    foreach($ds_phim as $phim) {
                        echo "
                            <div class='phim'>
                                <img src='".$phim->img()."'></img>
                                <h4 class='phim_ten'>".$phim->_data->phim_ten."</h4>
                            </div>
                        ";
                    }
                ?>
            </template>
        </div>


        
       

        <div>
            <footer></footer>
        </div>


    </body>
</html>