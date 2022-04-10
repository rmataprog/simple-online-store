(function() {
    var PRODUCT_LIST = {
        buttons_container: document.getElementsByTagName('div').item(0).querySelectorAll('div.row').item(0),
        list_container: document.getElementsByTagName('div').item(0).querySelectorAll('div.row').item(1),
        product_search_input: document.getElementById('search'),
        session: window.localStorage
    };
    
    PRODUCT_LIST.list_container.innerHTML = '';

    var products = [];
    var categories = {};
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onload = function() {
        var data = JSON.parse(this.responseText);

        data.forEach((element) => {
            var item_elem = card_creator(element);
            products.push({
                product: element,
                product_ele: item_elem
            });
            if(categories[element.category] === undefined) {
                categories[element.category] = [];
            }
            categories[element.category].push(element.id);
            PRODUCT_LIST.list_container.appendChild(item_elem);
        });
        buttons_creator();
    }
    
    xhttp.open('GET', '../assets/data.json', true);
    xhttp.send();
    
    var card_creator = function(input) {
        var column_div = document.createElement('div');
        var column_div_classes = ['col', 's12', 'm4', 'l4', 'xl3'];
        column_div_classes.forEach(class_ => {
            column_div.classList.add(class_);
        });
        var card_div = document.createElement('div');
        card_div.classList.add('card');
    
        var card_image = document.createElement('div');
        card_image.classList.add('card-image');
        var card_image_img = document.createElement('img');
        card_image_img.classList.add('activator');
        card_image_img.src = input.image;
        var card_image_a = document.createElement('a');
        card_image_a.href = 'productLanding.html';
        card_image_a.dataset.id = input.id;
        card_image_a.addEventListener('click', function() {
            PRODUCT_LIST.session.setItem('selected_item', this.dataset.id);
        }, false);
        card_image_a_classes = ['btn-floating', 'halfway-fab', 'waves-effect', 'waves-light'];
        card_image_a_classes.forEach(class_ => {
            card_image_a.classList.add(class_);
        });
        var card_image_i = document.createElement('i');
        card_image_i.classList.add('material-icons');
        card_image_i.textContent = 'visibility';
        card_image.appendChild(card_image_img);
        card_image.appendChild(card_image_a);
        card_image_a.appendChild(card_image_i);
    
        var card_content = document.createElement('div');
        card_content.classList.add('card-content');
        var card_content_span = document.createElement('span');
        card_content_span.classList.add('card-title');
        card_content_span.textContent = input.title;
        var card_content_p = document.createElement('p');
        card_content_p.classList.add('right-align');
        card_content_p.textContent = `${input.price} USD`;
        card_content.appendChild(card_content_span);
        card_content.appendChild(card_content_p);
    
        var card_reveal = document.createElement('div');
        card_reveal.classList.add('card-reveal');
        var card_reveal_span = document.createElement('span');
        card_reveal_span_classes = ['card-title', 'grey-text', 'text-darken-4'];
        card_reveal_span_classes.forEach((class_) => {
            card_reveal_span.classList.add(class_);
        });
        var card_reveal_i = document.createElement('i');
        card_reveal_i.classList.add('material-icons');
        card_reveal_i.textContent = 'close';
        var card_reveal_p = document.createElement('p');
        card_reveal_p.textContent = input.description;
        card_reveal.appendChild(card_reveal_span);
        card_reveal_span.appendChild(card_reveal_i);
        card_reveal.appendChild(card_reveal_p);
    
        card_div.appendChild(card_image);
        card_div.appendChild(card_content);
        card_div.appendChild(card_reveal);
        column_div.appendChild(card_div);

        return column_div;
    }

    var buttons_creator = function() {
        var checkboxes = [];
        var all_p = document.createElement('p');
        all_p.classList.add('col');
        all_p.classList.add('s2');
        all_p.classList.add('offset-s1');
        var all_label = document.createElement('label');
        var all_check = document.createElement('input');
        all_check.type = 'checkbox';
        var all_span = document.createElement('span');
        all_span.textContent = 'all products';
        all_p.appendChild(all_label);
        all_label.appendChild(all_check);
        all_label.appendChild(all_span);

        all_check.checked = true;

        checkboxes.push(all_check);

        PRODUCT_LIST.buttons_container.appendChild(all_p);

        for (category in categories) {
            var len = categories[category].length;

            var p = document.createElement('p');
            p.classList.add('col');
            p.classList.add('s2');
            var label = document.createElement('label');
            var check = document.createElement('input');
            check.type = 'checkbox';
            check.checked = true;
            var span = document.createElement('span');
            span.textContent = `${category} (${len})`;
            p.appendChild(label);
            label.appendChild(check);
            label.appendChild(span);
            checkboxes.push(check);

            PRODUCT_LIST.buttons_container.appendChild(p);
        };

        PRODUCT_LIST.buttons_container.querySelectorAll('p label input').forEach((checkbox, index) => {
            if(index === 0){
                checkbox.addEventListener('change', function() {
                    if(this.checked) {
                        checkboxes.forEach((checkbox, index) => {
                            if(index > 0) {
                                checkbox.checked = true;
                            };
                        });

                        products.forEach((product) => {
                            product.product_ele.style.display = '';
                        });
                    } else {
                        checkboxes.forEach((checkbox, index) => {
                            if(index > 0) {
                                checkbox.checked = false;
                            }
                        });
                        products.forEach((product) => {
                            product.product_ele.style.display = 'none';
                        });
                    }
                }, false);
            } else {
                checkbox.addEventListener('change', function() {
                    if(this.checked) {
                        var all_checked = true;

                        checkboxes.forEach((checkbox, index) => {
                            if(index > 0) {
                                if(!checkbox.checked) {
                                    all_checked = false;
                                };

                                products_switcher(checkbox, index);
                            };
                        });

                        if(all_checked) {
                            checkboxes[0].checked = true;
                        } else {
                            checkboxes[0].checked = false;
                        };
                    } else {
                        checkboxes[0].checked = false;

                        checkboxes.forEach((checkbox, index) => {
                            if(index > 0) {
                                products_switcher(checkbox, index);
                            };
                        });
                    }
                }, false);
            }
        });
    };

    var products_switcher = function(checkbox, index) {
        switch (index) {
            case 1:
                products.forEach((product) => {
                    if (product.product.category === 'men\'s clothing') {
                        if(checkbox.checked) {
                            product.product_ele.style.display = '';
                        } else {
                            product.product_ele.style.display = 'none';
                        }
                    }
                });
                break;
            case 2:
                products.forEach((product) => {
                    if (product.product.category === 'jewelery') {
                        if(checkbox.checked) {
                            product.product_ele.style.display = '';
                        } else {
                            product.product_ele.style.display = 'none';
                        }
                    }
                });
                break;
            case 3:
                products.forEach((product) => {
                    if (product.product.category === 'electronics') {
                        if(checkbox.checked) {
                            product.product_ele.style.display = '';
                        } else {
                            product.product_ele.style.display = 'none';
                        }
                    }
                });
                break;
            case 4:
                products.forEach((product) => {
                    if (product.product.category === 'women\'s clothing') {
                        if(checkbox.checked) {
                            product.product_ele.style.display = '';
                        } else {
                            product.product_ele.style.display = 'none';
                        }
                    }
                });
                break;
        };
    };

    PRODUCT_LIST.product_search_input.addEventListener('input', function() {
        var input = this;
        if(input.value.length > 0) {
            PRODUCT_LIST.buttons_container.querySelectorAll('p label input').forEach((checkbox) => {
                checkbox.checked = false;
            });
            products.forEach((product) => {
                if(product.product.description.toLowerCase().lastIndexOf(input.value.toLowerCase()) > -1 || product.product.title.toLowerCase().lastIndexOf(input.value.toLowerCase()) > -1){
                    product.product_ele.style.display = ''
                } else {
                    product.product_ele.style.display = 'none'
                };
            });
        } else {
            PRODUCT_LIST.buttons_container.querySelectorAll('p label input').forEach((checkbox) => {
                checkbox.checked = true;
            });
            products.forEach((product) => {
                product.product_ele.style.display = '';
            });
        }
    }, false);
})();