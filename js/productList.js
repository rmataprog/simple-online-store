var PRODUCT_LIST = {
    list_container: document.getElementsByTagName('div').item(0).querySelector('div.row')
};

PRODUCT_LIST.list_container.innerHTML = '';

var xhttp = new XMLHttpRequest();

xhttp.onload = function() {
    var data = JSON.parse(this.responseText);
    data.forEach((element) => {
        card_creator(element);
    })
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

    PRODUCT_LIST.list_container.appendChild(column_div);
}