<?php

require '../deployment.php';

function predictive_address($request)
{
    global $addressLookupEndpoint;
    global $addressLookupUserId;
    global $addressLookupSecret;

	$address = urlencode($request["AddressLine"]);
	$url = $addressLookupEndpoint;
    $url = preg_replace("/ /", "%20", $url);

	$address1 = array(array('fullAddress' => $request["AddressLine"]));
    $data = array('payload' => $address1, 'sourceOfTruth' => 'GNAF');

    // use key 'http' even if you send the request to https://...
    $user = $addressLookupUserId;
    $pass = $addressLookupSecret;

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\nAuthorization: Basic ". base64_encode("$user:$pass"),
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) { return null; }
    return $result;
}

function predictive_postcode($request){
    global $addressPostcodeEndpoint;
    global $addressLookupUserId;
    global $addressLookupSecret;

	$url = $addressPostcodeEndpoint;
    $url = preg_replace("/ /", "%20", $url);

	$address1 = array(array('postcode' => $request["AddressLine"]));
    $data = array('payload' => $address1, 'sourceOfTruth' => 'GNAF');

    // use key 'http' even if you send the request to https://...
    $user = $addressLookupUserId;
    $pass = $addressLookupSecret;

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\nAuthorization: Basic ". base64_encode("$user:$pass"),
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) { return null; }
    return $result;

}

function transact_address()
{
    global $addressTransactEndpoint;
    global $addressLookupUserId;
    global $addressLookupSecret;

	$url = $addressTransactEndpoint;
    $url = preg_replace("/ /", "%20", $url);
    $data = array('sourceOfTruth' => 'GNAF');

    // use key 'http' even if you send the request to https://...
    $user = $addressLookupUserId;
    $pass = $addressLookupSecret;

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\nAuthorization: Basic ". base64_encode("$user:$pass"),
            'method'  => 'POST',
            'content' => json_encode($data)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) { return null; }
    return $result;
}
?>
