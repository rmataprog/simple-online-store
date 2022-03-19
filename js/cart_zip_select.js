(function() {
    var ZIP = {
        city_data: null,
        county_data: null,
        options: {},
        select_city: document.querySelector('select#city_list'),
        select_county: document.querySelector('select#county_list'),
        select_eles: document.querySelectorAll('select'),
        select_state: document.querySelector('select#state_list'),
        state_data: null,
        zip_list: null
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        ZIP.zip_list = JSON.parse(this.responseText);
    }

    xhttp.open('GET', '../assets/zip.json', true);
    xhttp.send();

    ZIP.select_state.addEventListener('change', function(e) {
        var target = e.target;
        get_cities(target.value);
    }, false);

    ZIP.select_city.addEventListener('change', function(e) {
        var target = e.target;
        get_counties(target.value);
    }, false);

    ZIP.select_county.addEventListener('change', function(e) {
        var target = e.target;
        get_zip_codes(target.value);
    }, false);

    var get_cities = function(input) {
        var elems = ZIP.select_eles;
        var elem_city = elems.item(1);
        elem_city.innerHTML = '';

        ZIP.state_data = ZIP.zip_list.filter((location) => {
            return location.state === input;
        });

        var cities = new Set();

        ZIP.state_data.forEach((zip) => {
            cities.add(zip.city);
        });

        var cities_array = [];

        cities.forEach((city) => {
            cities_array.push(city);
        });

        cities_array.sort();

        var option = document.createElement('option');

        option.value = '';
        option.textContent = 'Choose city';
        option.selected = true;
        option.disabled = true;

        elem_city.appendChild(option);

        cities_array.forEach((city, index) => {
            var option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            elem_city.appendChild(option);
        });

        var instances = M.FormSelect.init(elems, ZIP.options);
        var instance = M.FormSelect.getInstance(elem_city);
    };

    var get_counties = function(input) {
        var elems = ZIP.select_eles;
        var elem_county = elems.item(2);
        elem_county.innerHTML = '';

        var counties = new Set();

        ZIP.city_data = ZIP.state_data.filter((location) => {
            return location.city === input ;
        });

        ZIP.city_data.forEach((zip) => {
            counties.add(zip.county);
        });

        var counties_array = [];

        counties.forEach((county) => {
            counties_array.push(county);
        });

        counties_array.sort();

        var option = document.createElement('option');

        option.value = '';
        option.textContent = 'Choose county';
        option.selected = true;
        option.disabled = true;

        elem_county.appendChild(option);

        counties_array.forEach((county) => {
            var option = document.createElement('option');

            option.value = county;
            option.textContent = county;

            elem_county.appendChild(option);
        });

        var instances = M.FormSelect.init(elems, ZIP.options);
        var instance = M.FormSelect.getInstance(elem_county);
    };

    var get_zip_codes = function(input) {
        var elems = ZIP.select_eles;
        var elem_zip = elems.item(3);
        elem_zip.innerHTML = '';

        var zip_codes = new Set();

        ZIP.county_data = ZIP.city_data.filter((location) => {
            return location.county === input ;
        });

        ZIP.county_data.forEach((zip) => {
            zip_codes.add(zip.zip_code);
        });

        var zip_codes_array = [];

        zip_codes.forEach((zip_code) => {
            zip_codes_array.push(zip_code);
        });

        zip_codes_array.sort();

        var option = document.createElement('option');

        option.value = '';
        option.textContent = 'Choose zip code';
        option.selected = true;
        option.disabled = true;

        elem_zip.appendChild(option);

        zip_codes_array.forEach((zip_code) => {
            var option = document.createElement('option');

            option.value = zip_code;
            option.textContent = zip_code;

            elem_zip.appendChild(option);
        });

        var instances = M.FormSelect.init(elems, ZIP.options);
        var instance = M.FormSelect.getInstance(elem_zip);
    };
})();