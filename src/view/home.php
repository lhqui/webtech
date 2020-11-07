<html>
    <head>
        <?php include 'header.php'?>
        <script type='module' src="/components/header/index.js"></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src='/components/movie-poster/index.js'></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src="/components/movie-carousel/index.js"></script>
    </head>
    <body style='background-color:black'>
        <custom-header></custom-header>

        <movie-carousel>
            <template>
                <?php
                    foreach($ds_phim as $phim) {
                        $phim->template();
                    }
                ?>
            </template>
        </movie-carousel>
        
        <movie-picker>
            <template>
                <?php
                    foreach($ds_phim as $phim) {
                        $phim->template();
                    }
                ?>
            </template>
        </movie-picker>

        <div>
            <footer></footer>
        </div>


    </body>
</html>