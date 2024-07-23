<?php

require "../connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['recipe_name']) && isset($data['ingredients']) && isset($data['steps']) && isset($data['user_id'])) {
        $recipe_name = $data['recipe_name'];
        $ingredients = json_encode($data['ingredients']); // Convert array to JSON string
        $steps = json_encode($data['steps']); // Convert array to JSON string
        $user_id = $data['user_id'];
        
        $stmt = $conn->prepare('INSERT INTO recipes (recipe_name, ingredients, steps, user_id) VALUES (?, ?, ?, ?)');
        $stmt->bind_param('sssi', $recipe_name, $ingredients, $steps, $user_id);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Recipe created successfully"]);
        } else {
            echo json_encode(["error" => "Error creating recipe"]);
        }
    } else {
        echo json_encode(["error" => "Invalid input"]);
    }
} else {
    echo json_encode(["error" => "Wrong request method"]);
}
