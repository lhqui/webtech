<html>
    <head>
        <?php include 'header.php'?>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src="/components/custom-header/index.js"></script>
    </head>
    <body style='background-color:black'>
        <template id='phim'>
            <?php 
                $phim->template()
            ?>
        </template>
        <custom-header></custom-header>
        <movie-present></movie-present>
        <button data-toggle='modal' data-target='#ticket-buy'>Mua ngay</button>
        <ticket-buy>
                <template>
                    <?php 
                        $phim->getAllRap()
                    ?>
                </template>
        </ticket-buy>
        <!-- <custom-footer></custom-footer> -->
    </body>
</html>