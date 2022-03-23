(function() {
    var STATES = {
        options: {},
        select_eles: document.querySelectorAll('select'),
        states_list: null
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        STATES.states_list = JSON.parse(this.responseText);

        var elems = STATES.select_eles;
        var elem = elems.item(0);

        var option = document.createElement('option');
        option.value = "";
        option.textContent = `Choose your state`;
        option.selected = true;
        option.disabled = true;
        elem.appendChild(option);

        STATES.states_list.forEach((state) => {
            var option = document.createElement('option');
            option.value = state.abbreviation;
            option.textContent = state.name;
            elem.appendChild(option);
        });

        var instances = M.FormSelect.init(elems, STATES.options);
        var instance = M.FormSelect.getInstance(elem);
    }

    xhttp.open('GET', '../assets/states.json', true);
    xhttp.send();
})();