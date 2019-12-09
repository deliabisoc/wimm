//Whatever the user inputs in the text box from the RED box it will be shown
//before the counting section (How many X did you consume today?

function RedInputItem(val){


    let x = document.getElementById("InputItemRedText").value;
    document.getElementById("HowManyXDidYouConsumeToday").innerHTML = "How many" + " " + x + " " + "did you consume today?";
    document.getElementById("subtotalforred").innerHTML = "The subtotal for" +" " + x + " " + "is:";

}

//INPUT ITEM TEXT QUESTION YELLOW
function YellowInputItem(val){

    let y = document.getElementById("InputItemYellowText").value;
    document.getElementById("HowManyXDidYouConsumeTodayYellow").innerHTML = "How many" + " " + y + " " + "did you consume today?";
    document.getElementById("subtotalforyellow").innerHTML = "The subtotal for" +" " + y + " " + "is:";


}

//INPUT ITEM TEXT QUESTION BLUE
function BlueInputItem(val){

    let z = document.getElementById("InputItemBlueText").value;
    document.getElementById("HowManyXDidYouConsumeTodayBlue").innerHTML = "How many" + " " + z + " " + "did you consume today?";
    document.getElementById("subtotalforblue").innerHTML = "The subtotal for" +" " + z + " " + "is:";

}

function check_buttons() {
    var starting_date = localStorage.getItem("starting_date");
    if (!starting_date) {
        var btns = document.querySelectorAll(".insert");
        btns.forEach(btn => {
            btn.disabled = true;
        });
        return;
    } else {
        var btns = document.querySelectorAll(".insert");

        btns.forEach(btn => {
            btn.disabled = false;
        })
    }
}

function See(color) {
    check_buttons();
    var starting_date = localStorage.getItem("starting_date");

    if (starting_date) {

        var cr = document.getElementById("contorred").value;
        var pr = document.getElementById("pricered").value;

        var cy = document.getElementById("contoryellow").value;
        var py = document.getElementById("priceyellow").value;

        var cb = document.getElementById("contorblue").value;
        var pb = document.getElementById("priceblue").value;

        var crpr = cr * pr;
        var cypy = cy * py;
        var cbpb = cb * pb;

        switch (color) {
            case 'red':

                document.getElementById("aicired").innerHTML = crpr;
                let name_red = document.getElementById("InputItemRedText").value;
                let local_obj_red = {'contor': cr, 'price': pr};
                let existant_product_red = JSON.parse(localStorage.getItem(name_red));

                if (existant_product_red !== null && typeof existant_product_red !== 'undefined') {
                    local_obj_red = {
                        'contor': Number(cr) + Number(existant_product_red.contor),
                        'price': Number(pr),
                    }
                }

                localStorage.setItem(name_red, JSON.stringify(local_obj_red));
                break;

            case 'yellow':
                document.getElementById("aiciyellow").innerHTML = cypy;
                let name_yellow =document.getElementById("InputItemYellowText").value;
                let local_obj_yellow = {'contor': cy, 'price': py, 'subtotal': cypy};
                let existant_product_yellow = JSON.parse(localStorage.getItem(name_yellow));

                if (existant_product_yellow !== null && typeof existant_product_yellow !== 'undefined') {
                    local_obj_yellow = {
                        'contor': Number(cr) + Number(existant_product_yellow.contor),
                        'price': Number(pr),
                    }
                }
                localStorage.setItem(name_yellow, JSON.stringify(local_obj_yellow));
                break;

            case 'blue':
                document.getElementById("aiciblue").innerHTML = cbpb;
                let name_blue = document.getElementById("InputItemBlueText").value;
                let local_obj_blue = {'contor': cb, 'price': pb, 'subtotal': cbpb};
                let existant_product_blue = JSON.parse(localStorage.getItem(name_blue));

                if (existant_product_blue !== null && typeof existant_product_blue !== 'undefined') {
                    local_obj_blue = {
                        'contor': Number(cr) + Number(existant_product_blue.contor),
                        'price': Number(pr),
                    }
                }
                localStorage.setItem(name_blue, JSON.stringify(local_obj_blue));
                break;
        }

        // let sume = JSON.parse(localStorage.getItem('sume'));

        let aicisumapret = cypy + crpr + cbpb;
        let aicisumacontor = Number(cr) + Number(cy) + Number(cb);
        //
        // localStorage.setItem('sume', JSON.stringify({
        //     aicisumapret: aicisumapret,
        //     aicisumacontor: aicisumacontor,
        // }));

        document.getElementById("aicisumapret").innerHTML = aicisumapret;

        document.getElementById("aicisumacontor").innerHTML = aicisumacontor;
    }

}


// *********************************************
// Reminder modal

// Get the modal
var reminder_modal = document.getElementById("reminder_modal");

// Get the button that opens the modal
var reminder_btn = document.getElementById("reminder_button");

// Get the <span> element that closes the modal
var reminder_span = document.getElementsByClassName("reminder_close")[0];

// When the user clicks the button, open the modal
reminder_btn.onclick = function() {
    reminder_modal.style.display = "block";
    update_monthly();

    var reminder_starting_date = localStorage.getItem('starting_date');
    var reminder_ending_date = localStorage.getItem('ending_date');

    document.getElementById("starting_date").innerText = reminder_starting_date;
    document.getElementById("ending_date").innerText = reminder_ending_date;
}

// When the user clicks on <span> (x), close the modal
reminder_span.onclick = function() {
    reminder_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === reminder_modal) {
        reminder_modal.style.display = "none";
    }
}

