(function() {
        
    var PRODUCT_LANDING = {
        session: window.localStorage
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        var selected_item = parseInt(PRODUCT_LANDING.session.getItem('selected_item'));
        var data = JSON.parse(this.responseText);
        var selected_item_data = (data.filter(item => {
            return item.id === selected_item;
        })).length > 0 ? (data.filter(item => { return item.id === selected_item; }))[0] : {};
        
        console.log(selected_item_data);
    }

    xhttp.open('GET', '../assets/data.json', true);
    xhttp.send();
})();