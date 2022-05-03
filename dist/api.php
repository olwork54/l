<?php

if (!isset($_POST['name']) || !isset($_POST['phone']))
    if (isset($_SERVER['HTTP_REFERER']))
        header("Location: " . $_SERVER['HTTP_REFERER']);
    else
        header("Location: /");


$url = 'https://hm.afflifter.com/api/leads';
$user_agent = $_SERVER['HTTP_USER_AGENT'];

$ip = (isset($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR']);
if (strpos($ip, ',')  !== false) {
    $ip = substr($ip, 0, strpos($ip, ','));
}
$ch = curl_init();

$data = array(
    'name'          => $_POST['name'],
    'phone'         => $_POST['phone'],
    'country'       => 'US',
    'api_key'       => '5BkaPPvmbKKLS4RTsShDQnOgEJaK9l9WJYvsUYByfiMYOCgeLUB00H9RNiuCLWLHGMuiUbGFCgM12lV9uduQC9NOeWpiGdffD27Q',
    'stream_id'     => '2',
    'ip'            => $ip,
    'tz'            => '',
    'address'       => isset($_POST['address']) ? $_POST['address'] : '',
    'user_agent'    => $user_agent,
    'email'         => isset($_POST['email']) ? $_POST['email'] : '',
    'password'      => isset($_POST['password']) ? $_POST['password'] : '',

    'utm_source'    => isset($_GET['utm_source'])   ? $_GET['utm_source']   : null,
    'utm_medium'    => isset($_GET['utm_medium'])   ? $_GET['utm_medium']   : null,
    'utm_campaign'  => isset($_GET['utm_campaign']) ? $_GET['utm_campaign'] : null,
    'utm_term'      => isset($_GET['utm_term'])     ? $_GET['utm_term']     : null,
    'utm_content'   => isset($_GET['utm_content'])  ? $_GET['utm_content']  : null,

    'sub_id'        => isset($_GET['sub_id'])       ? $_GET['sub_id']       : (!empty($_POST['subid']) ? $_POST['subid'] : null),
    'sub_id_1'      => isset($_GET['sub_id_1'])     ? $_GET['sub_id_1']     : null,
    'sub_id_2'      => isset($_GET['sub_id_2'])     ? $_GET['sub_id_2']     : null,
    'sub_id_3'      => isset($_GET['sub_id_3'])     ? $_GET['sub_id_3']     : null,
    'sub_id_4'      => isset($_GET['sub_id_4'])     ? $_GET['sub_id_4']     : null,

    'click_id'      => isset($_GET['click_id'])     ? $_GET['click_id']     : null,

    'referrer'      => isset($_POST['referrer'])    ? $_POST['referrer']    : null,
    'landing_url'   => isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null,

    'order'         => [
        'zip_code'              => isset($_POST['zip_code']) ? $_POST['zip_code'] : '',
        'why_interested'        => isset($_POST['why_interested']) ? $_POST['why_interested'] : '',
        'homeowner'             => isset($_POST['homeowner']) ? $_POST['homeowner'] : '',
        'mobile_home'           => isset($_POST['mobile_home']) ? $_POST['mobile_home'] : '',
        'existing_tub'          => isset($_POST['existing_tub']) ? $_POST['existing_tub'] : '',
        'insurance_coverage'    => isset($_POST['insurance_coverage']) ? $_POST['insurance_coverage'] : '',
    ],
);


try {
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($ch);

    $curl_error = curl_error($ch);
    $curl_errno = curl_errno($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    $response = array(
        'error' => $curl_error,
        'errno' => $curl_errno,
        'http_code' => $http_code,
        'result' => $result,
    );

    if ($response['http_code'] == 200 && $response['errno'] === 0) {
        $resultOk = json_decode($response['result'], true);
        if(!is_null($resultOk['redirect_url'])){
            header('Location: ' . $resultOk['redirect_url']);
            exit;
        }

        session_start();
        $_SESSION['data'] = $data;
        $_SESSION['lead_id'] = $resultOk['lead_id'];

        $trackingParam = '';

        if (!is_null($_GET['pixel'])) {
            $trackingParam = '?pixel=' . $_GET['pixel'];
        } elseif (!is_null($_GET['tiktok'])) {
            $trackingParam = '?tiktok=' . $_GET['tiktok'];
        }

        header('Location: success.php' . $trackingParam);
    } else {
        if (!empty($response['result'])) {
            $result = json_decode($response['result']);
            throw new Exception($result->error);
        } else {
            throw new Exception('HTTP request error. ' . $response['error']);
        }
    }
} catch (Exception $e) {
    echo $e->getMessage();
}
