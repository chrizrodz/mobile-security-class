<?php
$name = $_POST["teamname"];
$pass = $_POST["teampass"];
if($pass == "hunter2")
{
	$msg = exec("echo " . $name . " ".'>'.'>'." winners.txt");
	print_r("Success! Congrats for completeing the challenge " . $name);
}
else
{
	$msg = shell_exec("echo " . $name . "," . $pass . " ".'>'.'>'." losers.txt");
	print_r("Sorry, try again. " . $name . " with the password " . $pass . " was not found in our database<br></br>");
	echo($msg);
}

?>
