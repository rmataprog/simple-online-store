(function() {
    var ORDER = {
        cancel_button: document.querySelector('#cancel_order'),
        database: null,
        form_inputs: document.querySelector('#form_inputs').querySelectorAll('.input-field'),
        place_order_button: document.querySelector('#place_order'),
        select_eles: document.querySelectorAll('select'),
        session: window.localStorage
    };

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
    var instance = M.Modal.getInstance(elems.item(0));
    var instance_2 = M.Modal.getInstance(elems.item(1));

    var get_cart = function() {
        var cart;
        if(ORDER.session.getItem('cart') !== null) {
            cart = JSON.parse(ORDER.session.getItem('cart'));
        } else {
            ORDER.session.setItem('cart', '[]');
            cart = [];
        }

        return cart;
    };

    var cart = get_cart();

    if(typeof cart === 'object' && cart.length === 0) {
        ORDER.cancel_button.classList.add('disabled');
        ORDER.place_order_button.classList.add('disabled');
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        ORDER.database = JSON.parse(this.responseText);
    };

    xhttp.open('GET', '../assets/data.json', true);
    xhttp.send();

    ORDER.form_inputs.forEach((input) => {
        var element = input.firstElementChild;
        if(element.nodeType === 3) {
        } else {
            if(element.tagName === 'INPUT') {
                element.value = '';
            }
        }
    })

    ORDER.place_order_button.addEventListener('click', function() {

        if(quantities_checker()) {
            var valid_list = [];
            ORDER.form_inputs.forEach((input) => {
                var element = input.firstElementChild;
                if(element.nodeType === 3) {
                } else {
                    if(element.tagName === 'INPUT') {
                        if (element.required) {
                            switch (element.id) {
                                case 'email':
                                    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element.value);
                                    valid_list.push(valid);
                                    validator({valid: valid, element: element});
                                    break;
                                case 'phone':
                                    var valid = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(element.value);
                                    valid_list.push(valid);
                                    validator({valid: valid, element: element});
                                    break;
                                default:
                                    var valid = element.value.length > 0 ? true : false;
                                    valid_list.push(valid);
                                    validator({valid: valid, element: element});
                                    break;
                            }
                        };
                    } else {
                        var select = element.querySelector('select');
                        var valid = select.value === '' ? false : true;
                        valid_list.push(valid);
                        validator({valid: valid, element: select.parentElement});
                    }
                }
            });
            if(valid_list.every((elem) => { return elem === true })) {
                var order_number = Math.floor(Math.random()*1000000);
                var order_items = [];
                var cart = get_cart();
                cart.forEach((item) => {
                    var item_data = (ORDER.database.filter((item_data_pos) => {
                        return item_data_pos.id === item.id
                    }))[0];
                    order_items.push({
                        title: item_data.title,
                        price: item_data.price,
                        id: item_data.id,
                        image: item_data.image,
                        quantity: item.quantity
                    });
                });
                var products_amount = (order_items.reduce((total, item) => {
                    return total + parseInt(item.price)*parseInt(item.quantity);
                }, 0)).toFixed(2);
                var tax = (products_amount*0.05).toFixed(2);
                var order = {
                    date: (new Date()).toDateString(),
                    number: order_number,
                    billing: {
                        products_amount: products_amount,
                        tax: tax,
                        shipping: 5.25,
                        total: parseFloat(products_amount) + parseFloat(tax) + 5.25
                    },
                    shipping: {
                        name: `${ORDER.form_inputs.item(0).getElementsByTagName('input').item(0).value} ${ORDER.form_inputs.item(1).getElementsByTagName('input').item(0).value}`,
                        email: ORDER.form_inputs.item(2).getElementsByTagName('input').item(0).value,
                        phone: ORDER.form_inputs.item(3).getElementsByTagName('input').item(0).value,
                        address_1: ORDER.form_inputs.item(4).getElementsByTagName('input').item(0).value,
                        address_2: ORDER.form_inputs.item(5).getElementsByTagName('input').item(0).value,
                        state: ORDER.form_inputs.item(6).getElementsByTagName('select').item(0).value,
                        county: ORDER.form_inputs.item(7).getElementsByTagName('select').item(0).value,
                        city: ORDER.form_inputs.item(8).getElementsByTagName('select').item(0).value,
                        zip_code: ORDER.form_inputs.item(9).getElementsByTagName('select').item(0).value
                    },
                    products: order_items
                };
                add_order(order);
                ORDER.session.setItem('cart', '[]');
                window.location.assign('/html/order_placed.html');
            } else {
                instance_2.open();
            }
        } else {
            instance.open();
        }
    }, false);

    var validator = function(data) {
        if(!data.valid) {
            if(data.element.classList.contains('valid')) {
                data.element.classList.replace('valid', 'invalid');
            } else {
                data.element.classList.add('invalid');
            };
        } else {
            if(data.element.classList.contains('invalid')) {
                data.element.classList.replace('invalid', 'valid');
            } else {
                data.element.classList.add('valid');
            };
        };
    };

    var quantities_checker = function() {
        var cart = get_cart();
        var flag = true;
        cart.forEach((item) => {
            var item_data = (ORDER.database.filter((item_data_pos) => {
                return item_data_pos.id === item.id
            }))[0];
            
            if (item_data.quantity < parseInt(item.quantity)) {
                flag = false;
            };
        });
        return flag;
    };

    var add_order = function(input) {
        if(ORDER.session.getItem('orders') !== null) {
            orders = JSON.parse(ORDER.session.getItem('orders'));
            var exists = orders.some((order) => {
                return parseInt(order.number) === input.number;
            });
            if(!exists) {
                orders.push(input);
                ORDER.session.setItem('orders', JSON.stringify(orders));
            }
        } else {
            var orders = [];
            orders.push(input);
            ORDER.session.setItem('orders', JSON.stringify(orders));
        }
    }
})();