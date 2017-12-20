<?php

header("Content-Type:application/json");
require "iselect.web.apidata.php";

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if(!empty($_POST['Action']))
{
	$action=$_POST['Action'];

    switch ($action) {
        case "PredictiveAddress":
            $address = predictive_address($_POST);
            if(empty($address))
            {
                echo null;
            }
            else
            {
                echo $address;
            }
            break;
        case "PredictivePostcode":
            $postcode = predictive_postcode($_POST);
            if(empty($postcode))
            {
                echo null;
            }
            else
            {
                echo $postcode;
            }
            break;
        case "TransactionAddress":
            $trans = transact_address();
            if(empty($trans))
            {
                echo null;
            }
            else
            {
                echo $trans;
            }
            break;
    }
}
else
{
	response(401,"Invalid Action",$rest_json);
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
