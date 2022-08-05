<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        img{
            height: 100px;
            width:100px;
        }
    </style>
</head>
<body>
    

<?php
    $dir = 'uploads/';
    $images = scandir($dir);

    foreach($images as $i){
        echo($dir.$i);
        echo('<img src="'.$dir.$i.'" alt="no image" >');
    }
?>
</body>
</html>