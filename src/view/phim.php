<html>
    <head>
        <?php include 'header.php'?>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src="/components/custom-header/index.js"></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src='/components/movie-poster/index.js'></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src='/components/movie-present/index.js'></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src='/components/ticket-buy/index.js'></script>
        <script data-plugins="transform-es2015-modules-umd" type='text/babel' src="/components/footer/index.js"></script>

        <script>
                $(document).ready(function(){
                    $("#button1").click(function(){
                        console.log('ye')
                        $("#ticket-buy").modal({backdrop: true});
                    });
                });
            
        </script>
    </head>
    <body style='background-color:black'>
        <template id='phim'>
            <?php 
                $phim->template()
            ?>
        </template>
        <custom-header></custom-header>
        <movie-present> <template id='phim'>
            <?php 
                $phim->template()
            ?>
        </template></movie-present>
       
        <custom-header>
        <template id='user'>
            <?php 
                if($user != null) {
                    echo "<div username=".$user->_data->username."></div>";
                }
            ?>
        </template>
        </custom-header>
        <ticket-buy>
                <template>
                    <?php 
                        $phim->getAllRap()
                    ?>
                </template>
        </ticket-buy>
        
        <div>
            <footer></footer>
        </div>
    </body>
</html>