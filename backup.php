<?php  

if (isset($_POST['password'])) {
	$correctPass = '0a5c277a921b44e9e65aab084224fd28f8f184c1838d8de8d6a464d154f97ebf';
	$pass = hash("sha256", $_POST['password']);
	unset($_POST['password']);
	
	if ($pass == $correctPass) {
		// including wordpress config file
		require_once('wp-config.php');
		// DB config
		$DBUSER = DB_USER;
		$DBPASSWD = DB_PASSWORD;
		$DATABASE = DB_NAME;
		$pdb_server = DB_HOST;
		// DB config end
		$command = "mysqldump -h $pdb_server -u $DBUSER ".($DBPASSWD ? '-p'.$DBPASSWD : '')." $DATABASE > wpstarter.sql";
		system($command, $output);
		if ($output == 0) {
			$message = ["success", "Sql dump succesfully created."];
		}else{
			$message = ["danger", "Something went wrong!"];
		}

	}else{

		$message = ["danger", "Incorrect password!"];

	}	

}else{
	$message = ["info","Enter password."];
}

?>

<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link href="https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<title>Administration panel</title>
	</head>

	<body>

		<div class="container" style="padding-top: 20px">
			
			<!-- message box -->
			<?php if (isset($message)) : ?>

				<div class="alert alert-<?php echo $message[0] ?>">
					<?php echo $message[1] ?>
				</div>

			<?php endif; ?>

			<?php if ($message[0] != "success") : ?>
			
				<form method="post">

					<div class="form-group">
						<label for="password">Password</label>
						<input type="password" class="form-control" id="password" name="password" placeholder="Password">
					</div>

					<button type="submit" class="btn btn-primary">Execute</button>

				</form>

			<?php endif; ?>
		
		</div>
		
	</body>

</html>

<?php 

unset($message);

?>