<html>
    <head>
        <?php include 'header.php'?>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src="/components/custom-header/index.js"></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src='/components/movie-poster/index.js'></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src='/components/movie-present/index.js'></script>
    </head>
    <body style='background-color:black'>
        
        <custom-header></custom-header>
        <movie-present>
        <template id='phim'>
            <?php 
                $phim->template()
            ?>
        </template>
        </movie-present>
    </body>
</html>