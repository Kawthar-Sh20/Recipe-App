<?php

require '../connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    
    // Retrieve the raw POST data from the request.
    $rawData = file_get_contents("php://input");
    // Decode the JSON input into an associative array.
    $data = json_decode($rawData, true);

    // Check if data decoding was successful
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["error" => "Invalid JSON data"]);
        exit;
    }

    // Extract data from the decoded array
    $username = isset($data['username']) ? $data['username'] : null;
    $email = isset($data['email']) ? $data['email'] : null;
    $password = isset($data['password']) ? $data['password'] : null;

    if ($username === null || $email === null || $password === null) {
        echo json_encode(["error" => "Missing required fields"]);
        exit;
    }

    // Prepare SQL to check if username or email already exists
    $check_email = $conn->prepare('SELECT id FROM users WHERE username=? OR email=?;');
    $check_email->bind_param('ss', $username, $email);
    $check_email->execute();
    $result = $check_email->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["error" => "Username or email already exists"]);
    } else {
        // Hash the password using bcrypt
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        // Prepare SQL to insert the new user
        $stmt = $conn->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?);');
        $stmt->bind_param('sss', $username, $email, $hashed_password);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(["status" => "success", "message" => "User registered successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to register user"]);
        }
    }
} else {
    echo json_encode(["error" => "Wrong request method"]);
}
