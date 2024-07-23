<?php

require "../connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['id_recipe']) && isset($data['id_user']) && isset($data['star_value']) ) {
        $id_recipe = $data['id_recipe'];
        $star_value= $data['star_value'];
    
        $id_user= $data['id_user'];
        
        $stmt = $conn->prepare('INSERT INTO stars (id_recipe, id_user, star_value) VALUES (?, ?, ?)');
        $stmt->bind_param('iid', $id_recipe, $id_user, $star_value);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "star added successfully"]);
        } else {
            echo json_encode(["error" => "Error creating recipe"]);
        }
    } else {
        echo json_encode(["error" => "Invalid input"]);
    }
} else {
    echo json_encode(["error" => "Wrong request method"]);
}
