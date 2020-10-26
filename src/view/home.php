<html>
    <head>
        <script src='https://code.jquery.com/jquery-3.4.1.min.js'></script>
        <script type='module' src="/components/header/index.js"></script>
        <script type='module' src="/components/movie-carousel/index.js"></script>
        <!-- <script type='module' src='./components/ticket_buy/index.js'></script> -->
    </head>
    <body style='background-color:black'>
        <custom-header></custom-header>
            
        <movie-carousel>
            <template>
                <?php
                    foreach($ds_phim as $movie)
                    {
                        echo "
                            <div class='movie'>
                                <img src='data:image/png;base64,"    . base64_encode($movie->_data->phim_anhbia) . "'></img>
                                <div class='content'> 
                                    <h4>".$movie->_data->phim_ten."</h4>
                                </div>
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