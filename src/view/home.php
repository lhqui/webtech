<html>
    <head>
        <?php include 'header.php'?>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src="/components/custom-header/index.js"></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src='/components/movie-poster/index.js'></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src="/components/movie-carousel/index.js"></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src="/components/movie-picker/index.js"></script>
    </head>
    <body style='background-color:black'>
        <template id='user'>
            
        </template>
        <custom-header>
        </custom-header>
        <movie-carousel>
            <template>
                <?php
                    foreach($ds_phim as $phim) {
                        $phim->template();
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