(function() {
        
    var PRODUCT_LANDING = {
        data_container: document.getElementsByTagName('div').item(0).querySelector('div.row'),
        session: window.localStorage
    };

    var get_selected = function(input) {
        var selected_item = parseInt(PRODUCT_LANDING.session.getItem('selected_item'));
        var data = JSON.parse(input);
        var selected_item_data = (data.filter(item => {
            return item.id === selected_item;
        })).length > 0 ? (data.filter(item => { return item.id === selected_item; }))[0] : {};

        return selected_item_data
    };

    var get_cart = function() {
        var cart;
        if(PRODUCT_LANDING.session.getItem('cart') !== null) {
            cart = JSON.parse(PRODUCT_LANDING.session.getItem('cart'));
        } else {
            PRODUCT_LANDING.session.setItem('cart', '[]');
            cart = [];
        }

        return cart;
    };

    var set_cart = function(input) {
        var flag;
        var cart = get_cart();
        if(cart.length > 0) {
            var data = cart.filter((item) => {
                return item.id === input.id;
            });
            if(data.length === 0) {
                flag = true;
                cart.push({
                    id: input.id,
                    quantity: 1
                });
            } else {
                flag = false;
            };
        } else {
            cart = [];
            flag = true;
            cart.push({
                id: input.id,
                quantity: 1
            });
        };

        PRODUCT_LANDING.session.setItem('cart', JSON.stringify(cart));

        return flag;
    }

    var xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        
        var selected_item_data = get_selected(this.responseText);
        
        elementsCreator(selected_item_data);
    }

    xhttp.open('GET', '../assets/data.json', true);
    xhttp.send();

    var elementsCreator = function(input) {
        var image_div = document.createElement('div');
        var image_div_classes = ['col', 's12', 'm4', 'offset-m2', 'l4', 'offset-l2', 'xl2', 'offset-xl2'];
        image_div_classes.forEach(class_ => {
            image_div.classList.add(class_);
        });

        var image_div_card = document.createElement('div');
        image_div_card.classList.add('card');

        var image_div_card_image = document.createElement('div');
        image_div_card_image.classList.add('card-image');

        var img = document.createElement('img');
        img.src = input.image;

        image_div.appendChild(image_div_card);
        image_div_card.appendChild(image_div_card_image);
        image_div_card_image.appendChild(img);

        var data_div = document.createElement('div');
        var data_div_classes = ['col', 's12', 'm4', 'l4', 'xl5', 'offset-xl1'];
        data_div_classes.forEach(class_ => {
            data_div.classList.add(class_);
        });

        var div_row_1 = document.createElement('div');
        div_row_1.className = 'row';
        var div_row_1_container = document.createElement('div');
        var div_row_1_container_classes = ['col', 's12'];
        div_row_1_container_classes.forEach(class_ => {
            div_row_1_container.classList.add(class_);
        });
        div_row_1.appendChild(div_row_1_container);
        var div_row_1_container_p_name = document.createElement('p');
        div_row_1_container_p_name.textContent = `${input.title}`;
        var div_row_1_container_p_category = document.createElement('p');
        div_row_1_container_p_category.textContent = `${input.category}`;
        var div_row_1_container_p_price = document.createElement('p');
        div_row_1_container_p_price.textContent = `$${input.price}`;
        var div_row_1_container_p_description = document.createElement('p');
        div_row_1_container_p_description.textContent = `${input.description}`;
        var div_row_1_container_p_rate = document.createElement('p');
        var div_row_1_container_p_rate_star = document.createElement('i');
        div_row_1_container_p_rate_star.className = 'material-icons';
        div_row_1_container_p_rate_star.textContent = 'star';
        var div_row_1_container_p_rate_star_text = document.createTextNode(`${input.rating.rate} - `);
        var div_row_1_container_p_rate_votes = document.createElement('i');
        div_row_1_container_p_rate_votes.className = 'material-icons';
        div_row_1_container_p_rate_votes.textContent = 'person';
        var div_row_1_container_p_rate_votes_text = document.createTextNode(input.rating.count);
        div_row_1_container_p_rate.appendChild(div_row_1_container_p_rate_star);
        div_row_1_container_p_rate.appendChild(div_row_1_container_p_rate_star_text);
        div_row_1_container_p_rate.appendChild(div_row_1_container_p_rate_votes);
        div_row_1_container_p_rate.appendChild(div_row_1_container_p_rate_votes_text);
        var p_list = [div_row_1_container_p_name,div_row_1_container_p_category,div_row_1_container_p_price,
            div_row_1_container_p_description,div_row_1_container_p_rate];
        p_list.forEach((p) => {
            div_row_1_container.appendChild(p);
        });

        var div_row_2 = document.createElement('div');
        div_row_2.className = 'row';
        var div_row_2_container_1 = document.createElement('div');
        var div_row_2_container_2 = document.createElement('div');
        var div_row_2_container_classes = ['col', 's4'];
        div_row_2_container_classes.forEach(class_ => {
            div_row_2_container_1.classList.add(class_);
            div_row_2_container_2.classList.add(class_);
        });
        div_row_2.appendChild(div_row_2_container_1);
        div_row_2.appendChild(div_row_2_container_2);
        var div_row_2_container_1_button = document.createElement('button');
        var div_row_2_container_2_button = document.createElement('a');
        var buttons_classes = ['waves-effect', 'waves-light', 'btn'];
        buttons_classes.forEach(class_ => {
            div_row_2_container_1_button.classList.add(class_);
            div_row_2_container_2_button.classList.add(class_);
        });
        var div_row_2_container_1_button_icon = document.createElement('i');
        div_row_2_container_1_button_icon.className = 'material-icons';
        div_row_2_container_1_button_icon.textContent = 'add_shopping_cart';
        div_row_2_container_1_button.appendChild(div_row_2_container_1_button_icon);

        var cart = get_cart();

        var find_in_cart = cart.filter((item) => {
            return item.id === input.id;
        });

        if(find_in_cart.length > 0) {
            div_row_2_container_1_button.classList.add('disabled');
        };

        div_row_2_container_1_button.addEventListener('click', function() {
            add_shopping_cart_function(input);
            div_row_2_container_1_button.classList.add('disabled');
            M.toast({html: 'Item was added in cart!'});
        }, false);

        div_row_2_container_2_button.href = 'productsList.html';
        div_row_2_container_2_button.textContent = 'More items';

        div_row_2_container_1.appendChild(div_row_2_container_1_button);
        div_row_2_container_2.appendChild(div_row_2_container_2_button);

        data_div.appendChild(div_row_1);
        data_div.appendChild(div_row_2);

        PRODUCT_LANDING.data_container.innerHTML = '';
        PRODUCT_LANDING.data_container.appendChild(image_div);
        PRODUCT_LANDING.data_container.appendChild(data_div);
    };

    var add_shopping_cart_function = function(input) {
        var exists = set_cart(input);
        if(!exists) {
            console.log('item already exists in cart');
        } else {
            console.log('item was added in the cart');
        }
    };
})();