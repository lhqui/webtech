<html>
    <head>
        <script src='https://code.jquery.com/jquery-3.4.1.min.js'></script>
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'/> 
        <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'></script>
        <script type='module' src="/components/header/index.js"></script>
        <script type='module' src="/components/movie-carousel/index.js"></script>
        <!-- <script type='module' src='./components/ticket_buy/index.js'></script> -->
    </head>
    <body style='background-color:black'>
        <custom-header></custom-header>


            
        <movie-carousel>
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
        </movie-carousel>


        
       

        <div>
            <footer></footer>
        </div>


    </body>
</html>