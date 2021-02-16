var status = document.getElementById('status');
var Data = {};

$.ajax({
    data : Data,
    type : "GET",
    dataType : "json",
    url : "https://www.coinbase.com/api/v2/assets/prices?base=EUR&filter=holdable&resolution=latest" ,
}).done(function(data, textStatus, jqXHR) {   
    chrome.storage.sync.get("cryptos", function (obj) {  
        var cryptosValues = document.getElementById('cryptos');
        cryptosValues.setAttribute("multiple", true);

        data.data.forEach(element => {
            found = obj.cryptos.find(e => e.name == element.base);
    
            var option = document.createElement('option');
            option.innerHTML = element.base;
            option.setAttribute("id", element.base);
            option.setAttribute("base_id", element.base_id);
            if (found != undefined){
                option.setAttribute("selected", true);
            }
            cryptosValues.appendChild(option);
    
            
        }); 

            found = obj.cryptos.find(e => e.name == "ADA");
            var option = document.createElement('option');
            option.innerHTML = "ADA";
            option.setAttribute("id", "ADA");
            option.setAttribute("base_id", "63062039-7afb-56ff-8e19-5e3215dc404a");
            if (found != undefined){
                option.setAttribute("selected", true);
            }
            cryptosValues.appendChild(option);
    });

    
    //console.log(cryptosARR)
    

     
}).fail(function(jqXHR, textStatus, errorThrown) {
    status.textContent = 'Error cargando los datos.';
    console.log("fail");
});

/* document.getElementById('save').addEventListener("click", function(){
    var cryptos = document.getElementById('cryptos').value;
    if (cryptos != null){
        separados = cryptos.split(',');
        separados = separados.filter(function (el) { 
            return (el != null || e1 != ''); 
        }); 

        chrome.storage.sync.set({'cryptos': separados}, function() {
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
          });
    }
});
 */

document.getElementById('save').addEventListener("click", function(){
    var cryptos = document.getElementById('cryptos').selectedOptions;
    var cryptosARR = [];

    for (var i = 0; i< cryptos.length; i++){
        var base_id = cryptos[i].getAttribute("base_id");
        var name = cryptos[i].getAttribute("id");
        var Data = {
            name: name,
            base_id: base_id
        };

        cryptosARR.push(Data);
    }

    chrome.storage.sync.set({'cryptos': cryptosARR}, function() {
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
      });


      var actu = document.getElementById('actu').value;
      chrome.storage.sync.set({'actu': actu}, function() {});
});