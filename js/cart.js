(function(){

    var CART = {
        database: null,
        data_container: document.querySelector('div#cart-list'),
        session: window.localStorage,
        items_total: 0,
        items_total_ele: document.querySelector('span#items_total'),
        tax_ele: document.querySelector('span#tax'),
        tax_percentage: 16,
        tax: 0
    };

    var get_cart = function() {
        var cart;
        if(CART.session.getItem('cart') !== null) {
            cart = JSON.parse(CART.session.getItem('cart'));
        } else {
            CART.session.setItem('cart', '[]');
            cart = [];
        }

        return cart;
    };

    CART.data_container.innerHTML = '';

    var xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        CART.database = JSON.parse(this.responseText);
        console.log(CART.database);
        var cart = get_cart();

        cart.forEach((item) => {
            var item_data = CART.database.filter((ele) => {
                return ele.id === item.id
            });

            var input = {
                id: item_data[0].id,
                image: item_data[0].image,
                title: item_data[0].title,
                price: item_data[0].price,
                quantity: item.quantity,
                stock: item_data[0].quantity
            };

            var elem = element_creator(input);

            CART.data_container.appendChild(elem);
        });

        total_calculator(CART.database);
    }

    xhttp.open('GET', '../assets/data.json', true);
    xhttp.send();

    function element_creator(input) {

        var div_row = document.createElement('div');
        div_row.classList.add('row');

        var image_div = document.createElement('div');
        image_div.classList.add('col');
        image_div.classList.add('s2');
        
        var img = document.createElement('img');
        img.classList.add('responsive-img');
        img.src = input.image;

        image_div.appendChild(img);

        var div_col_1 = document.createElement('div');
        div_col_1.classList.add('col');
        div_col_1.classList.add('s4');

        var id_p = document.createElement('p');
        id_p.textContent = input.id;
        var title_p = document.createElement('p');
        title_p.textContent = input.title;
        div_col_1.appendChild(id_p);
        div_col_1.appendChild(title_p);

        var div_col_2 = document.createElement('div');
        div_col_2.classList.add('col');
        div_col_2.classList.add('s2');

        var unit_price_p = document.createElement('p');
        unit_price_p.textContent = `${input.price}$`;
        div_col_1.appendChild(unit_price_p);

        var div_col_3 = document.createElement('div');
        div_col_3.classList.add('col');
        div_col_3.classList.add('s2');

        var input_ele = document.createElement('input');
        input_ele.type = 'number';
        input_ele.min = '1';
        input_ele.value = input.quantity;
        input_ele.dataset.id = input.id;

        var span_helper = document.createElement('span');
        span_helper.className = 'helper-text';
        span_helper.dataset.error = 'not enough stock';

        if(input.quantity > input.stock) {
            input_ele.classList.add('invalid');
        };

        div_col_3.appendChild(input_ele);
        div_col_3.appendChild(span_helper);

        var div_col_4 = document.createElement('div');
        div_col_4.classList.add('col');
        div_col_4.classList.add('s2');

        var sub_total = document.createElement('p');
        sub_total.textContent = `${(input_ele.value*input.price).toFixed(2)}$`;
        div_col_4.appendChild(sub_total);

        input_ele.addEventListener('change', function(e) {
            var target = e.target;

            if(input.stock < target.value) {
                if(!target.classList.contains('invalid')) {
                    target.classList.add('invalid');
                };
            } else {
                if(target.classList.contains('invalid')) {
                    target.classList.remove('invalid');
                };
            }

            var cart = get_cart();
            var index = cart.findIndex((item) => {
                return item.id === input.id;
            });
            cart[index].quantity = this.value;
            CART.session.setItem('cart', JSON.stringify(cart));

            sub_total.textContent = `${(this.value*input.price).toFixed(2)}$`;

            total_calculator(CART.database);
        }, false);

        div_row.appendChild(image_div);
        div_row.appendChild(div_col_1);
        div_row.appendChild(div_col_2);
        div_row.appendChild(div_col_3);
        div_row.appendChild(div_col_4);

        return div_row;
    }

    function total_calculator(input) {
        var total = 0;

        var cart = get_cart();

        cart.forEach((item) => {
            var data = input.filter((ele) => {
                return ele.id === item.id
            });

            if(data.length > 0) {
                total += data[0].price*item.quantity;
            }
        });

        var tax = ((CART.tax_percentage*total)/100).toFixed(2);

        CART.items_total_ele.textContent = `${total.toFixed(2)}`;
        CART.tax_ele.textContent = `${tax}`;
    };
})();