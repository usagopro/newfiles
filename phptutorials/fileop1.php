<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>

<?php 
$filename = "tmp1.txt";   
$file = fopen( $filename, "w" );     
 if( $file == false ) 
{      
echo ( "Error in opening new file" );     
 exit(); 
  }   
fwrite( $file, "This is  a simple test\n" );   
fclose( $file );
?>

</html> 

