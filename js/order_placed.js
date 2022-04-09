(function() {
    var PLACED = {
        order_details_ele: document.getElementById('order_details'),
        product_list_ele: document.getElementById('product_list'),
        shipping_info_ele: document.getElementById('shipping_info'),
        session: window.localStorage
    };

    var get_data = function() {
        if(PLACED.session.getItem('orders') !== null) {
            var orders = JSON.parse(PLACED.session.getItem('orders'));
            return orders;
        };
    };

    var build_page = function() {
        var order = (get_data())[0];
        var table = PLACED.order_details_ele.getElementsByTagName('table');
        var trs = table.item(0).getElementsByTagName('tr');
        trs.item(0).getElementsByTagName('td').item(0).textContent = order.date;
        trs.item(1).getElementsByTagName('td').item(0).textContent = order.number;
        trs.item(2).getElementsByTagName('td').item(0).textContent = order.billing.products_amount;
        trs.item(3).getElementsByTagName('td').item(0).textContent = order.billing.tax;
        trs.item(4).getElementsByTagName('td').item(0).textContent = order.billing.shipping;
        trs.item(5).getElementsByTagName('td').item(0).textContent = order.billing.total;

        var shipping_ps = PLACED.shipping_info_ele.getElementsByTagName('p');
        shipping_ps.item(0).getElementsByTagName('span').item(0).textContent = order.shipping.name;
        shipping_ps.item(1).getElementsByTagName('span').item(0).textContent = `${order.shipping.address_1} ${order.shipping.address_2}
        ${order.shipping.city}, ${order.shipping.county}, ${order.shipping.state} ${order.shipping.zip_code}
        United States`;
        shipping_ps.item(2).getElementsByTagName('span').item(0).textContent = order.shipping.phone;
        shipping_ps.item(3).getElementsByTagName('span').item(0).textContent = order.shipping.email;

        var product_list_ele = PLACED.product_list_ele;

        order.products.forEach(item => {
            var row = document.createElement('div');
            row.className = 'row';

            var div_img = document.createElement('div');
            div_img.classList.add('col');
            div_img.classList.add('s3');
            var img = document.createElement('img');
            img.src = item.image;
            img.className = 'responsive-img';
            div_img.appendChild(img);

            var div_p_1 = document.createElement('div');
            div_p_1.classList.add('col');
            div_p_1.classList.add('s5');
            var p_1 = document.createElement('p');
            p_1.textContent = item.title;
            var p_2 = document.createElement('p');
            p_2.textContent = `ID: ${item.id}`;
            var p_3 = document.createElement('p');
            p_3.textContent = `Unit Price: ${item.price}`;
            div_p_1.appendChild(p_1);
            div_p_1.appendChild(p_2);
            div_p_1.appendChild(p_3);

            var div_p_2 = document.createElement('div');
            div_p_2.classList.add('col');
            div_p_2.classList.add('s2');
            var p_4 = document.createElement('p');
            p_4.textContent = `Qty.: ${item.quantity}`;
            div_p_2.appendChild(p_4);

            var div_p_3 = document.createElement('div');
            div_p_3.classList.add('col');
            div_p_3.classList.add('s2');
            var p_5 = document.createElement('p');
            p_5.textContent = `Item total: ${(item.price*parseInt(item.quantity)).toFixed(2)}`;
            div_p_3.appendChild(p_5);

            row.appendChild(div_img);
            row.appendChild(div_p_1);
            row.appendChild(div_p_2);
            row.appendChild(div_p_3);

            product_list_ele.appendChild(row);
        });
    };

    build_page();
})();