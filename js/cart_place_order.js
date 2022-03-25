(function() {
    var ORDER = {
        cancel_button: document.querySelector('#cancel_order'),
        form_inputs: document.querySelector('#form_inputs').querySelectorAll('.input-field'),
        place_order_button: document.querySelector('#place_order'),
        select_eles: document.querySelectorAll('select'),
        session: window.localStorage
    };

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
        ORDER.form_inputs.forEach((input) => {
            var element = input.firstElementChild;
            if(element.nodeType === 3) {
            } else {
                if(element.tagName === 'INPUT') {
                    if (element.required) {
                        switch (element.id) {
                            case 'email':
                                var valid = /[^@]+@[^@]+/.test(element.value);
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
        })
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
})();