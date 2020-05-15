function fetch_data() {
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

            load_nums(document.getElementById("btc_balance").value, document.getElementById("usd_balance").value)
        } else {
            console.log('error')
        }
    }

    // Send request
    request.send()
}

function load_nums(btc, usd) {
    console.log("TEST");
    console.log(btc);
    console.log(usd);
    var curr_btc = document.getElementById("curr_btc").value;
    document.getElementById("btc_sell").value = btc * 0.995 * curr_btc;
}

function add_row() {
    var tablaExpandible = document.getElementById("per_calc_table");
    var fila = tablaExpandible.insertRow(tablaExpandible.rows.length - 1);
    var col1 = fila.insertCell(0);
    var col2 = fila.insertCell(1);
    var form = "<input type='text'>"
    col1.innerHTML = form;
    col2.innerHTML = form;
}

function calc_revenue() {
    var table = document.getElementById("per_calc_table");
    var op_amount = [];
    var op_buy_price = [];

    for (var i = 0; i < table.rows.length - 1; i++) {
        row = table.rows[i];
        // val1 = row.cells[0].getElementById("input1").value;
        // val2 = row.cells[1];
        amount = $(row.cells[0]).find("input").val();
        buy_price = $(row.cells[1]).find("input").val();

        op_amount.push(amount);
        op_buy_price.push(buy_price);

        console.log("amount")
        console.log(amount)
        console.log("buy_price")
        console.log(buy_price)
        
    }

    console.log("Array prints")
    for(var i = 0; i < op_amount.length; i++){
        console.log(op_amount[i]);
        console.log(op_buy_price[i]);
    }

}