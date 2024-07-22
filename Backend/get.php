<?php 
require "connection.php";
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $id=$_GET['id'];
    $stmt=$conn->prepare('select * from users where id=?;');
    $stmt->bind_param('i',$id);
    $stmt->execute();
    $result=$stmt->get_result();
    if ($result->num_rows>0){
        $user=$result->fetch_assoc();
        echo json_encode(["product"=>$user]);
    } else {
        echo json_encode(["message"=>"no records were found"]);
    }
} else {
    echo json_encode(["error" => "Wrong request method"]);
}