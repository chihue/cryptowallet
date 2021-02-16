console.log("Me ejecutan111")
var fullurl = window.location.href;

var coinUrl = "https://zumbon.uv.es/coinbase.php";
//var coinUrl = "http://localhost:8080/coin/coinbase";

if (fullurl.includes(coinUrl)){

    var access_token = document.getElementById("access_token");
    var refresh_token = document.getElementById("refresh_token");
    if (access_token != null && refresh_token != null){
        
    }

    console.log(token);
}


