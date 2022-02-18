<?php 
include 'DBConfig.php';

$conn = mysqli_connect($host, $user, $password,$dbname);

$get_query = "SELECT * FROM subscribe";
$result = mysqli_query($conn, $get_query);
$json_array = array();

while ($row = mysqli_fetch_assoc($result)) {
	$json_array[] = $row;
}

echo json_encode($json_array);

mysqli_close($conn);
 ?>