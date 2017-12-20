<?php

require '../deployment.php';


	if($_SERVER['REQUEST_METHOD'] == "GET"){
		if(empty($_GET['VerticalId']) || empty($_GET['Process'])) {
			response(401,"One of the url parameters are empty", $_SERVER['REQUEST_METHOD']);
		}
		else {
			$needsSchema = retrieve_needsSchema($_GET);
			if(empty($needsSchema)){
				echo null;
			}
			else{
				echo $needsSchema;
			}
		}
	}
	else {
		response(401,"Invalid Request Method", $_SERVER['REQUEST_METHOD']);
	}
	
	function retrieve_needsSchema($request) {
	    global $needsEndpoint;

		$url = $needsEndpoint;
		$url .= $request['VerticalId'];
		$url .= '/';
		$url .= $request['Process'];
		$url = preg_replace("/ /", "%20", $url);

		$options = array( 
		  'http' => array(
			  'header'  => "Content-type: application/json",
			  'method'  => 'GET'
		  )
		);
		$context  = stream_context_create($options);
		$result = file_get_contents($url, false, $context);
		if ($result === FALSE) { return null; }
		return $result;
	}  
	
	function response($status,$status_message,$data) {
		$response['status']=$status;
		$response['status_message']=$status_message;
		$response['data']=$data;

		$json_response = json_encode($response);
		echo $json_response;
	}
?>
