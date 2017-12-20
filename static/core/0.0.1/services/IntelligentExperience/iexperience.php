<?php

require '../deployment.php';

header("Content-Type:application/json");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if(!empty($_POST['Action']))
{
	$action=$_POST['Action'];

    $captureStatus = retrieve_captureStatus($_POST);
    if(empty($captureStatus))
    {
        echo null;
    }
    else
    {
        echo $captureStatus;
    }
}
else
{
	response(401,"Invalid Action",$rest_json);
}

function retrieve_captureStatus($request)
{
  global $captureEndpoint;

  $url = $captureEndpoint;

  $url = preg_replace("/ /", "%20", $url);

  $guid = $_SERVER['HTTP_GUID'];

  $needsData = $request["needs"];
  $data = array('needs' => $needsData);

  $options = array(
      'http' => array(
          'header'  => "Content-type: application/json\r\n".
                        "channel: Web\r\n".
                        "guid: $guid\r\n".
                        "user_agent: Internet Explorer 11.1.2\r\n".
                        "screen_height: 800\r\n".
                        "screen_width: 1200\r\n",
          'method'  => 'POST',
          'content' => json_encode($data)
      )
  );
  $context  = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  if ($result === FALSE) { return null; }
  return $result;
}

function response($status,$status_message,$data)
{
    //header("HTTP/1.1 ".$status_message);

    $response['status']=$status;
	$response['status_message']=$status_message;
	$response['data']=$data;

	$json_response = json_encode($response);
	echo $json_response;

}
?>
