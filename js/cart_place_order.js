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
            ORDER.form_inputs.forEach((input) => {
                var element = input.firstElementChild;
                if(element.nodeType === 3) {
                } else {
                    if(element.tagName === 'INPUT') {
                        if (element.required) {
                            switch (element.id) {
                                case 'email':
                                    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element.value);
                                    validator({valid: valid, element: element});
                                    break;
                                case 'phone':
                                    var valid = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(element.value);
                                    validator({valid: valid, element: element});
                                    break;
                                default:
                                    var valid = element.value.length > 0 ? true : false;
                                    validator({valid: valid, element: element});
                                    break;
                            }
                        };
                    } else {
                        var select = element.querySelector('select');
                        var valid = select.value === '' ? false : true;
                        console.log(select.parentElement);
                        validator({valid: valid, element: select.parentElement});
                    }
                }
            });
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
})();