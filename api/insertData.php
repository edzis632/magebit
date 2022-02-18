<?php 
include 'DBConfig.php';

$conn = mysqli_connect($host, $user, $password,$dbname);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
	case 'POST':
	$email = $_POST["email"];
	$sql = "INSERT INTO subscribe (email) VALUES('$email')";
	break;
}

$result = mysqli_query($conn,$sql);


/*if (mysqli_query($conn, $insertQuery) && !empty($recText)) {
	echo "Data inserted";
}
else {
	echo "error";
}*/
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
 
if ($method == 'GET') {
    if (!$id) echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
  } elseif ($method == 'POST') {
    echo json_encode($result);
  } else {
    echo mysqli_affected_rows($con);
  }
 
$con->close();
 ?>