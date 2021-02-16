
function renderChart(context, data, labels, currency) {
    var ctx = context.getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: currency,
                data: data,
            }]
        },
    });
}



$( document ).ready(function() {
    chrome.storage.sync.get("cryptos", function (obj) {  
        var txt = "";
        obj['cryptos'].forEach(element => {
            if (element != null && element != ''){
                getData(element.base_id, element.name)
            }
        });
    });

    var divContent = document.getElementById('container')

    function addCurrency(name, prices, times, pHour, pDay){
        var context = document.createElement('canvas');
        context.setAttribute("id", name);
        divContent.appendChild(context);
        renderChart(context, prices, times, name);

        var p = document.createElement('p');
        p.innerHTML = 'Ultima hora: ' + pHour + '%; Ultimo dia: ' + pDay + '%';
        divContent.appendChild(p);
        var hr = document.createElement('hr');
        divContent.appendChild(hr);
    }


    function getData(baseId, name){
        var times = [];
        var prices = [];

        var url = "https://www.coinbase.com/api/v2/assets/prices/" + baseId + "?base=EUR";
        console.log(url)
        var Data = {};
        $.ajax({
            data : Data,
            type : "GET",
            dataType : "json",
            url : url
        }).done(function(data, textStatus, jqXHR) {  
            console.log(data.data.prices.day.prices) 
            var pDay = (data.data.prices.latest_price.percent_change.day * 100).toFixed(2);
            var pHour = (data.data.prices.latest_price.percent_change.hour * 100).toFixed(2);
            data.data.prices.day.prices.forEach(e => {
                prices.push(e[0])
                times.push(formatDate(e[1]))
            })
            addCurrency(name, prices, times, pHour, pDay);
            
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log("fail");
        });
    }

    function formatDate(time){
        var date = new Date(time * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();

        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
});