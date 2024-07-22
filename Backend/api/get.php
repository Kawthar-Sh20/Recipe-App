
<?php

require "../connection.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $stmt = $conn->prepare('SELECT * FROM recipes;');
    $stmt->execute();
    $result = $stmt->get_result();
    $recipes = [];

    while ($row = $result->fetch_assoc()) {
        $recipes[] = $row;
    }

    echo json_encode($recipes);
    exit(); // Ensure no additional output
} else {
    echo json_encode(["error" => "Wrong request method"]);
    exit(); // Ensure no additional output
}
?>




////////////////////////////////////////////////////////////////
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");

// if ($_SERVER['REQUEST_METHOD'] == "GET") {
//     // $recipe_name=$_GET['recipe_name'];
//     $stmt=$conn->prepare('select * from  recipes ;');
//     // $stmt->bind_param('s',$recipe_name);
//     $stmt->execute();
//     $result=$stmt->get_result();
//     if ($result->num_rows>0){
//         $user=$result->fetch_assoc();
//         echo json_encode(["product"=>$user]);
//     } else {
//         echo json_encode(["message"=>"no records were found"]);
//     }
// } else {
//     echo json_encode(["error" => "Wrong request method"]);
// }

?>
























