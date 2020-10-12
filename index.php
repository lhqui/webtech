<html>
    <head>
        <script src='https://code.jquery.com/jquery-3.4.1.min.js'></script>
        <script type='module' src="/src/components/header/index.js"></script>
        <script type='module' src="/src/components/movie-carousel/index.js"></script>
        <!-- <script type='module' src='./components/ticket_buy/index.js'></script> -->
    </head>
    <body style='background-color:black'>
        <custom-header></custom-header>
            
        <movie-carousel>
            <?php 
                // foreach $movies as $movie
                // {
                    echo "
                    <template>
                        <div class='movie'>
                            <img src='https://picsum.photos/200/300'></img>
                            <div class='content'> 
                                <h4>ABC</h4>
                                <p>ASDASJHD</p>
                            </div>
                        </div>
                        <div class='movie'>
                            <img src='https://picsum.photos/200/300'></img>
                            <div class='content'> 
                                <h4>ABC</h4>
                                <p>ASDASJHD</p>
                            </div>
                        </div>
                    </template>
                    "
                // }
            ?>
        </movie-carousel>

        

        <div>
            <footer></footer>
        </div>


    </body>
</html>

