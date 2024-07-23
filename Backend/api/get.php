
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