function starttracking() {
    var today_date = new Date();
    var dd = String(today_date.getDate()).padStart(2, '0');
    var mm = String(today_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today_date.getFullYear();

    var today = mm + '/' + dd + '/' + yyyy;
    localStorage.setItem('starting_date', today);
    document.getElementById("starting_date").innerHTML = today;



    let ending_date = new Date(today_date.setMonth(today_date.getMonth()-1));
    var dd_ending = String(ending_date.getDate()).padStart(2, '0');
    var mm_ending = String(ending_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy_ending = ending_date.getFullYear();

    var ending = mm_ending + '/' + dd_ending + '/' + yyyy_ending;
    localStorage.setItem('ending_date', ending);

    document.getElementById("ending_date").innerHTML = ending;

    check_buttons();

}
function resetdate() {

    localStorage.removeItem('starting_date');
    localStorage.removeItem('ending_date');
    document.getElementById("starting_date").innerHTML = "None Selected";
    document.getElementById("ending_date").innerHTML = "None Selected";

    clear_products();
    check_buttons();
}
// *********************************************
// where is my money modal


// Get the modal
var modal_where_is_money = document.getElementById("where_is_money_modal");

// Get the button that opens the modal
var btn_where_is_money = document.getElementById("where_is_money_button");

// Get the <span> element that closes the modal
var span_where_is_money = document.getElementsByClassName("where_is_money_close")[0];

var where_is_my_money_text = document.getElementById("where_is_my_money_text");

// When the user clicks the button, open the modal
btn_where_is_money.onclick = function() {
    modal_where_is_money.style.display = "block";
    where_is_my_money_text.innerHTML = "";

    var total_counted_item = 0;
    var total_price = 0;

    for (var key in localStorage){
        if (
            key !== "reminder_ending_date" &&
            key !== "reminder_starting_date" &&
            key !== "length" &&
            key !== "setItem" &&
            key !== "getItem" &&
            key !== "removeItem" &&
            key !== "clear" &&
            key !== "key" &&
            key !== "starting_date" &&
            key !== "ending_date" &&
            key !== null
        ) {

            // console.log('key', localStorage.getItem(key));
            let el = document.createElement("div");
            let result = JSON.parse(localStorage.getItem(key));

            total_counted_item += result ? Number(result.contor) : 0;
            total_price += (result ? Number(result.contor) : 0) * (result ? Number(result.price) : 0);

            el.innerText = `${key}: contor = ${result ? result.contor : 0}, price = ${result ? result.price : 0} `;

            where_is_my_money_text.appendChild(el);
        }
    }

    document.getElementById("where_is_money_modal_counted_item").innerText = total_counted_item;
    document.getElementById("where_is_money_modal_total_price").innerText = total_price;


    // let existant_product_yellow = JSON.parse(localStorage.getItem(name_yellow))
}

// When the user clicks on <span> (x), close the modal
span_where_is_money.onclick = function() {
    modal_where_is_money.style.display = "none";
    update_monthly();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal_where_is_money) {
        modal_where_is_money.style.display = "none";
    }
}


// *********************************************
// monthly modal


// Get the modal
var modal_monthly = document.getElementById("monthly_modal");

// Get the button that opens the modal
var btn_monthly = document.getElementById("monthlybtn");

// Get the <span> element that closes the modal
var span_monthly = document.getElementsByClassName("monthly_close")[0];

// When the user clicks the button, open the modal
btn_monthly.onclick = function() {
    modal_monthly.style.display = "block";
    update_monthly();
}

// When the user clicks on <span> (x), close the modal
span_monthly.onclick = function() {
    modal_monthly.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal_monthly) {
        modal_monthly.style.display = "none";
    }
}

//*********************************************

function update_monthly() {
    var today = new Date();
    var stored_ending_date = localStorage.getItem("ending_date");
    console.log('today', today);
    console.log('stored_ending_date', stored_ending_date);

    if (stored_ending_date) {
        var ending_date = new Date(stored_ending_date);

        if (today >= ending_date) {
            var products = get_products();
            var total_counted_item = 0;
            var total_price = 0;

            products.forEach(product_json => {
                var product = JSON.parse(product_json);
                total_counted_item += product ? Number(product.contor) : 0;
                total_price += (product ? Number(product.contor) : 0) * (product ? Number(product.price) : 0);
            })

            var starting_date = localStorage.getItem("starting_date");
            ending_date = localStorage.getItem("ending_date");

            console.log('products', products);

            document.getElementById("monthly_text").innerHTML = `
                <h6>Starting date: ${starting_date}</h6>
                <h6>Ending date: ${ending_date}</h6>
                
                Total Counted Items: ${total_counted_item} <br>
                Total Price: ${total_price}
            `

            clear_products();
        }
    }
}

function get_products() {
    var products = [];
    for (var key in localStorage){
        if (
            key !== "reminder_ending_date" &&
            key !== "reminder_starting_date" &&
            key !== "length" &&
            key !== "setItem" &&
            key !== "getItem" &&
            key !== "removeItem" &&
            key !== "clear" &&
            key !== "key" &&
            key !== "starting_date" &&
            key !== "ending_date" &&
            key !== null
        ) {
            products.push(localStorage.getItem(key));
        }
    }
    return products;
}

function clear_products() {
    for (var key in localStorage){
        if (
            key !== "reminder_ending_date" &&
            key !== "reminder_starting_date" &&
            key !== "length" &&
            key !== "setItem" &&
            key !== "getItem" &&
            key !== "removeItem" &&
            key !== "clear" &&
            key !== "key" &&
            key !== "starting_date" &&
            key !== "ending_date" &&
            key !== null
        ) {
            localStorage.removeItem(key)
        }
    }
}