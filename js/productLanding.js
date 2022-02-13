(function() {
        
    var PRODUCT_LANDING = {
        data_container: document.getElementsByTagName('div').item(0).querySelector('div.row'),
        session: window.localStorage
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        var selected_item = parseInt(PRODUCT_LANDING.session.getItem('selected_item'));
        var data = JSON.parse(this.responseText);
        var selected_item_data = (data.filter(item => {
            return item.id === selected_item;
        })).length > 0 ? (data.filter(item => { return item.id === selected_item; }))[0] : {};
        
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
        div_row_1_container_p_price.textContent = `${input.price}`;
        var div_row_1_container_p_description = document.createElement('p');
        div_row_1_container_p_description.textContent = `${input.description}`;
        var div_row_1_container_p_rate = document.createElement('p');
        div_row_1_container_p_rate.textContent = `${input.rating.rate} - ${input.rating.count}`;
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
})();