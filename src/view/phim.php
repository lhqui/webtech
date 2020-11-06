<html>
    <head>
        <?php include 'header.php'?>
        <script type='module' src="/components/header/index.js"></script>
        <script type='text/babel' src='/components/ticket-buy/index.js'></script>
    </head>
    <body>
        <template id='phim'>
            <?php 
                $phim->template()
            ?>
        </template>
        <custom-header></custom-header>
        <movie-present></movie-present>
        <div class=''></div>
    </body>
</html>