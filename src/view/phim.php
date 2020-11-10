<html>
    <head>
        <?php include 'header.php'?>
        <script type='module' src="/components/header/index.js"></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src='/components/movie-poster/index.js'></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src='/components/movie-present/index.js'></script>
    </head>
    <body style='background-color:black'>
        <template id='phim'>
            <?php 
                $phim->template()
            ?>
        </template>
        <custom-header></custom-header>
        <movie-present></movie-present>
    </body>
</html>