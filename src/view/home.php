<html>
    <head>
        <?php include 'header.php'?>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src="/components/custom-header/index.js"></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src='/components/movie-poster/index.js'></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src="/components/movie-carousel/index.js"></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src="/components/movie-picker/index.js"></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src="/components/footer/index.js"></script>
    </head>
    <body style='background-color:black'>
        <template id='user'>
            <?php 
                if($user != null) {
                    echo "<div username=".$user->_data->username."></div>";
                }
            ?>
        </template>
        <custom-header>
        </custom-header>
        <movie-carousel>
            <template>
                <?php
                    for ($i = 0; $i < 5; $i ++) {
                        $ds_phim[$i]->template();
                    }
                ?>
            </template>
        </movie-carousel>
        
        <div class="mt-5">
            <movie-picker>
                <template>
                    <?php
                        foreach($ds_phim as $phim) {
                            $phim->template();
                        }
                    ?>
                </template>
            </movie-picker>
        </div>

        <div>
            <footer></footer>
        </div>


    </body>
</html>