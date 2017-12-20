<?php

require '../deployment.php';

header("Content-Type:application/json");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if(!empty($_POST['Action']))
{
	$action=$_POST['Action'];

    switch ($action) {        
        case "Recommendations":
            $recommendations = retrieve_recommendations($_POST);
            if(empty($recommendations))
            {
                echo null;
            }
            else
            {
                echo $recommendations;
            }
            break;
        case "LeadAPI":
            $leadAPIStatus = create_lead($_POST);
            if(empty($leadAPIStatus))
            {
                echo null;
            }
            else
            {
                echo $leadAPIStatus;
            }
            break;
    }
}
else
{
	response(401,"Invalid Action",$rest_json);
}

function retrieve_recommendations($request)
{
  global $recommendationsEndpoint;
  global $recommendationsClientId;
  global $recommendationsClientSecret;

  $url = $recommendationsEndpoint;
  $url = preg_replace("/ /", "%20", $url);

  $guid = $_SERVER['HTTP_GUID'];
  $data = $request["postData"];

  $options = array(
      'http' => array(
          'header'  => "Content-type: application/json\r\n".
                        "channel: Web\r\n".
                        "guid: $guid\r\n".
                        "client_id: ${recommendationsClientId}\r\n".
                        "client_secret: ${recommendationsClientSecret}",
          'method'  => 'POST',
          'content' => json_encode($data)
      )
  );
  $context  = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  if ($result === FALSE) { return null; }
  return $result;
}

function create_lead($request)
{
  global $leadEndpoint;

  $url = $leadEndpoint;
  $url = preg_replace("/ /", "%20", $url);

  $guid = $_SERVER['HTTP_GUID'];
  $data = $request["postData"];

  $options = array(
      'http' => array(
          'header'  => "Content-type: application/json\r\n".
                       "channel: Web\r\n".
                       "guid: $guid",
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
    $response['status']=$status;
	$response['status_message']=$status_message;
	$response['data']=$data;

	$json_response = json_encode($response);
	echo $json_response;
}

?>
