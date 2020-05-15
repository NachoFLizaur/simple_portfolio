function fetch_data() {
    // Create a request variable and assign a new XMLHttpRequest object to it.

    var request = new XMLHttpRequest()
    
    // Open a new connection, using the GET request on the URL endpoint
    // request.open('GET', 'https://www.bitstamp.net/api/ticker/', true)
    
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
            callback();  
        } else {
            console.log('error')
        }
    }
    
    // Send request
    for(var i = 0; i < 5; i++){
        request.open('GET', 'https://www.bitstamp.net/api/v2/ticker/btceur/', true)
        request.send();
    }
}

function load_nums(btc, usd) {
    console.log("TEST");
    console.log(btc);
    console.log(usd);
    var curr_btc = document.getElementById("curr_btc").value;
    document.getElementById("btc_sell").value = Math.floor(btc * 0.995 * curr_btc * 1e2) / 1e2;
}

function add_row() {
    var tablaExpandible = document.getElementById("per_calc_table");
    var fila = tablaExpandible.insertRow(tablaExpandible.rows.length - 2);
    var col1 = fila.insertCell(0);
    var col2 = fila.insertCell(1);
    var col3 = fila.insertCell(2);
    var form = "<input type='text'>"
    var form2 = "<input type='text' value = \"0.005\">"
    col1.innerHTML = form;
    col2.innerHTML = form;
    col3.innerHTML = form2;
}

function calc_revenue(btc_balance, actual_money) {
    var table = document.getElementById("per_calc_table");
    var op_amount = [];
    var op_buy_price = [];
    var op_fee = [];
    var op_btc = [];

    for (var i = 1; i < table.rows.length - 2; i++) {
        row = table.rows[i];
        // val1 = row.cells[0].getElementById("input1").value;
        // val2 = row.cells[1];
        amount = $(row.cells[0]).find("input").val();
        buy_price = $(row.cells[1]).find("input").val();
        fee = $(row.cells[2]).find("input").val();
        aux = amount * (1 - fee) / buy_price;
        btc = Math.floor(aux * 1e8) / 1e8;


        op_amount.push(parseFloat(amount));
        op_buy_price.push(parseFloat(buy_price));
        op_fee.push(parseFloat(fee));
        op_btc.push(btc);

        console.log("amount")
        console.log(amount)
        console.log("buy_price")
        console.log(buy_price)
        console.log("fee")
        console.log(fee)
        console.log("btc")
        console.log(btc)

    }

    var btc_sum = 0;
    var spent_sum = 0;

    console.log("Array prints")
    for (var i = 0; i < op_amount.length; i++) {
        console.log(op_amount[i]);
        console.log(op_buy_price[i]);
        console.log(op_fee[i]);
        console.log(op_btc[i]);

        btc_sum += op_btc[i];
        spent_sum += op_amount[i];
    }
    console.log(btc_sum);
    console.log(spent_sum);

    // var actual_btc = getElementById("btc_balance").value;
    // var actual_money = getElementById("btc_sell").value;

    roi_aux = ((actual_money / spent_sum) - 1) * 100;
    btc_gain_aux = ((btc_balance / btc_sum) - 1) * 100;

    roi = Math.floor(roi_aux * 1e2) / 1e2;
    btc_gain = Math.floor(btc_gain_aux * 1e2) / 1e2;

    console.log(roi);
    console.log(btc_gain);

    document.getElementById("roi").value = "ROI (%) = " + roi;
    document.getElementById("btc_gain").value = "BTC gained (%) = " + btc_gain;

}