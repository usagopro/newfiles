<?php
    include 'database_connection.php';

    $firstname = $_POST['first'];
    $lastname = $_POST['last'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "insert into signup(first_id , last_id , email_id , password_id) values(? , ? , ? , ?)";
    $stmt = mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt , $sql)){
        echo "Sql broken";
    }
    else{
        mysqli_stmt_bind_param($stmt , "ssss" , $firstname , $lastname , $email , $password);
        mysqli_stmt_execute($stmt);
    }
     
    header("location: 1.php?signup=success");

?>