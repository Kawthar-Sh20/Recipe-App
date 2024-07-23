<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit();
}

require "../connection.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['recipe_id']) && isset($data['user_id']) && isset($data['content'])) {
        $recipe_id = $data['recipe_id'];
        $user_id = $data['user_id'];
        $content = $data['content'];

        $stmt = $conn->prepare('INSERT INTO comments (recipe_id, user_id, content) VALUES (?, ?, ?)');
        $stmt->bind_param('iis', $recipe_id, $user_id, $content);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Comment added successfully"]);
        } else {
            echo json_encode(["error" => "Error adding comment: " . $stmt->error]);
        }
    } else {
        echo json_encode(["error" => "Invalid input"]);
    }
} else {
    echo json_encode(["error" => "Wrong request method"]);
}










//////////////////////////



//////////////////////////////////////////////////////////////////

// require "../connection.php";
// header("Access-Control-Allow-Origin: *"); // Allow all origins. Change "*" to your specific frontend URL if needed.
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");


// if ($_SERVER['REQUEST_METHOD'] == "POST") {
//     $data = json_decode(file_get_contents("php://input"), true);

//     if (isset($data['recipe_id']) && isset($data['user_id']) && isset($data['content']) ) {
//         $recipe_id = $data['recipe_id'];
//         $user_id = $data['user_id'];
    
//         $content= $data['content'];
        
//         $stmt = $conn->prepare('INSERT INTO comments (recipe_id, user_id, content) VALUES (?, ?, ?)');
//         $stmt->bind_param('iis', $recipe_id, $user_id, $content);
        
//         if ($stmt->execute()) {
//             echo json_encode(["message" => "Comment added successfully"]);
//         } else {
//             echo json_encode(["error" => "Error adding comment"]);
//         }
//     } else {
//         echo json_encode(["error" => "Invalid input"]);
//     }
// } else {
//     echo json_encode(["error" => "Wrong request method"]);
// }
?>






















