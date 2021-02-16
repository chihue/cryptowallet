console.log("Hola desde alante")

setTimeout(function() {
    chrome.browserAction.setBadgeText({text: i.toString()});

    i++;
}, 750);