<html>
    <head>
        <?php 
            include 'header.php'
        ?>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src='./components/manager/index.js'></script>
    </head>
    <body>
        <manager>
            <template>
                <?php
                    foreach($ds_phim as $phim) {
                        $phim->template();
                    }
                ?>
            </template>
        </manager>
        
    </body>

</html>