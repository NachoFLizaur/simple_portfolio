function fetchdata() {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://www.bitstamp.net/api/ticker/', true)

    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(this.response)
            console.log("btc_price")
            console.log(data.last)
            document.getElementById("curr_btc").value = data.last;
            document.getElementById("min_buy").value = document.getElementById("curr_btc").value * 0.99025;

            loadnums(document.getElementById("btc_balance").value, document.getElementById("usd_balance").value)
        } else {
            console.log('error')
        }
    }

    // Send request
    request.send()
}

function loadnums(btc, usd) {
    console.log("TEST");
    console.log(btc);
    console.log(usd);
    var curr_btc = document.getElementById("curr_btc").value;
    document.getElementById("btc_sell").value = btc * 0.995 * curr_btc;
}

function addrow() {
    var tablaExpandible = document.getElementById("per_calc");
    var fila = tablaExpandible.insertRow(tablaExpandible.rows.length - 1);
    var col1 = fila.insertCell(0);
    var col2 = fila.insertCell(1);
    var form = "<input type='text'>"
    col1.innerHTML = form;
    col2.innerHTML = form;
}
