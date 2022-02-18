<?php
include 'DBConfig.php';

// Connecting to MySQL Database.
$conn = mysqli_connect($host, $user, $password,$dbname);

$record_id = $_POST['id'];

// Creating SQL query and Updating the current record into MySQL database table.
$delete_query = "DELETE FROM subscribe WHERE id = '$record_id'" ;


if (mysqli_query($conn, $delete_query)) {
    echo "Data deleted";
}
else {
    echo "error";
}

mysqli_close($conn);
?>