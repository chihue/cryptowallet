<?php
    $code = $_GET['code'];
    if ($isset($code)){
        $data = "grant_type=authorization_code&code=" . $code ."&client_id=b0ea056908bd601071a48d6f900934496f45c0acf9706904c66b238579c06993&client_secret=248f5ce42f051ce7673a02fc4f6b6e9dd41dd8482285120f008f34012ae938ac&redirect_uri=https://zumbon.uv.es/coinbase.php";
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        $result = curl_exec($curl);

        curl_close($curl);

        print($result)
    }   else    {
        print("nada")
    }
?>