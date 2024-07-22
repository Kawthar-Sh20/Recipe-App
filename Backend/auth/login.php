<?php 
require '../connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare('SELECT username, email, password FROM users WHERE email = ?');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($username, $email, $stored_password);
    $stmt->fetch();

    $user_exists = $stmt->num_rows > 0;

    if ($user_exists == 0) {
        $res['message'] = "user not found";
    } else {
        if ($password == $stored_password) {
            $res['status'] = 'authenticated';
            $res['name'] = $username;
            $res['email'] = $email;
        } else {
            $res['status'] = "wrong password";
        }
    }
} else {
    $res = ["error" => "Wrong request method"];
}

echo json_encode($res);


// ///////////////////////////////////////////////////////////////////////////
// require 'connection.php';
// if($_SERVER['REQUEST_METHOD']=='POST'){
//     $username=$_GET['username'];
//     $email = $_POST['email'];
//     $password =$_POST['password'];
//     $stmt = $conn->prepare('select username,email,password from users where email=?');
//     $stmt->bind_param('s',$email);
//     $stmt->execute();
//     $stmt->store_result();
//     $stmt->bind_result($username,$email,$hashed_password);
//     $stmt->fetch();
//     $user_exists= $stmt->num_rows > 0;

//     if($user_exists==0){
//         $res['message']="user not found";
//     }
//     else{
//         if(password_verify($password ,$hashed_password)){
//             $res['status']='authanticated';
            
//             $res['name']=$name;
//             $res['email']=$email;
//         }
//         else{
//             $res['status']="wrong password";

//         }
//     }
// }
// else{   
//     echo json_encode(["error" => "Wrong request method"]);
// }
// echo json_encode($res);



?>


